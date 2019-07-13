import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Article from '~/src/components/article'
import ArticleContent from '~/src/components/article-content'
import ArticleWrapper from '~/src/components/article-wrapper'
import CTA from '~/src/components/cta'
import HeadingBackground from '~/src/components/heading-background'
import LinkBlock from '~/src/components/link-block'
import PageWrapper from '~/src/components/page-wrapper'
import SEO from '~/src/components/seo'

import { BASELINE } from '~/src/settings/typography'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { rem } from '~/src/utils'
import COLOURS from '~/src/settings/colours'

const LinkBlocks = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  grid-column: article-full;
  display: grid;
  grid-template-columns: inherit;
  grid-gap: inherit;
`

const LinkBlockSpacer = styled('li')`
  list-style: none;
  margin: 0 0 ${rem(BASELINE * 2)};
  padding: 0;
  display: none;
  ${BREAKPOINTS.M_MIN} {
    display: block;
    border: ${rem(2)} solid ${COLOURS.GREY_BORDER};
    grid-column: span ${props => props.gridWidth};
  }
`

const Footer = styled('footer')`
  margin-top: ${rem(BASELINE * 2)};
`

const Aux = props => props.children

export default class Template extends React.Component {
  constructor() {
    super()
    this.state = {
      linkBlocksVisible: true,
    }
  }
  render() {
    return (
      <PageWrapper>
        <SEO title={this.props.heading} />
        <HeadingBackground>{this.props.heading}</HeadingBackground>
        <ArticleWrapper>
          <Article border={false} fullWidthLargeBreakpoint={true}>
            <ArticleContent centreGrid={false}>
              <LinkBlocks>
                {this.props.items.map(({ node }, index) => {
                  const { frontmatter, fields } = node
                  return (
                    <Aux key={index}>
                      <LinkBlock
                        key={index}
                        visible={this.state.linkBlocksVisible}
                        link={fields.slug}
                        frontmatter={frontmatter}
                        handleClick={this.handleClickBound}
                        gridWidth={(() => {
                          return (index + 1) % 2 === 0 ? 4 : 3
                        })()}
                      />
                      <LinkBlockSpacer
                        gridWidth={(() => {
                          return (index + 1) % 2 === 0 ? 1 : 2
                        })()}
                      />
                    </Aux>
                  )
                })}
              </LinkBlocks>
              {this.props.footerCTA && (
                <Footer>
                  <CTA to={this.props.footerCTA.link}>
                    {this.props.footerCTA.text}
                  </CTA>
                </Footer>
              )}
            </ArticleContent>
          </Article>
        </ArticleWrapper>
      </PageWrapper>
    )
  }
}

Template.propTypes = {
  data: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  heading: PropTypes.string,
  footerCTA: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string,
  }),
  fields: PropTypes.shape({
    slug: PropTypes.string,
  }),
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
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
          description
          archive
        }
      }
    }
  }
`
