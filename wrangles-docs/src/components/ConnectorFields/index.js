import React from 'react';

function FieldTable({children, firstColumn = 'Field'}) {
  return (
    <table>
      <thead>
        <tr>
          <th>{firstColumn}</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default function ConnectorFields({connectorKey, legacyPath, sourcePath}) {
  const docsUrl = `https://wrangles.io/${legacyPath.replace(/^docs\//, '').replace(/\.md$/, '')}`;

  return (
    <>
      <details className="ww-field-disclosure">
        <summary>Access</summary>
        <FieldTable firstColumn="Requirement">
          <tr>
            <td>WranglesPY</td>
            <td>Required</td>
          </tr>
          <tr>
            <td>WrangleWorks account</td>
            <td>Connector dependent</td>
          </tr>
          <tr>
            <td>External credentials</td>
            <td>Connector dependent; see operation parameters</td>
          </tr>
        </FieldTable>
      </details>

      <details className="ww-field-disclosure">
        <summary>Source</summary>
        <FieldTable>
          <tr>
            <td>Docs Path</td>
            <td><code>{legacyPath}</code></td>
          </tr>
          <tr>
            <td>Docs URL</td>
            <td><a href={docsUrl}>{docsUrl}</a></td>
          </tr>
          <tr>
            <td>Section Source</td>
            <td><code>{sourcePath}</code></td>
          </tr>
        </FieldTable>
      </details>

      <details className="ww-field-disclosure">
        <summary>Metadata</summary>
        <FieldTable>
          <tr>
            <td>Connector Key</td>
            <td><code>{connectorKey}</code></td>
          </tr>
          <tr>
            <td>Type</td>
            <td>connector</td>
          </tr>
          <tr>
            <td>Registry Status</td>
            <td>Documentation only; not yet included in the Registry</td>
          </tr>
        </FieldTable>
      </details>
    </>
  );
}
