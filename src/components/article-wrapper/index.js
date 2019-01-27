import styled from '@emotion/styled'

import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER_REM } from '~/src/settings/grid'

const ArticleWrapper = styled('div')`
  ${BREAKPOINTS.M_MIN} {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: ${GRID_GUTTER_REM.M};
  }
`

export default ArticleWrapper
