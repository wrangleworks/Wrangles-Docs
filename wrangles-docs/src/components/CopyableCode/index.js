import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

export default function CopyableCode({value}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copyValue = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className={styles.wrapper}>
      <span className={styles.divider} aria-hidden="true">|</span>
      <code>{value}</code>
      <button
        type="button"
        className={styles.copyButton}
        aria-label={`Copy ${value}`}
        title={copied ? 'Copied' : `Copy ${value}`}
        onClick={copyValue}>
        {copied ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="8" y="8" width="11" height="11" rx="2" />
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
          </svg>
        )}
      </button>
    </span>
  );
}
