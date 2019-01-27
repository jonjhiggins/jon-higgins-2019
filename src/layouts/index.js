import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Transition from '~/src/components/transition'
import Helmet from 'react-helmet'
import SiteHeader from '~/src/components/site-header'
import Typography from '~/src/components/typography'

// Note that we need to pass location to our functional component
// so we have access to it down there in <Transition/>

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            titleHTML
            navigationLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet title={data.site.siteMetadata.title}>
          <html lang="en" />
        </Helmet>
        <Typography />
        <SiteHeader
          titleHTML={data.site.siteMetadata.titleHTML}
          navigationLinks={data.site.siteMetadata.navigationLinks}
        />
        <Transition location={location}>{children}</Transition>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  location: PropTypes.shape().isRequired,
}

export default Layout
