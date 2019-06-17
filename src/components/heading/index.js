import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { rem } from '~/src/utils'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import {
  interUIStyles,
  vollkornStyles,
  BASELINE,
} from '~/src/settings/typography'

const Heading = ({
  element,
  children,
  size = 1,
  type = 'INTER_UI',
  marginTop = 0,
  marginBottom = 0,
  marginBottomS,
  marginBottomM,
  html,
  sizeS,
  sizeM,
  light,
  colour,
  uppercase,
}) => {
  const sizeIndex = size - 1
  const sizeSIndex = typeof sizeS !== 'undefined' ? sizeS - 1 : null
  const sizeMIndex = typeof sizeM !== 'undefined' ? sizeM - 1 : null

  const mainIndex = sizeSIndex !== null ? sizeSIndex : sizeIndex

  const mainStyles =
    type === 'INTER_UI' ? interUIStyles[mainIndex] : vollkornStyles[mainIndex]
  const headingStyles = {
    color: colour || null,
    marginTop: rem(marginTop * BASELINE),
    marginBottom: rem((marginBottomS || marginBottom) * BASELINE),
    fontWeight: light ? 'normal' : null,
    textTransform: uppercase || null,
    display: 'block',
    '& > span': {
      fontWeight: 'normal',
    },
    'a.active > &': {
      fontWeight: 'bold', // site-header links active state
    },
    'a > &': {
      color: colour || 'inherit',
    },
    [BREAKPOINTS.M_MIN]: {
      marginBottom: marginBottomM ? rem(marginBottomM * BASELINE) : null,
    },
  }

  let combinedStyles = Object.assign({}, mainStyles, headingStyles)

  // Set large breakpoint if size defined
  if (sizeMIndex >= 0) {
    const largeStyles =
      type === 'INTER_UI'
        ? interUIStyles[sizeMIndex]
        : vollkornStyles[sizeMIndex]
    const largeStylesMerged = Object.assign({}, largeStyles, headingStyles)
    combinedStyles = {
      ...combinedStyles,
      [BREAKPOINTS.M_MIN]: largeStylesMerged,
    }
  }

  const HeadingElement = styled(element)(combinedStyles)
  return html ? (
    <HeadingElement dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <HeadingElement>{children}</HeadingElement>
  )
}

Heading.propTypes = {
  element: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.number,
  sizeS: PropTypes.number,
  sizeM: PropTypes.number,
  type: PropTypes.oneOf(['INTER_UI', 'VOLKORN']),
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginBottomS: PropTypes.number,
  marginBottomM: PropTypes.number,
  html: PropTypes.string,
  light: PropTypes.bool,
  colour: PropTypes.string,
  uppercase: PropTypes.oneOf(['uppercase', 'lowercase']),
}

export default Heading
