import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import Transition from '~/src/components/transition'
import { Helmet } from 'react-helmet'
import SiteHeader from '~/src/components/site-header'
import Typography from '~/src/components/typography'
import BaselineGrid from '~/src/components/baseline-grid'
import { MAX_WIDTH_REM } from '~/src/settings/max-width'
import { BASELINE } from '~/src/settings/typography'
import COLOURS from '~/src/settings/colours'
import { rem } from '~/src/utils'
import favicon from '~/src/images/favicon.png'

// Polyfills
// @TODO - do dynamic import
import 'url-search-params-polyfill'

// Source code highoighting CSS
require('prismjs/themes/prism-tomorrow.css')

// Fonts
// import interUI from '~/src/fonts/inter-ui-regular.woff2'
// import interUIBold from '~/src/fonts/inter-ui-bold.woff2'

const Wrapper = styled('div')`
  max-width: ${MAX_WIDTH_REM};
  margin: 0 auto;
  box-shadow: 0 ${rem(BASELINE * 3)} ${rem(BASELINE * 3)} ${COLOURS.SHADOW};
  overflow: hidden; /* stop box shadow showing at bottom of element  */
  display: flex;
  min-height: 100%;
  flex-direction: column;
  position: relative;
`

// Note that we need to pass location to our functional component
// so we have access to it down there in <Transition/>
const Layout = ({ children, location }) => {
  const search = location ? location.search : null
  const params = search ? new URLSearchParams(search) : null
  const grid = params ? params.get('grid') : false
  const hasGrid = grid === 'true' || grid === '1'
  return (
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
        <Wrapper>
          <Helmet
            title={data.site.siteMetadata.title}
            link={[
              { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
            ]}
          >
            <html lang="en" />
            {/* <link rel="preload" href={interUI} as="font" type="font/woff2" />
          <link rel="preload" href={interUIBold} as="font" type="font/woff2" />
          <link rel="preload" href={vollkorn} as="font" type="font/woff2" />
          <link rel="preload" href={vollkornBold} as="font" type="font/woff2" /> */}
          </Helmet>
          <Typography />
          {hasGrid && <BaselineGrid />}
          <SiteHeader
            titleHTML={data.site.siteMetadata.titleHTML}
            navigationLinks={data.site.siteMetadata.navigationLinks}
          />
          <Transition location={location}>{children}</Transition>
        </Wrapper>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  location: PropTypes.shape().isRequired,
}

export default Layout
