import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Heading from '~/src/components/heading'
import COLOURS from '~/src/settings/colours'
import { HERO_IMAGE_SHADOW } from '~/src/settings/shadows'

const HeroImages = styled('div')`
  box-shadow: ${HERO_IMAGE_SHADOW};

  &,
  div > & {
    grid-column: article-full;
  }
`

const Figure = styled('figure')`
  margin: 0;
  text-align: center;

  figcaption {
    background-color: ${COLOURS.WHITE};
    text-transform: uppercase;
  }
`

export default function ArticleHeaderImages({ heroImages }) {
  return (
    <StaticQuery
      query={graphql`
        query HeaderImage {
          allImageSharp {
            edges {
              node {
                fluid(maxWidth: 933) {
                  ...GatsbyImageSharpFluid
                  originalName
                }
              }
            }
          }
        }
      `}
      render={data => {
        const image = data.allImageSharp.edges.find(edge => {
          const pieces = heroImages[0].image.split('/')
          const originalName = pieces[pieces.length - 1]
          return edge.node.fluid.originalName === originalName
        })
        if (!image) {
          return null
        }

        return (
          <HeroImages>
            <Figure>
              <Img fluid={image.node.fluid} alt={heroImages[0].alt} />
              {heroImages[0].caption && (
                <Heading element={'figcaption'} size={1}>
                  {heroImages[0].caption}
                </Heading>
              )}
            </Figure>
          </HeroImages>
        )
      }}
    />
  )
}

ArticleHeaderImages.propTypes = {
  heroImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      caption: PropTypes.string,
      alt: PropTypes.alt,
    })
  ),
}
