import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { GRID_GUTTER_REM } from '~/src/settings/grid'

const GridElement = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  ${BREAKPOINTS.M_MIN} {
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, 1fr);
    grid-gap: ${GRID_GUTTER_REM.M};
  }
`

class Grid extends React.Component {
  render() {
    return (
      <GridElement cols={this.props.cols}>{this.props.children}</GridElement>
    )
  }
}

Grid.propTypes = {
  element: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  cols: PropTypes.number,
}

// Specifies the default values for props:
Grid.defaultProps = {
  element: 'div',
  cols: 5,
}

export default Grid
