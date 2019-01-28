import { Link } from 'gatsby'
import React from 'react'
import { css } from '@emotion/core'

import COLOURS from '~/src/settings/colours'
import { BASELINE, interUIStyles } from '~/src/settings/typography'
import { rem } from '~/src/utils'

const fontStyle = css({ ...interUIStyles[0] })

const cssCTA = css`
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
  text-decoration: none;
  color: ${COLOURS.BLACK};
  border-radius: ${rem(3)};
  text-align: center;
  padding: ${rem((BASELINE / 4) * 3 - 2)} ${rem(BASELINE * 2 - 2)}; /* take 2px border in to account */
  display: inline-block;
  font-weight: bold;
  margin-bottom: ${rem(BASELINE / 2)};
  &::after {
    content: '\\2192';
    margin-left: 0.5em;
    font-size: 1.25em;
    line-height: 1;
  }
`

export default ({ to, children, back }) => (
  <Link css={[fontStyle, cssCTA]} to={to}>
    {children}
  </Link>
)
