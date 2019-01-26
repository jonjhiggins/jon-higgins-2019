import React from 'react'
import PropTypes from 'prop-types'

export default class Template extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(({ node }, index) => {
          const { frontmatter } = node
          return <div key={index}>{frontmatter.title}</div>
        })}
      </div>
    )
  }
}

Template.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

/**
 * GraphQL fragment that specifies the content
 * we need for this template.
 * It gets included in a page's GraphQL query via "...GetSectionPosts"
 * https://www.gatsbyjs.org/docs/querying-with-graphql/#fragments
 * @type {Query}
 */
export const pageQuery = graphql`
  fragment GetSectionPosts on MarkdownRemarkConnection {
    edges {
      node {
        id
        fileAbsolutePath
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
          archive
        }
      }
    }
  }
`
