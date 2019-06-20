import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

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
  text-align: center;

  figcaption {
    background-color: ${COLOURS.WHITE};
    text-transform: uppercase;
  }
`

export default function ArticleHeaderImages({ heroImages, mediaPath }) {
  return (
    <HeroImages>
      {heroImages.map((img, index) => (
        <Figure key={index}>
          <img src={require(`../../${mediaPath}${img.image}`)} alt="" />
          {img.caption && (
            <Heading element={'figcaption'} size={1}>
              {img.caption}
            </Heading>
          )}
        </Figure>
      ))}
    </HeroImages>
  )
}

ArticleHeaderImages.propTypes = {
  mediaPath: PropTypes.string,
  heroImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
}
