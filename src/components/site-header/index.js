import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '~/src/components/navigation'

class SiteHeader extends React.Component {
  render() {
    return (
      <div>
        <Navigation/>
      </div>
    )
  }
}

SiteHeader.propTypes = {
  titleHTML: PropTypes.string,
}

export default SiteHeader
