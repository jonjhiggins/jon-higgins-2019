import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { rem } from '~/src/utils'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { interUIStyles, BASELINE } from '~/src/settings/typography'

const Heading = ({
  element,
  children,
  size = 1,
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
  const sizeIndex = size
  const sizeSIndex = typeof sizeS !== 'undefined' ? sizeS : null
  const sizeMIndex = typeof sizeM !== 'undefined' ? sizeM : null

  const mainIndex = sizeSIndex !== null ? sizeSIndex : sizeIndex

  const mainStyles = interUIStyles[mainIndex]
  const headingStyles = {
    color: colour || mainStyles['color'],
    marginTop: rem(marginTop * BASELINE),
    marginBottom: rem((marginBottomS || marginBottom) * BASELINE),
    fontWeight: light ? 'normal' : mainStyles['fontWeight'],
    textTransform: uppercase || mainStyles['textTransform'],
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
    const largeStyles = interUIStyles[sizeMIndex]
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
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginBottomS: PropTypes.number,
  marginBottomM: PropTypes.number,
  html: PropTypes.string,
  light: PropTypes.bool,
  colour: PropTypes.string,
  uppercase: PropTypes.oneOf(['uppercase', 'none']),
}

export default Heading
