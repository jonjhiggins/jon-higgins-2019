import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import { css, ClassNames } from '@emotion/core'

import COLOURS from '~/src/settings/colours'
import { BASELINE, interUIStyles } from '~/src/settings/typography'
import { rem } from '~/src/utils'

const fontStyle = css({ ...interUIStyles[1] })

const cssCTA = css`
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
  text-decoration: none;
  color: ${COLOURS.GREY_1};
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

export default function CTA({ to, children, back, href }) {
  return (
    <ClassNames>
      {({ css, cx }) => {
        return to ? (
          <Link className={css([fontStyle, cssCTA])} to={to}>
            {children}
          </Link>
        ) : (
          <a href={href} className={css([fontStyle, cssCTA])}>
            {children}
          </a>
        )
      }}
    </ClassNames>
  )
}

CTA.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  back: PropTypes.bool,
  children: PropTypes.string,
}
