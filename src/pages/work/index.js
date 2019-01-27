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
  }
}) {
  const itemsFiltered = items.filter(item => !item.node.frontmatter.archive)
  return (
    <SectionTemplate
      items={itemsFiltered}
      heading={'Work'}
      footerCTA={{
        text: 'Archive',
        link: '/work/archive',
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
}

export const pageQuery = graphql`
  query GetWorkPosts {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "work" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      ...GetSectionPosts
    }
  }
`
