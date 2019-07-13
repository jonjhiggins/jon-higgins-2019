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
import { BREAKPOINTS_RAW, BREAKPOINTS } from '~/src/settings/breakpoints'
import { rem } from '~/src/utils'
import favicon from '~/src/images/favicon.png'

// Polyfills
// @TODO - do dynamic import
import 'url-search-params-polyfill'

// Fonts
import interUI from '~/src/fonts/inter-ui-regular.woff2'
import interUIBold from '~/src/fonts/inter-ui-bold.woff2'

// Source code highoighting CSS
require('prismjs/themes/prism-tomorrow.css')

const HEADER_HEIGHT_S = BASELINE * 5
const HEADER_HEIGHT_M = BASELINE * 7

const Wrapper = styled('div')`
  max-width: ${MAX_WIDTH_REM};
  margin: 0 auto;
  box-shadow: 0 ${rem(BASELINE * 3)} ${rem(BASELINE * 3)} ${COLOURS.SHADOW};
  overflow: hidden; /* stop box shadow showing at bottom of element  */
  display: flex;
  min-height: 100%;
  flex-direction: column;
  position: relative;
  padding-top: ${props => (props.headerFixed ? rem(HEADER_HEIGHT_S) : '')};

  ${BREAKPOINTS.M_MIN} {
    padding-top: ${props => (props.headerFixed ? rem(HEADER_HEIGHT_M) : '')};
  }
`

const MainContent = styled('div')`
  padding-top: ${rem(BASELINE * 2)};
`

const MEMORY_STORE_KEYS = {
  LAST_SCROLL_Y: 'lastScrollY',
  WAITING_FOR_ANIMATION_FRAME: 'waitingForAnimationFrame',
}

/** outside of state for performance */
const memoryStore = {
  _data: new Map(),
  get(key) {
    if (!key) {
      return null
    }

    return this._data.get(key) || null
  },
  set(key, data) {
    if (!key) {
      return
    }
    return this._data.set(key, data)
  },
}

/**
 * Use PureComponent so setState doesn't always trigger componentDidUpdate
 */
class LayoutComponent extends React.PureComponent {
  constructor() {
    super()
    this.handleScrollBound = this.handleScroll.bind(this)
    this.handleBreakpointChangeBound = this.handleBreakpointChange.bind(this)
    this.state = {
      breakpointSmall: true,
      headerFixed: false,
      headerFoldUp: false,
    }
  }
  componentDidMount() {
    // No window in server rendered version
    if (typeof window === 'undefined') {
      return
    }
    // Set memory store inital values
    memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, false)
    memoryStore.set(MEMORY_STORE_KEYS.LAST_SCROLL_Y, 0)

    window.addEventListener('scroll', this.handleScrollBound)

    // Set up media query listeners (header different height on big screen)
    const mediaQueryList = window.matchMedia(
      `(min-width: ${BREAKPOINTS_RAW.M}px)`
    )
    this.setState({ breakpointSmall: !mediaQueryList.matches })
    mediaQueryList.addListener(this.handleBreakpointChangeBound)
  }
  componentWillUnmount() {
    // No window in server rendered version
    if (typeof window === 'undefined') {
      return
    }
    window.removeEventListener('scroll', this.handleScrollBound)
  }
  /**
   * Handle user scroll event - collapse the header
   */
  handleScroll() {
    const { scrollY } = window
    const scrollingUp =
      scrollY < memoryStore.get(MEMORY_STORE_KEYS.LAST_SCROLL_Y)
    memoryStore.set(MEMORY_STORE_KEYS.LAST_SCROLL_Y, scrollY)

    if (memoryStore.get(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME)) {
      return
    }

    const scrollTriggerPoint = this.state.breakpointSmall
      ? HEADER_HEIGHT_S
      : HEADER_HEIGHT_M
    const headerFixed = scrollY > scrollTriggerPoint
    window.requestAnimationFrame(
      this.fixUnFixHeader.bind(this, headerFixed, scrollingUp)
    )

    memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, true)
  }
  /**
   * Handle breakpoint change
   * @param {MediaQueryListEvent} e
   */
  handleBreakpointChange(e) {
    this.setState({ breakpointSmall: !e.matches })
  }
  /**
   * Fix/unfix site header, fold up/down site header when fixed
   */
  fixUnFixHeader(headerFixed, scrollingUp) {
    this.setState({
      headerFixed,
      headerFoldUp: headerFixed,
    })
    // Debounce if waiting for requestAnimationFrame
    memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, false)

    if (headerFixed && scrollingUp && this.state.head) {
      this.setState({ headerFoldUp: false })
    }
  }
  render() {
    const { siteData, location, children } = this.props
    const search = location ? location.search : null
    const params = search ? new URLSearchParams(search) : null
    const grid = params ? params.get('grid') : false
    const hasGrid = grid === 'true' || grid === '1'
    return (
      <Wrapper headerFixed={this.state.headerFixed}>
        <Helmet
          title={siteData.site.siteMetadata.title}
          link={[
            { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
          ]}
        >
          <html lang="en" />
          <link rel="preload" href={interUI} as="font" type="font/woff2" />
          <link rel="preload" href={interUIBold} as="font" type="font/woff2" />
        </Helmet>
        <Typography />
        {hasGrid && <BaselineGrid />}
        <SiteHeader
          titleHTML={siteData.site.siteMetadata.titleHTML}
          navigationLinks={siteData.site.siteMetadata.navigationLinks}
          headerFixed={this.state.headerFixed}
          foldUp={this.state.headerFoldUp}
        />
        <MainContent>
          <Transition location={location}>{children}</Transition>
        </MainContent>
      </Wrapper>
    )
  }
}

const Layout = props => (
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
    render={data => <LayoutComponent siteData={data} {...props} />}
  />
)

LayoutComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  location: PropTypes.shape().isRequired,
  siteData: PropTypes.shape().isRequired,
}

export default Layout
