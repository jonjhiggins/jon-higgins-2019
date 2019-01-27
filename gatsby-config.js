module.exports = {
  siteMetadata: {
    title: `Jon Higgins - A front-end developer in Melbourne, Australia`,
    titleHTML:
      'Jon Higgins <span>A front-end developer in Melbourne,&nbsp;Australia</span>',
    description: `Portfolio website with articles on front-end development`,
    author: `Jon Higgins`,
    navigationLinks: [
      {
        name: 'Work',
        link: '/work',
      },
      {
        name: 'Words',
        link: '/words',
      },
      {
        name: 'Who',
        link: '/who',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-layout',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
