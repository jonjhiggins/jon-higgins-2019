import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import ArticleHeaderImagesScroll from '~/src/components/article-header-images-scroll'
import ArticleHeaderImage from '~/src/components/article-header-image'
import COLOURS from '~/src/settings/colours'
import { BASELINE } from '~/src/settings/typography'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER } from '~/src/settings/grid'
import { rem } from '~/src/utils'
import { HERO_IMAGE_SHADOW } from '~/src/settings/shadows'


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
    box-shadow: ${HERO_IMAGE_SHADOW};
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
      {/* Single image hero */}
      {!videoPath && heroImages.length === 1 && (
        <ArticleHeaderImage heroImages={heroImages} mediaPath={mediaPath} />
      )}
      {/* Double scrolling images hero */}
      {!videoPath && heroImages.length > 1 && (
        <ArticleHeaderImagesScroll
          heroImages={heroImages}
          mediaPath={mediaPath}
        />
      )}
    </ArticleHeaderMediaWrapper>
  )
}

ArticleHeaderMedia.propTypes = {
  videoPath: PropTypes.string,
  mediaPath: PropTypes.string,
  heroImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
}
