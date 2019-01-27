import React from 'react'
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group'
import PropTypes from 'prop-types'

// Adapted from https://divdev.io/animating-gatsby-pt/

const timeout = 500

const getTrasitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

class Transition extends React.PureComponent {
  render() {
    // Destructuring props to avoid garbage this.props... in return statement
    const { children, location } = this.props

    return (
      <TransitionGroup>
        {/* the key is necessary here because our ReactTransition needs to know
        when pages are entering/exiting the DOM */}
        <ReactTransition
          key={location.pathname}
          timeout={{ enter: timeout, exit: timeout }}
        >
          {status => (
            <div style={{ ...getTrasitionStyles[status] }}>{children}</div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}

Transition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Transition
