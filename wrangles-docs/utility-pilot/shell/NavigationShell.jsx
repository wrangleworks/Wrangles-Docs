import React, {useEffect, useState} from 'react';

import logoUrl from './wrangleworks.png';
import styles from './styles.module.css';

const sections = [
  {
    label: 'Account',
    links: [
      ['Personal Info and Secrets', '/en/account', 'account-box-multiple'],
      ['Organizations', '/en/organizations', 'account-group'],
    ],
  },
  {
    label: 'Excel',
    links: [
      ['Install', '/en/excel/install', 'tab-plus'],
      ['Basics & Terminology', '/en/excel', 'lasso'],
      ['Stock Wrangles', '/en/excel/stock', 'cowboy'],
      ['My Wrangles', '/en/excel/my_wrangles', 'checklist'],
      ['Recipes', '/en/excel/recipes', 'noodles'],
      ['Tutorials', "/en/excel/Let's-Get-Ready-To-Wrangle", 'chair-school'],
      ['Releases', '/en/excel/releases', 'tag-multiple'],
    ],
  },
  {
    label: 'Python',
    links: [
      ['Install', '/en/python/install', 'tab-plus'],
      ['Basics', '/en/python', 'python'],
      ['Recipes', '/en/python/recipes', 'noodles'],
      ['Wrangles', '/en/python/recipes/wrangles', 'lasso'],
      ['Functions', '/en/python/functions', 'play'],
      ['Connectors', '/en/python/connectors', 'link-plus'],
    ],
  },
  {
    label: 'Wrangling as a Service',
    links: [
      ['Bespoke Custom Wrangles', '/en/waas/bespoke', 'account-tie'],
      ['Wrangling Automation', '/en/waas/automation', 'robot'],
    ],
  },
];

function Icon({name}) {
  return (
    <svg aria-hidden="true">
      <use href={`#utility-pilot-icon-${name}`} />
    </svg>
  );
}

