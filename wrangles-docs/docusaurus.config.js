import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WrangleWorks',
  tagline: "There's a process for that!",
  favicon: 'img/favicon.ico',

  url: 'https://wrangles.io',
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    recipeRunnerUrl: '/run-recipe',
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'registry',
        path: 'registry-docs',
        routeBasePath: 'wrangles',
        sidebarPath: './sidebarsRegistry.js',
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          exclude: [
            '**/_sources/**',
          ],
          remarkPlugins: [
            require('./src/remark/linksListMarker'),
            require('./src/remark/scrapedAttributes'),
          ],
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          // Use require.resolve to avoid path resolution quirks across environments.
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleTagManager: {
          containerId: 'GTM-53M7W79',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'WrangleWorks',
        items: [
          {
            type: 'custom-wrangleMode',
            position: 'left',
          },
          {
            to: '/playground',
            position: 'left',
            label: 'Playground',
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
