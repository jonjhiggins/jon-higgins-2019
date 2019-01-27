import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PostTemplate from '../../templates/post'

/**
 * Page for "who"
 * @param {object} data [description]
 */
export default function Section({ data }) {
  return <PostTemplate data={data} />
}

export const pageQuery = graphql`
  query GetWhoPost {
    markdownRemark(fileAbsolutePath: { regex: "/src/data/who/who.md/" }) {
      html
      frontmatter {
        title
      }
    }
  }
`

Section.propTypes = {
  data: PropTypes.shape()
}
