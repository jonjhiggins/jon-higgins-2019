import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PageWrapper from '~/src/components/page-wrapper'
import ArticleWrapper from '~/src/components/article-wrapper'
import Article from '~/src/components/article'
import ArticleContent from '~/src/components/article-content'
import ArticleHeaderMedia from '~/src/components/article-header-media'
import BodyText from '~/src/components/body-text'
import CTA from '~/src/components/cta'
import HeadingBackground from '~/src/components/heading-background'
import Heading from '~/src/components/heading'
import SEO from '~/src/components/seo'
import COLOURS from '~/src/settings/colours'

export default function Template({ data, pageTitle }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const {
    title,
    description,
    date,
    heroVideos,
    category,
    heroImages,
    contentUrl,
  } = frontmatter
  const mediaPath = `data/${category}/images/`
  const videoPath =
    heroVideos && heroVideos.length ? `${mediaPath}${heroVideos[0]}` : null
  const hasMedia = videoPath !== null || (heroImages && heroImages.length > 0)
  return (
    <PageWrapper>
      <SEO title={pageTitle || title} />
      <HeadingBackground>{title}</HeadingBackground>
      <ArticleWrapper>
        <Article hasMedia={hasMedia}>
          <ArticleContent>
            {(videoPath || heroImages) && (
              <ArticleHeaderMedia
                videoPath={videoPath}
                mediaPath={mediaPath}
                heroImages={heroImages}
              />
            )}
            {date && (
              <Heading element={'time'} marginBottom={2}>
                {date}
              </Heading>
            )}
            {description && (
              <Heading
                element={'h2'}
                sizeS={2}
                sizeM={3}
                marginBottomS={3}
                marginBottomM={6}
              >
                {description}
              </Heading>
            )}
            <BodyText dangerouslySetInnerHTML={{ __html: html }} />
            {contentUrl && (
              <span>
                <CTA href={contentUrl}>View work</CTA>
              </span>
            )}
          </ArticleContent>
        </Article>
      </ArticleWrapper>
    </PageWrapper>
  )
}

Template.propTypes = {
  pageTitle: PropTypes.string,
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
          alt
        }
        images
        category
        contentUrl
      }
    }
  }
`
