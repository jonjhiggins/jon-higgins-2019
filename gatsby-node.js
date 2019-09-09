/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

/**
 * Change Webpack config
 */
exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig()

  // In "import" statements allow "~" to point to root of project
  config.resolve.alias['~'] = path.resolve(__dirname),

  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/)
    ),

    // Recreate it with custom exclude filter
    {
      // Called without any arguments, `loaders.js` will return an
      // object like:
      // {
      //   options: undefined,
      //   loader: '/path/to/node_modules/gatsby/dist/utils/babel-loader.js',
      // }
      // Unless you're replacing Babel with a different transpiler, you probably
      // want this so that Gatsby will apply its required Babel
      // presets/plugins.  This will also merge in your configuration from
      // `babel.config.js`.
      ...loaders.js(),

      test: /\.jsx?$/,

      // Exclude all node_modules from transpilation, except for 'hex-rgb'
      exclude: modulePath =>
        /node_modules/.test(modulePath) &&
        !/node_modules\/(hex-rgb)/.test(modulePath),
    },
  ]

  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config)
}

/**
 * onCreateNode function will be called by Gatsby whenever a new node
 * is created (or updated).
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`src/templates/post.js`)

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: postTemplate,
        // additional data can be passed via context
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })
  })
}

exports.onCreateDevServer = ({ app }) => {
  const fsMiddlewareAPI = require('netlify-cms-backend-fs/dist/fs')
  fsMiddlewareAPI(app)
}
