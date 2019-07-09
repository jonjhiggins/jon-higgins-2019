import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import { keyframes } from '@emotion/core'
import Img from 'gatsby-image'

import Heading from '~/src/components/heading'
import COLOURS from '~/src/settings/colours'
import { HERO_IMAGE_SHADOW } from '~/src/settings/shadows'

const HeroImages = styled('div')`
  display: flex;
  box-shadow: ${HERO_IMAGE_SHADOW};

  &,
  div > & {
    grid-column: article-full;
  }
`

const Figure = styled('figure')`
  margin: 0;
  flex-basis: 50%;
  text-align: center;

  figcaption {
    background-color: ${COLOURS.WHITE};
    text-transform: uppercase;
  }
`

const a = keyframes`
50% {
    transform: translateY(-33.3%);
}
75% {
    transform: translateY(0);
}
75.6% {
    transform: translateY(0);
}
`

const ImgHolder = styled('span')`
  position: relative;
  padding-top: 168.75%;
  overflow: hidden;
  display: block;

  > * {
    position: absolute !important;
    top: 0;
    left: 0;
    max-width: none;
    width: 100%;
    animation: ${a} 12s 3s infinite;
    animation-delay: ${props => (props.delay ? '4s' : null)};
  }
`

export default function ArticleHeaderImagesScroll({ heroImages }) {
  return (
    <StaticQuery
      query={graphql`
        query HeaderImages {
          allImageSharp {
            edges {
              node {
                fluid(maxWidth: 466) {
                  ...GatsbyImageSharpFluid
                  originalName
                }
              }
            }
          }
        }
      `}
      render={data => {
        const images = data.allImageSharp.edges.filter(edge =>
          heroImages.find(
            heroImage => heroImage.image === edge.node.fluid.originalName
          )
        )
        if (!images) {
          return null
        }

        return (
          <HeroImages>
            {images.map((img, index) => (
              <Figure key={index}>
                <ImgHolder delay={index !== 0}>
                  <Img fluid={img.node.fluid} alt={heroImages[index].alt} />
                </ImgHolder>
                <Heading element={'figcaption'} size={1}>
                  {heroImages[index].caption}
                </Heading>
              </Figure>
            ))}
          </HeroImages>
        )
      }}
    />
  )
}

ArticleHeaderImagesScroll.propTypes = {
  heroImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      caption: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
}
