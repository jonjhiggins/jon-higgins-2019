import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SectionTemplate from '../../templates/section-listing'

/**
 * Section listing page for work articles
 * @param {object} data [description]
 */
export default function Section({
  data: {
    allMarkdownRemark: { edges: items },
  },
  location,
}) {
  const itemsFiltered = items.filter(item => item.node.frontmatter.archive)
  return (
    <SectionTemplate
      location={location}
      items={itemsFiltered}
      heading={'Work Archive'}
      footerCTA={{
        text: 'Back to Work',
        link: '/work',
      }}
    />
  )
}

Section.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  location: PropTypes.shape()
}

export const pageQuery = graphql`
  query GetWorkArchivePosts {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "work" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      ...GetSectionPosts
    }
  }
`
