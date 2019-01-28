import React from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { graphql, navigate } from 'gatsby'
import hexRgb from 'hex-rgb'

import PageWrapper from '~/src/components/page-wrapper'
import SEO from '~/src/components/seo'
import HeadingBackground from '~/src/components/heading-background'
import ArticleWrapper from '~/src/components/article-wrapper'
import Article from '~/src/components/article'
import ArticleContent from '~/src/components/article-content'
import CTA from '~/src/components/cta'
import Heading from '~/src/components/heading'
import { BASELINE } from '~/src/settings/typography'
import COLOURS from '~/src/settings/colours'
import { rem } from '~/src/utils'

const PRIMARY_RGB = hexRgb(COLOURS.PRIMARY, { format: 'array' })
PRIMARY_RGB.pop()

const LinkBlocks = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  grid-column: article-full;
`

const LinkBlockInner = styled('li')`
  list-style: none;
  margin: 0 0 ${rem(BASELINE * 2)};
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
  position: relative;
  opacity: ${props => (props.visible || props.transitioning ? 1 : 0)};
  transition: opacity 400ms ease-out;
  & > a {
    color: ${COLOURS.BLACK};
    text-decoration: none;
    padding: ${rem(BASELINE)};
    display: block;
    transition: background-color 400ms ease-out;
    &:hover {
      background-color: rgba(${PRIMARY_RGB.join(',')}, 0.05);
    }
  }
`

const TransitionBlock = styled(`div`)`
  position: absolute;
  background-color: ${COLOURS.PRIMARY};
  left: ${rem(-1)};
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateY(${props => props.translateY}px)
    scaleY(${props => props.scaleY});
  transition: all 400ms ease-out;
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
`

const Footer = styled('footer')`
  margin-top: ${rem(BASELINE * 2)};
`

class LinkBlock extends React.Component {
  constructor() {
    super()
    this.handleClickBound = this.handleClick.bind(this)
    this.state = {
      transitioning: false,
      transitionPosition: {
        translateY: 0,
        scaleY: 1,
      },
    }
  }
  handleClick(e) {
    e.preventDefault()
    const element = e.currentTarget
    const url = e.currentTarget.getAttribute('href')
    navigate(url)
    return

    const { top, left, width, height } = element.getBoundingClientRect()
    this.setState({
      transitioning: true,
    })
    const {
      height: articleHeight,
      top: articleTop,
    } = this.props.fadeOutOthers()
    const scaleY = articleHeight / height
    console.log(scaleY)
    const translateY = articleTop - top
    console.log(translateY)
    window.setTimeout(() => {
      this.setState({
        transitionPosition: {
          scaleY,
          translateY,
        },
      })
    }, 100)
    // window.setTimeout(navigate.bind(null, url), 1000)
  }
  render() {
    return (
      <LinkBlockInner
        visible={this.props.visible}
        transitioning={this.state.transitioning}
      >
        <a href={this.props.link} onClick={this.handleClickBound}>
          <Heading element={'time'} size={1} colour={COLOURS.GREY_GREEN}>
            {this.props.frontmatter.date}
          </Heading>
          <Heading element={'h3'} size={2}>
            {this.props.frontmatter.title}
          </Heading>
        </a>
        {this.state.transitioning && (
          <TransitionBlock
            scaleY={this.state.transitionPosition.scaleY}
            translateY={this.state.transitionPosition.translateY}
          />
        )}
      </LinkBlockInner>
    )
  }
}

export default class Template extends React.Component {
  constructor() {
    super()
    this.fadeOutOthersBound = this.fadeOutOthers.bind(this)
    this.state = {
      linkBlocksVisible: true,
    }
  }
  fadeOutOthers() {
    const size = ReactDOM.findDOMNode(
      this.refs['article']
    ).getBoundingClientRect()
    console.log(size)
    this.setState({
      linkBlocksVisible: false,
    })
    return size
  }
  render() {
    return (
      <PageWrapper>
        <SEO title={this.props.heading} />
        <HeadingBackground>{this.props.heading}</HeadingBackground>
        <ArticleWrapper>
          <Article border={false} ref="article">
            <ArticleContent centreGrid={false}>
              <LinkBlocks>
                {this.props.items.map(({ node }, index) => {
                  const { frontmatter, fields } = node
                  return (
                    <LinkBlock
                      key={index}
                      visible={this.state.linkBlocksVisible}
                      fadeOutOthers={this.fadeOutOthersBound}
                      link={fields.slug}
                      frontmatter={frontmatter}
                      handleClick={this.handleClickBound}
                    />
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
          archive
        }
      }
    }
  }
`
