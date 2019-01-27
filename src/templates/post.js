import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const {
    title,
    description,
    date,
    heroVideos,
    category,
    heroImages,
  } = frontmatter
  const mediaPath = `data/${category}/images/`
  const videoPath =
    heroVideos && heroVideos.length ? `${mediaPath}${heroVideos[0]}` : null
  const hasMedia = videoPath !== null || (heroImages && heroImages.length > 0)
  return <div>{title}</div>
}

Template.propTypes = {
  data: PropTypes.object,
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        title
        description
        heroVideos
        heroImages {
          image
          caption
        }
        images
        category
      }
    }
  }
`