function IconSymbols() {
  return (
    <svg className={styles.symbols} aria-hidden="true">
      <symbol id="utility-pilot-icon-menu" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" /></symbol>
      <symbol id="utility-pilot-icon-search" viewBox="0 0 24 24"><path d="m9.5 3a6.5 6.5 0 1 0 4.1 11.55L19.05 20 20.5 18.55l-5.45-5.45A6.5 6.5 0 0 0 9.5 3m0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" /></symbol>
      <symbol id="utility-pilot-icon-tag" viewBox="0 0 24 24"><path d="M5.5 5A2.5 2.5 0 1 0 8 7.5 2.5 2.5 0 0 0 5.5 5M21 11l-9-9H4L2 4v8l9 9 10-10m-9.17 7.17L4 10.34V4h6.34L18.17 11l-6.34 7.17Z" /></symbol>
      <symbol id="utility-pilot-icon-account" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 3a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m0 15a8 8 0 0 1-5.74-2.42C6.65 15.77 8.92 14 12 14s5.35 1.77 5.74 3.58A8 8 0 0 1 12 20Z" /></symbol>
      <symbol id="utility-pilot-icon-home" viewBox="0 0 24 24"><path d="m12 3 9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8Z" /></symbol>
      <symbol id="utility-pilot-icon-person" viewBox="0 0 24 24"><path d="M16 13c2.67 0 8 1.34 8 4v3H8v-3c0-2.66 5.33-4 8-4m-8.5-2A3.5 3.5 0 1 1 7.5 4a3.5 3.5 0 0 1 0 7M0 20v-2.5C0 15.17 4.67 14 7 14c.31 0 .66.02 1.03.06C6.78 14.96 6 16.1 6 17.5V20H0Z" /></symbol>
      <symbol id="utility-pilot-icon-plus" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></symbol>
      <symbol id="utility-pilot-icon-lasso" viewBox="0 0 24 24"><path d="M12 3c5.5 0 10 3.13 10 7s-4.5 7-10 7c-.74 0-1.46-.06-2.15-.17C9.38 19.2 7.9 21 6 21c-2.2 0-4-1.57-4-3.5 0-1.25.75-2.35 1.88-2.97C2.69 13.32 2 11.78 2 10c0-3.87 4.5-7 10-7m0 2c-4.42 0-8 2.24-8 5s3.58 5 8 5 8-2.24 8-5-3.58-5-8-5m-6 11c-1.1 0-2 .67-2 1.5S4.9 19 6 19s2-.67 2-1.5S7.1 16 6 16Z" /></symbol>
      <symbol id="utility-pilot-icon-list" viewBox="0 0 24 24"><path d="M3 5h2v2H3V5m4 0h14v2H7V5M3 11h2v2H3v-2m4 0h14v2H7v-2M3 17h2v2H3v-2m4 0h14v2H7v-2Z" /></symbol>
      <symbol id="utility-pilot-icon-code" viewBox="0 0 24 24"><path d="m8.7 16.6-4.6-4.6 4.6-4.6L7.3 6 1.3 12l6 6 1.4-1.4m6.6 0 4.6-4.6-4.6-4.6L16.7 6l6 6-6 6-1.4-1.4M13.8 4l-3.6 16H8.1l3.6-16h2.1Z" /></symbol>
      <symbol id="utility-pilot-icon-link" viewBox="0 0 24 24"><path d="M10.6 13.4a2 2 0 0 1 0-2.8l3-3a2 2 0 0 1 2.8 2.8l-1.2 1.2 1.4 1.4 1.2-1.2a4 4 0 1 0-5.6-5.6l-3 3a4 4 0 0 0 0 5.6l1.4-1.4m2.8-2.8-1.4 1.4a2 2 0 0 1 0 2.8l-3 3a2 2 0 1 1-2.8-2.8l1.2-1.2L6 11.4l-1.2 1.2a4 4 0 1 0 5.6 5.6l3-3a4 4 0 0 0 0-5.6Z" /></symbol>
      <symbol id="utility-pilot-icon-account-box-multiple" viewBox="0 0 24 24"><path d="M4 6H2V20C2 21.11 2.9 22 4 22H18V20H4V6M18.5 14.25C18.5 12.75 15.5 12 14 12S9.5 12.75 9.5 14.25V15H18.5M14 10.25C15.24 10.25 16.25 9.24 16.25 8S15.24 5.75 14 5.75 11.75 6.76 11.75 8 12.76 10.25 14 10.25M20 2H8C6.9 2 6 2.9 6 4V16C6 17.11 6.9 18 8 18H20C21.11 18 22 17.11 22 16V4C22 2.89 21.1 2 20 2M20 16H8V4H20V16Z" /></symbol>
      <symbol id="utility-pilot-icon-account-group" viewBox="0 0 24 24"><path d="M12 5.5A3.5 3.5 0 1 1 12 12.5 3.5 3.5 0 0 1 12 5.5M5 8A3 3 0 0 1 7.66 12.38 3 3 0 1 1 5 8M19 8A3 3 0 1 1 16.34 12.38 3 3 0 0 1 19 8M5.5 18.25C5.5 16.18 8.41 14.5 12 14.5S18.5 16.18 18.5 18.25V20H5.5V18.25M0 20V18.5C0 17.11 1.89 15.94 4.45 15.6 3.86 16.28 3.5 17.22 3.5 18.25V20H0M24 20H20.5V18.25C20.5 17.22 20.14 16.28 19.55 15.6 22.11 15.94 24 17.11 24 18.5V20Z" /></symbol>
      <symbol id="utility-pilot-icon-tab-plus" viewBox="0 0 24 24"><path d="M3 3A2 2 0 0 0 1 5V19A2 2 0 0 0 3 21H21A2 2 0 0 0 23 19V5A2 2 0 0 0 21 3H3M3 5H13V9H21V19H3V5M10 10V13H7V15H10V18H12V15H15V13H12V10H10Z" /></symbol>
      <symbol id="utility-pilot-icon-cowboy" viewBox="0 0 24 24"><path d="M20 22H4V20C4 17.8 7.6 16 12 16S20 17.8 20 20M8 9H16V10C16 12.2 14.2 14 12 14S8 12.2 8 10M19 4C18.4 4 18 4.4 18 5V6H16.5L15.1 3C15 2.8 14.9 2.6 14.7 2.5 14.2 2 13.4 1.9 12.7 2.2L12 2.4 11.3 2.1C10.6 1.8 9.8 1.9 9.3 2.4 9.1 2.6 9 2.8 8.9 3L7.5 6H6V5C6 4.4 5.6 4 5 4S4 4.4 4 5V6C4 7.1 4.9 8 6 8H18C19.1 8 20 7.1 20 6V5C20 4.5 19.6 4 19 4Z" /></symbol>
      <symbol id="utility-pilot-icon-checklist" viewBox="0 0 24 24"><path d="M3 5H9V11H3V5M5 7V9H7V7H5M11 7H21V9H11V7M11 15H21V17H11V15M5 20L1.5 16.5 2.91 15.09 5 17.17 9.59 12.59 11 14 5 20Z" /></symbol>
      <symbol id="utility-pilot-icon-noodles" viewBox="0 0 24 24"><path d="M22 3L10 4.41V6H22V7H10V12H22C22 13.81 21.43 15.46 20.32 16.95S17.77 19.53 16 20.25V22H8V20.25C6.24 19.53 4.79 18.43 3.68 16.95S2 13.81 2 12H5V4L22 2V3M6 4.88V6H7V4.78L6 4.88M6 7V12H7V7H6M9 12V7H8V12H9M9 6V4.55L8 4.64V6H9Z" /></symbol>
      <symbol id="utility-pilot-icon-chair-school" viewBox="0 0 24 24"><path d="M22 5V7H17L13.53 12H16V14H14.46L18.17 22H15.97L15.04 20H6.38L5.35 22H3.1L7.23 14H7C6.55 14 6.17 13.7 6.04 13.3L2.87 3.84 3.82 3.5C4.34 3.34 4.91 3.63 5.08 4.15L7.72 12H12.1L15.57 7H12V5H22M9.5 14L7.42 18H14.11L12.26 14H9.5Z" /></symbol>
      <symbol id="utility-pilot-icon-tag-multiple" viewBox="0 0 24 24"><path d="M5.5 9A1.5 1.5 0 1 0 5.5 6 1.5 1.5 0 0 0 5.5 9M17.41 11.58C18.2 12.37 18.2 13.63 17.41 14.41L12.41 19.41C11.63 20.2 10.37 20.2 9.58 19.41L2.59 12.42C2.22 12.05 2 11.55 2 11V6C2 4.89 2.89 4 4 4H9C9.55 4 10.05 4.22 10.41 4.58L17.41 11.58M13.54 5.71L14.54 4.71 21.41 11.58C22.2 12.37 22.2 13.63 21.42 14.41L16.04 19.79 15.04 18.79 20.75 13 13.54 5.71Z" /></symbol>
      <symbol id="utility-pilot-icon-python" viewBox="0 0 24 24"><path d="M19.14 7.5A2.86 2.86 0 0 1 22 10.36V14.14A2.86 2.86 0 0 1 19.14 17H12C12 17.39 12.32 17.96 12.71 17.96H17V19.64A2.86 2.86 0 0 1 14.14 22.5H9.86A2.86 2.86 0 0 1 7 19.64V15.89C7 14.31 8.28 13.04 9.86 13.04H15.11C16.69 13.04 17.96 11.76 17.96 10.18V7.5H19.14M14.86 19.29A.71.71 0 1 0 14.86 20.89.71.71 0 0 0 14.86 19.29M4.86 17.5A2.86 2.86 0 0 1 2 14.64V10.86A2.86 2.86 0 0 1 4.86 8H12C12 7.61 11.68 7.04 11.29 7.04H7V5.36A2.86 2.86 0 0 1 9.86 2.5H14.14A2.86 2.86 0 0 1 17 5.36V9.11A2.86 2.86 0 0 1 14.14 11.96H8.89A2.86 2.86 0 0 0 6.04 14.82V17.5H4.86M9.14 4.11A.71.71 0 1 0 9.14 5.71.71.71 0 0 0 9.14 4.11Z" /></symbol>
      <symbol id="utility-pilot-icon-play" viewBox="0 0 24 24"><path d="M12 20A8 8 0 1 1 12 4 8 8 0 0 1 12 20M12 2A10 10 0 1 0 12 22 10 10 0 0 0 12 2M10 16.5 16 12 10 7.5V16.5Z" /></symbol>
      <symbol id="utility-pilot-icon-link-plus" viewBox="0 0 24 24"><path d="M7 7H11V9H7A3 3 0 1 0 7 15H11V17H7A5 5 0 1 1 7 7M17 7A5 5 0 0 1 22 12H20A3 3 0 0 0 17 9H13V7H17M8 11H16V13H8V11M17 12H19V15H22V17H19V20H17V17H14V15H17V12Z" /></symbol>
      <symbol id="utility-pilot-icon-account-tie" viewBox="0 0 24 24"><path d="M12 3A4 4 0 1 1 12 11 4 4 0 0 1 12 3M16 13.54C16 14.6 15.72 17.07 13.81 19.83L13 15 13.94 13.12C13.32 13.05 12.67 13 12 13S10.68 13.05 10.06 13.12L11 15 10.19 19.83C8.28 17.07 8 14.6 8 13.54 5.61 14.24 4 15.5 4 17V21H20V17C20 15.5 18.4 14.24 16 13.54Z" /></symbol>
      <symbol id="utility-pilot-icon-robot" viewBox="0 0 24 24"><path d="M18.41 4 16 6.41V6.59L18.41 9H22V11H17.59L16 9.41V12H15A2 2 0 0 1 13 10V7.5H9.86C9.77 7.87 9.62 8.22 9.42 8.55L15.18 19H20A2 2 0 0 1 22 21V22H2V21A2 2 0 0 1 4 19H10.61L5.92 10.5C4.12 10.47 2.56 9.24 2.11 7.5 1.56 5.36 2.85 3.18 5 2.63 7.13 2.08 9.31 3.36 9.86 5.5H13V3A2 2 0 0 1 15 1H16V3.59L17.59 2H22V4H18.41M6 4.5A2 2 0 1 0 6 8.5 2 2 0 0 0 6 4.5Z" /></symbol>
      <symbol id="utility-pilot-icon-file-edit" viewBox="0 0 24 24"><path d="M8 12H16V14H8V12M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H10V20M8 18H12.1L13 17.1V16H8V18M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3 18.8 14.2 19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9 14.1 23H12V20.9L18.1 14.8 20.2 16.9Z" /></symbol>
      <symbol id="utility-pilot-icon-file-plus" viewBox="0 0 24 24"><path d="M23 18H20V15H18V18H15V20H18V23H20V20H23M6 2C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H13.81C13.45 21.38 13.2 20.7 13.08 20H6V4H13V9H18V13.08C18.33 13.03 18.67 13 19 13S19.67 13.03 20 13.08V8L14 2M8 12V14H16V12M8 16V18H13V16Z" /></symbol>
      <symbol id="utility-pilot-icon-cog" viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 1 1 12 8.5 3.5 3.5 0 0 1 12 15.5M19.43 12.97C19.47 12.65 19.5 12.33 19.5 12S19.47 11.34 19.43 11L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.66 15.5 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.5 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11C4.53 11.34 4.5 11.67 4.5 12S4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.5 18.68 9.13 18.93L9.5 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.5 18.67 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.97Z" /></symbol>
      <symbol id="utility-pilot-icon-account-circle" viewBox="0 0 24 24"><path d="M12 19.2C9.5 19.2 7.29 17.92 6 16 6.03 14 10 12.9 12 12.9S17.97 14 18 16C16.71 17.92 14.5 19.2 12 19.2M12 5A3 3 0 1 1 12 11 3 3 0 0 1 12 5M12 2A10 10 0 1 0 12 22 10 10 0 0 0 12 2Z" /></symbol>
    </svg>
  );
}

