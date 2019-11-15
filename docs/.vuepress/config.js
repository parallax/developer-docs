module.exports = {
  title: 'Developer Docs',
  description:
    'The go-to reference for developer guides, explainations and implimentations',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Parallax Website', link: 'https://parall.ax' }
    ],
    sidebar: [
      {
        title: 'Guides',
        collapsable: false,
        children: [
          '/guides/bash/',
          '/guides/idle-until-urgent/',
          '/guides/next-gen-images/',
          '/guides/statamic/by-official-docs/',
          '/guides/statamic/by-parallax/',
          '/guides/jamstack-sites/',
          '/guides/jamstack-sites/react/',
          '/guides/fonts/'
        ]
      },
      {
        title: 'Best Practices',
        collapsable: false,
        children: [
          '/best-practices/accessibility/',
          '/best-practices/accessibility/examples/'
        ]
      },
      {
        title: 'Code Style',
        collapsable: false,
        children: ['/code-style/javascript/']
      },
      {
        title: 'Useful libraries',
        collapsable: false,
        children: ['/useful-libraries/scrolling/']
      }
    ],
    displayAllHeaders: true,
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    repo: 'parallax/developer-docs',
    docsDir: 'docs'
  }
}
