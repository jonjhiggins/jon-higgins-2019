import styled from '@emotion/styled'

import COLOURS from '~/src/settings/colours'
import { rem } from '~/src/utils'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER, GRID_GUTTER_REM } from '~/src/settings/grid'
import { interUIStyles, BASELINE } from '~/src/settings/typography'

const BodyText = styled('div')({
  p: {
    margin: `0 0 ${rem(BASELINE * 2)}`,
  },
  'ul, ol': {
    margin: `0 0 ${rem(BASELINE * 2)}`,
    padding: `0 0 0 1em`,
  },
  'p + ul, p + ol': {
    marginTop: `-${rem(BASELINE)}`,
  },
  li: {
    marginBottom: rem(BASELINE * 1),
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  'a:not(.gatsby-resp-image-link):not(.footnote-backref)': {
    borderBottom: `${rem(2)} solid ${COLOURS.PRIMARY}`,
    lineHeight: '1',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: rem(-3),
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: COLOURS.PRIMARY,
      transform: 'scaleY(0)',
      zIndex: '-1',
      opacity: '0.25',
      transition: 'transform 100ms ease-out',
      transformOrigin: 'bottom',
    },
    '&:hover': {
      '&::before': {
        transform: 'scaleY(1)',
      },
    },
  },
  'h2, h3, h4, h5, h6': {
    color: COLOURS.GREY_2,
  },
  'h2, h3': {
    ...interUIStyles[2],
    color: COLOURS.GREY_2,
    [BREAKPOINTS.M_MIN]: {
      ...interUIStyles[3],
    },
  },
  h4: {
    ...interUIStyles[2],
  },
  'h5, h6': {
    ...interUIStyles[1],
  },
  '.gatsby-resp-image-link': {
    margin: `${rem(BASELINE)} 0`,
  },
  code: {
    whiteSpace: 'pre-wrap',
  },
  'p[data-pullquote]': {
    [BREAKPOINTS.L_MIN]: {
      gridColumn: '2 / 3',
      position: 'relative',
    },
  },
  'p[data-pullquote]::before': {
    ...interUIStyles[3],
    fontWeight: 'bold',
    content: 'attr(data-pullquote)',
    display: 'block',
    color: COLOURS.PRIMARY,
    borderTop: `${rem(2)} solid ${COLOURS.PRIMARY}`,
    borderBottom: `${rem(2)} solid ${COLOURS.PRIMARY}`,
    padding: `${rem(BASELINE - 2)} 0`,
    [BREAKPOINTS.M_MIN]: {
      marginLeft: `-${GRID_GUTTER_REM.M}`,
      borderBottom: 'none',
    },
    [BREAKPOINTS.L_MIN]: {
      border: 'none',
      ...interUIStyles[4],
      top: 0,
      left: '100%',
      position: 'absolute',
      marginLeft: GRID_GUTTER_REM.M,
      width: `calc(300% + ${rem(GRID_GUTTER.M * 2)})`,
      zIndex: -1,
    },
  },
  '.footnotes p': {
    marginBottom: 0,
  },
})

export default BodyText
