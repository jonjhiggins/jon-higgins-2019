import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'

import HeadingBackground from '~/src/components/heading-background'
import { GRID_GUTTER_REM } from '~/src/settings/grid'
import { BREAKPOINTS } from '~/src/settings/breakpoints'

const PageWrapperOuter = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const PageWrapperInner = styled('div')`
  margin-left: ${GRID_GUTTER_REM.S};
  margin-right: ${GRID_GUTTER_REM.S};
  width: calc(100% - (${GRID_GUTTER_REM.S} * 2));

  ${BREAKPOINTS.M_MIN} {
    margin-left: ${GRID_GUTTER_REM.M};
    margin-right: ${GRID_GUTTER_REM.M};
    width: calc(100% - (${GRID_GUTTER_REM.M} * 2));
  }
`

export default function PageWrapper({ children, heading }) {
  return (
    <PageWrapperOuter>
      <PageWrapperInner>
        {heading && <HeadingBackground>{heading}</HeadingBackground>}
        {children}
      </PageWrapperInner>
    </PageWrapperOuter>
  )
}

PageWrapper.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
