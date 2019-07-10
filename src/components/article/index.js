import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER, GRID_GUTTER_REM } from '~/src/settings/grid'
import { BASELINE } from '~/src/settings/typography'
import COLOURS from '~/src/settings/colours'
import { rem } from '~/src/utils'

const columnTemplates = {
  fourCol: `[article-full-start] 1fr [article-main-start] repeat(2, 1fr) 
            [article-main-end] 1fr [article-full-end]`,
  fiveCol: `[article-full-start] 1fr [article-main-start] repeat(3, 1fr) 
  [article-main-end] 1fr [article-full-end]`,
}

const Article = styled('div')`
  border: ${props =>
    props.border ? `${rem(2)} solid ${COLOURS.PRIMARY}` : null};
  padding-top: ${props =>
    props.border && !props.hasMedia ? rem(BASELINE * 3 - 2) : ''};
  padding-bottom: ${props => (props.border ? rem(BASELINE * 3) : '')};
  margin: 0 -${rem(GRID_GUTTER.S + 2)} ${rem(BASELINE * 4)};

  ${BREAKPOINTS.S_MAX} {
    padding-left: ${GRID_GUTTER_REM.S};
    padding-right: ${GRID_GUTTER_REM.S};
  }

  ${BREAKPOINTS.M_MIN} {
    padding-top: ${props =>
      props.border && !props.hasMedia ? rem(BASELINE * 15 - 2) : ''};
    padding-bottom: ${props => (props.border ? rem(BASELINE * 11) : '')};
    margin-left: 0;
    margin-right: 0;
    grid-column: 1 / 6;
    display: grid;
    grid-template-columns: ${columnTemplates.fiveCol};
    grid-column-gap: ${GRID_GUTTER_REM.M};
  }

  ${BREAKPOINTS.L_MIN} {
    grid-column: ${props =>
      props.fullWidthLargeBreakpoint ? '1 / 6' : '1 / 5'};
    grid-template-columns: ${props =>
      props.fullWidthLargeBreakpoint
        ? columnTemplates.fiveCol
        : columnTemplates.fourCol};
  }
`

Article.propTypes = {
  border: PropTypes.bool,
  hasMedia: PropTypes.bool,
  fullWidthLargeBreakpoint: PropTypes.bool,
}

Article.defaultProps = {
  border: true,
  hasMedia: false,
  fullWidthLargeBreakpoint: false,
}

export default Article
