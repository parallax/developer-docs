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
        children: ['/best-practices/accessibility/', '/best-practices/react/']
      },
      {
        title: 'Code Style',
        children: ['/code-style/javascript/']
      },
      {
        title: 'Useful libraries',
        children: ['/useful-libraries/scrolling/', '/useful-libraries/react/']
      },
      {
        title: 'Useful Tools',
        children: ['/useful-tools/snappy/']
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
