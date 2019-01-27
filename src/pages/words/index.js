import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SectionTemplate from '../../templates/section-listing'

/**
 * Section listing page for words articles
 * @param {object} data [description]
 */
export default function Section({
  data: {
    allMarkdownRemark: { edges: items },
  },
}) {
  return <SectionTemplate items={items} heading={'Words'} />
}

Section.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export const pageQuery = graphql`
  query GetWordsPosts {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "words" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      ...GetSectionPosts
    }
  }
`
