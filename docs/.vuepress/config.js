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
          '/guides/idle-until-urgent/',
          '/guides/next-gen-images/',
          '/guides/statamic/by-video-tutorial/',
          '/guides/statamic/by-parallax/'
        ]
      },
      {
        title: 'Best Practices',
        collapsable: false,
        children: ['/best-practices/accessibility/']
      },
      {
        title: 'Code Style',
        collapsable: false,
        children: ['/code-style/javascript/']
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
