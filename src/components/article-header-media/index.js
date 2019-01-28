import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

import Heading from '~/src/components/heading'
import COLOURS from '~/src/settings/colours'
import { BASELINE } from '~/src/settings/typography'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER } from '~/src/settings/grid'
import { rem } from '~/src/utils'

const ArticleHeaderMediaWrapper = styled('div')`
  background-color: ${COLOURS.PRIMARY};
  padding: ${rem(GRID_GUTTER.S)};
  margin: 0 ${rem(-GRID_GUTTER.S)} ${rem(BASELINE)};

  ${BREAKPOINTS.M_MIN} {
    margin: 0 0 ${rem(BASELINE * 8)};
    padding: ${rem(GRID_GUTTER.M)};
  }

  video,
  img {
    max-width: 100%;
    display: block;
    grid-column: article-full;
    box-shadow: 0 ${rem(BASELINE * 2)} ${rem(BASELINE * 3)} ${COLOURS.SHADOW};
  }
`

const HeroImages = styled('div')`
  display: flex;
  &,
  div > & {
    grid-column: article-full;
  }
`

const Figure = styled('figure')`
  margin: 0;
  flex-basis: 50%;
  text-align: center;
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

  img {
    position: absolute;
    top: 0;
    left: 0;
    max-width: none;
    width: 100%;
    animation: ${a} 12s 3s infinite;
    animation-delay: ${props => (props.delay ? '4s' : null)};
  }
`

export default function ArticleHeaderMedia({
  videoPath,
  heroImages,
  mediaPath,
}) {
  return (
    <ArticleHeaderMediaWrapper>
      {videoPath && (
        <video
          src={require(`../../${videoPath}.mp4`)}
          autoPlay
          loop
          poster={require(`../../${videoPath}.jpg`)}
        />
      )}
      {!videoPath && heroImages && (
        <HeroImages>
          {heroImages.map((img, index) => (
            <Figure key={index}>
              <ImgHolder delay={index !== 0}>
                <img src={require(`../../${mediaPath}${img.image}`)} alt="" />
              </ImgHolder>
              <Heading element={'figcaption'}>{img.caption}</Heading>
            </Figure>
          ))}
        </HeroImages>
      )}
    </ArticleHeaderMediaWrapper>
  )
}
