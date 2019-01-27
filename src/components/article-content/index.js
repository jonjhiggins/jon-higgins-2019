import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER_REM } from '~/src/settings/grid'

const ArticleContent = styled('div')`
  display: inherit;
  grid-template-columns: inherit;
  grid-column-gap: inherit;
  grid-column: article-full;

  & > *:not(div) {
    ${BREAKPOINTS.M_MIN} {
      grid-column: ${props => (props.centreGrid ? 'article-main' : null)};
    }
  }

  & > div {
    display: inherit;
    grid-template-columns: inherit;
    grid-column-gap: inherit;
    grid-column: article-full;

    & > * {
      ${BREAKPOINTS.M_MIN} {
        grid-column: article-main;
      }
    }

    /* make code blocks full width */
    & > .gatsby-highlight {
      ${BREAKPOINTS.M_MIN} {
        grid-column: article-full;
        padding: ${GRID_GUTTER_REM.M};
      }
    }
  }
`

ArticleContent.propTypes = {
  centreGrid: PropTypes.bool,
}

ArticleContent.defaultProps = {
  centreGrid: true,
}

export default ArticleContent