export default function NavigationShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <>
      <IconSymbols />
      <header className={styles.topbar + " navbar"}>
        <div className={styles.brandArea}>
          <button
            className={`${styles.iconButton} ${styles.menuToggle}`}
            type="button"
            aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
            aria-controls="utility-pilot-sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((open) => !open)}>
            <Icon name="menu" />
          </button>
          <a href="/" className={styles.brandLink} aria-label="Wrangles home">
            <img className={styles.brandLogo} src={logoUrl} width="34" height="34" alt="" />
          </a>
        </div>

        <form className={styles.search} role="search" action="/search">
          <Icon name="search" />
          <label className={styles.srOnly} htmlFor="utility-pilot-search">Search documentation</label>
          <input id="utility-pilot-search" name="q" type="search" placeholder="Search" autoComplete="off" />
        </form>

        <nav className={styles.actions} aria-label="Utilities">
          <a className={styles.iconButton} href="/t" aria-label="Browse tags" title="Browse tags"><Icon name="tag" /></a>
          <a className={[styles.iconButton, styles.adminAction].join(' ')} href="/e/python/recipes/wrangles/utilities" aria-label="Edit page" title="Edit page"><Icon name="file-edit" /></a>
          <a className={[styles.iconButton, styles.adminAction].join(' ')} href="/c" aria-label="Create page" title="Create page"><Icon name="file-plus" /></a>
          <a className={[styles.iconButton, styles.adminAction].join(' ')} href="/a" aria-label="Administration" title="Administration"><Icon name="cog" /></a>
          <a className={[styles.iconButton, styles.adminAction].join(' ')} href="/login" aria-label="Log in" title="Log in"><Icon name="account-circle" /></a>
        </nav>
      </header>

      <button
        className={`${styles.scrim}${sidebarOpen ? ` ${styles.scrimOpen}` : ''}`}
        type="button"
        aria-label="Close navigation"
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        id="utility-pilot-sidebar"
        className={`${styles.sidebar}${sidebarOpen ? ` ${styles.sidebarOpen}` : ''}`}
        aria-label="Main navigation">
        <nav className={styles.sidebarNav}>
          <a className={styles.sidebarLink} href="/"><Icon name="home" /><span>Home</span></a>
          {sections.map((section) => (
            <React.Fragment key={section.label}>
              <div className={styles.divider} />
              <h2 className={styles.sidebarHeading}>{section.label}</h2>
              {section.links.map(([label, href, icon, active]) => (
                <a
                  key={label}
                  className={`${styles.sidebarLink}${active ? ` ${styles.active}` : ''}`}
                  href={href}
                  aria-current={active ? 'page' : undefined}>
                  <Icon name={icon} />
                  <span>{label}</span>
                </a>
              ))}
            </React.Fragment>
          ))}
          <div className={styles.divider} />
          <a className={styles.sidebarLink} href="https://wrangleworks.com" target="_blank" rel="noopener noreferrer">
            <Icon name="link" /><span>WrangleWorks Inc.</span>
          </a>
        </nav>
      </aside>
    </>
  );
}
