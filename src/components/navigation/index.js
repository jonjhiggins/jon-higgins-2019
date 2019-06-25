import React from 'react'
import styled from '@emotion/styled'
import { css, ClassNames, Global } from '@emotion/core'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Heading from '~/src/components/heading'
import Grid from '~/src/components/grid'
import { GRID_GUTTER_REM } from '~/src/settings/grid'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { BASELINE } from '~/src/settings/typography'
import { rem } from '~/src/utils'
import COLOURS from '~/src/settings/colours'
import Z_INDEX from '~/src/settings/z-index'
import ANIMATION from '~/src/settings/animation'

const linkStyles = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  color: inherit;
  text-decoration: none;
  box-sizing: border-box;

  ${BREAKPOINTS.S_MAX} {
    justify-content: center;
  }

  > h3 {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border-bottom: ${rem(2)} solid ${COLOURS.PRIMARY};
      transform: scaleX(0);
      transition: 100ms transform ${ANIMATION.EASING_OUT};
      transform-origin: 0 0;
    }
  }

  &:hover,
  &.active {
    > h3 {
      &::after {
        transform: scaleX(1);
      }
    }
  }
`

const NavigationWrapper = styled('nav')(
  {
    [BREAKPOINTS.S_MAX]: {
      transition: `400ms transform ${ANIMATION.EASING}`,
      position: 'fixed',
      boxSizing: 'border-box',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxWidth: '100vw',
      maxHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: `${COLOURS.WHITE}`,
      padding: `${rem(BASELINE * 3)} ${GRID_GUTTER_REM.S}`,
      zIndex: `${Z_INDEX.NAV_OPEN}`,
    },
    [BREAKPOINTS.M_MIN]: {
      position: 'relative',
    },

    '& > ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      flex: '0 1 100%',
    },
    '& li': {
      margin: `0 0 ${rem(BASELINE)}`,
      padding: 0,
      height: `${rem(BASELINE * 3.5)}`,
      transform: 'translateX(0)',

      [BREAKPOINTS.M_MIN]: {
        marginBottom: 0,
      },
    },
  },
  props => ({
    [BREAKPOINTS.S_MAX]: {
      transform: props.open ? 'translateX(0)' : 'translateX(100%)',
      boxShadow: props.open
        ? `0 ${rem(BASELINE * 3)} ${rem(BASELINE * 3)} ${COLOURS.SHADOW}`
        : null,
    },
  })
)

/* Make link active when any page in a section is the current
 page (e.g. highlight "work" on "/work/land-rover-interactive-stories") */
const partlyActive = className => ({ isPartiallyCurrent }) => ({
  className: className + (isPartiallyCurrent ? ` active` : ``),
})

class Navigation extends React.Component {
  render() {
    return (
      <NavigationWrapper open={this.props.open}>
        <Grid element={'ul'} cols={3}>
          {this.props.navigationLinks.map(({ name, link }, index) => (
            <li key={index}>
              {/* Have to wrap in ClassNames otherwise style won't be injected
              as emotion doesn't have an element to tie it to */}
              <ClassNames>
                {({ css, cx }) => (
                  <Link
                    to={link}
                    onClick={this.props.handleMenuClick}
                    // polyfill for matching active when on child routes
                    // https://github.com/gatsbyjs/gatsby/issues/7208
                    getProps={partlyActive(css(linkStyles))}
                  >
                    <Heading element={'h3'} sizeS={2} sizeM={1.5} light={true}>
                      {name}
                    </Heading>
                  </Link>
                )}
              </ClassNames>
            </li>
          ))}
        </Grid>
      </NavigationWrapper>
    )
  }
}

Navigation.propTypes = {
  open: PropTypes.bool,
  handleMenuClick: PropTypes.func,
  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ),
}

export default Navigation
