import { Global, css } from '@emotion/core'
import React from 'react'
import interUI from '~/src/fonts/inter-ui-regular.woff2'
import interUIBold from '~/src/fonts/inter-ui-bold.woff2'

import { interUIStyles, BODY_FONT_SIZE } from '~/src/settings/typography'
import COLOURS from '~/src/settings/colours'

const globalStyles = css`
  @font-face {
    font-family: 'Inter UI';
    font-style: normal;
    font-weight: 400;
    src: url(${interUI}) format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter UI';
    font-style: normal;
    font-weight: 700;
    src: url(${interUIBold}) format('woff2');
    font-display: swap;
  }

  html {
    font-size: ${BODY_FONT_SIZE}px;
    height: 100%;
  }

  body {
    color: ${COLOURS.BODY_TEXT};
    margin: 0;
    ${interUIStyles['1.5']};
    height: 100%;
  }

  #___gatsby,
  #___gatsby > * {
    height: 100%;
  }

  /* suppress focus ring on form controls for mouse and touch users */
  [data-whatintent='mouse'] *:focus,
  [data-whatintent='touch'] *:focus {
    outline: none;
  }
`

export default class Typography extends React.Component {
  render() {
    return <Global styles={globalStyles} />
  }
}
