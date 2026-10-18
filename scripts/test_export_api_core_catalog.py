"""Offline tests: no live API or database access."""
import io
import unittest
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError, URLError

import export_api_core_catalog as exporter


class CatalogFallbackTests(unittest.TestCase):
    def test_api_success_does_not_connect_to_database(self):
        response = MagicMock()
        response.__enter__.return_value = io.StringIO('{"catalog": [{"catalog_id": "1"}]}')
        with patch.object(exporter, 'urlopen', return_value=response), patch.object(exporter, 'fetch_database_catalog') as db:
            payload, source, reason = exporter.fetch_catalog('https://example.test/catalog', {}, True)
        self.assertEqual(source, 'live-api-core-dev')
        self.assertIsNone(reason)
        self.assertEqual(len(payload['catalog']), 1)
        db.assert_not_called()

    def test_fallback_only_for_missing_or_unavailable_api(self):
        for failure in (HTTPError('url', 404, 'missing', {}, None),
                        HTTPError('url', 503, 'down', {}, None), URLError('offline')):
            with self.subTest(failure=failure), patch.object(exporter, 'urlopen', side_effect=failure), \
                    patch.object(exporter, 'fetch_database_catalog', return_value={'catalog': []}) as db:
                self.assertEqual(exporter.fetch_catalog('https://example.test', {}, True)[1], 'direct-database')
                db.assert_called_once()

    def test_auth_failures_do_not_fallback(self):
        for status in (401, 403):
            with patch.object(exporter, 'urlopen', side_effect=HTTPError('url', status, 'auth', {}, None)), \
                    patch.object(exporter, 'fetch_database_catalog') as db:
                with self.assertRaises(HTTPError):
                    exporter.fetch_catalog('https://example.test', {}, True)
                db.assert_not_called()

    def test_malformed_json_does_not_fallback(self):
        response = MagicMock()
        response.__enter__.return_value = io.StringIO('not json')
        with patch.object(exporter, 'urlopen', return_value=response), patch.object(exporter, 'fetch_database_catalog') as db:
            with self.assertRaises(ValueError):
                exporter.fetch_catalog('https://example.test', {}, True)
            db.assert_not_called()

    def test_fallback_requires_opt_in_and_db_failure_propagates(self):
        with patch.object(exporter, 'urlopen', side_effect=URLError('offline')), \
                patch.object(exporter, 'fetch_database_catalog', side_effect=ValueError('DB failed')) as db:
            with self.assertRaises(URLError):
                exporter.fetch_catalog('https://example.test', {}, False)
            db.assert_not_called()
            with self.assertRaisesRegex(ValueError, 'DB failed'):
                exporter.fetch_catalog('https://example.test', {}, True)

    def test_database_is_read_only_and_dates_are_normalized(self):
        driver = MagicMock()
        cursor = driver.connect.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value
        cursor.description = [('catalog_id',), ('created_at',), ('updated_at',)]
        now = datetime(2026, 10, 18, tzinfo=timezone.utc)
        cursor.fetchall.return_value = [(149, now, now)]
        with patch.dict('sys.modules', {'psycopg': driver}), patch.dict('os.environ', {'DATABASE_URL': 'secret-url'}):
            result = exporter.fetch_database_catalog()
        self.assertIn('default_transaction_read_only=on', driver.connect.call_args.kwargs['options'])
        self.assertEqual(cursor.execute.call_args_list[0].args[0], 'SET TRANSACTION READ ONLY')
        self.assertTrue(cursor.execute.call_args_list[1].args[0].startswith('SELECT '))
        self.assertEqual(result['catalog'][0]['catalog_id'], '149')
        self.assertEqual(result['catalog'][0]['created_at'], '2026-10-18T00:00:00Z')

    def test_database_exception_never_exposes_credentials(self):
        driver = MagicMock()
        driver.connect.side_effect = RuntimeError('postgresql://user:TOPSECRET@host/db')
        with patch.dict('sys.modules', {'psycopg': driver}), patch.dict('os.environ', {'DATABASE_URL': 'secret-url'}):
            with self.assertRaises(ValueError) as caught:
                exporter.fetch_database_catalog()
        self.assertNotIn('TOPSECRET', str(caught.exception))


if __name__ == '__main__':
    unittest.main()
