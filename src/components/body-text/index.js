import styled from '@emotion/styled'

import COLOURS from '~/src/settings/colours'
import { rem } from '~/src/utils'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER, GRID_GUTTER_REM } from '~/src/settings/grid'
import { interUIStyles, BASELINE } from '~/src/settings/typography'

const dashedBorder = `${rem(2)} dashed ${COLOURS.PRIMARY}`

const BodyText = styled('div')({
  'p, blockquote, video': {
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
  '[data-pullquote]::before': {
    ...interUIStyles[3],
    fontWeight: 'bold',
    content: 'attr(data-pullquote)',
    display: 'block',
    color: COLOURS.PRIMARY,
    borderTop: dashedBorder,
    borderBottom: dashedBorder,
    padding: `${rem(BASELINE - 2)} 0`,
    [BREAKPOINTS.M_MIN]: {
      marginLeft: `-${GRID_GUTTER_REM.M}`,
      borderBottom: 'none',
    },
    [BREAKPOINTS.L_MIN]: {
      ...interUIStyles[4],
    },
  },
  /* inline version on large breakpoint */
  'div[data-pullquote]': {
    [BREAKPOINTS.L_MIN]: {
      gridColumn: '1 / 5',
      margin: `${rem(GRID_GUTTER.M / 2)} 0 ${GRID_GUTTER_REM.M}`,
    },
    '&::before': {
      [BREAKPOINTS.L_MIN]: {
        margin: 0,
        padding: GRID_GUTTER_REM.M,
        borderBottom: dashedBorder,
      },
    },
  },
  /* pull-out version on large breakpoint */
  'p[data-pullquote]': {
    [BREAKPOINTS.L_MIN]: {
      gridColumn: '2 / 3',
      position: 'relative',
    },
    '&::before': {
      [BREAKPOINTS.L_MIN]: {
        border: 'none',
        top: 0,
        left: '100%',
        position: 'absolute',
        marginLeft: GRID_GUTTER_REM.M,
        width: `calc(300% + ${rem(GRID_GUTTER.M * 2)})`,
        zIndex: -1,
      },
    },
  },
  blockquote: {
    border: dashedBorder,
    marginLeft: 0,
    marginRight: 0,
    padding: rem(BASELINE),
    '& p:last-child': {
      marginBottom: 0,
    },
  },
  '.footnotes p': {
    marginBottom: 0,
  },
  /* inline code doesn't need prism colour styling */
  '*:not(pre) > code': {
    background: 'transparent',
    color: 'inherit',
  },
  video: {
    maxWidth: '100%',
  },
  'img, video': {
    border: `1px solid ${COLOURS.PRIMARY}`
  }
})

export default BodyText
