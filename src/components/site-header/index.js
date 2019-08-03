import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Heading from '~/src/components/heading'
import Navigation from '~/src/components/navigation'
import Grid from '~/src/components/grid'
import { GRID_GUTTER_REM } from '~/src/settings/grid'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { MAX_WIDTH_REM } from '~/src/settings/max-width'
import ANIMATION from '~/src/settings/animation'
import {
  interUIStyles,
  BASELINE,
  BASELINE_REM,
} from '~/src/settings/typography'
import { rem } from '~/src/utils'
import COLOURS from '~/src/settings/colours'
import Z_INDEX from '~/src/settings/z-index'

const HEADER_PADDING_M = `${rem(BASELINE * 2)} ${GRID_GUTTER_REM.M} ${rem(
  BASELINE * 1.5
)}`
const HEADER_PADDING_M_FIXED = `0 ${GRID_GUTTER_REM.M}`

const Header = styled('header')`
  padding: ${rem(BASELINE * 1)} ${GRID_GUTTER_REM.S} ${rem(BASELINE)};
  border-bottom: ${rem(1)} solid ${COLOURS.GREY_BORDER};
  position: ${props => (props.fixed ? 'fixed' : '')};
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: ${Z_INDEX.NAV_OPEN};
  background-color: ${COLOURS.WHITE};
  max-width: ${MAX_WIDTH_REM};
  transform: ${props => (props.foldUp ? 'translateY(-100%)' : '')};
  transition: ${props =>
    !props.foldUp ? `400ms transform ${ANIMATION.EASING}` : ''};

  ${BREAKPOINTS.M_MIN} {
    padding: ${props =>
      props.fixed ? HEADER_PADDING_M_FIXED : HEADER_PADDING_M};
  }
`

const DescriptionLi = styled('li')`
  ${BREAKPOINTS.M_MIN} {
    grid-column: 1 / 3;
    display: ${props => (props.collapsed ? 'flex' : '')};
    align-items: ${props => (props.collapsed ? 'center' : '')};
  }
`

const Description = styled('div')`
  & a {
    text-decoration: none;
    color: inherit;

    & span {
      display: ${props => (props.collapsed ? 'none' : 'block')};
      text-transform: none;
      color: ${COLOURS.GREY_2};
    }
  }
`

const NavToggleButton = styled('button')({
  ...interUIStyles[1],
  border: 'none',
  position: 'absolute',
  padding: `${BASELINE_REM}rem ${GRID_GUTTER_REM.S}`,
  top: `0.25rem`,
  right: 0,
  backgroundColor: 'transparent',
  margin: 0,
  zIndex: `${Z_INDEX.NAV_OPEN + 1}`,
  [BREAKPOINTS.M_MIN]: {
    display: 'none;',
  },
})

const BurgerIcons = styled('span')`
  width: ${BASELINE_REM / 2}rem;
  height: ${BASELINE_REM / 2}rem;
  display: inline-block;
  margin-right: 0.5em;
  box-sizing: border-box;
  position: relative;
  &::after,
  &::before,
  span {
    width: 100%;
    height: ${rem(2)};
    background-color: ${COLOURS.GREY_3};
    position: absolute;
    left: 0;
  }
  span {
    top: 50%;
    transform: translate(${rem(-4)}, -50%);
    height: ${rem(2)};
    width: calc(100% + ${rem(4)});
    display: ${({ open }) => (open ? 'none' : 'block')};
  }
  &::before {
    content: '';
    top: 0;
    transform: ${({ open }) =>
      open ? `translateY(${rem(3)}) rotate(45deg)` : 'none'};
  }
  &::after {
    content: '';
    bottom: 0;
    transform: ${({ open }) =>
      open ? `translateY(${rem(-3)}) rotate(-45deg)` : 'none'};
  }
`

const NavLi = styled('li')({
  [BREAKPOINTS.M_MIN]: {
    gridColumn: '3 / 6',
  },
})

const SiteHeader = props => {
  return (
    <Header fixed={props.headerFixed} foldUp={props.foldUp}>
      <NavToggleButton type="button" onClick={props.handleNavToggleClick}>
        <BurgerIcons open={props.navOpen}>
          <span />
        </BurgerIcons>
        {props.navOpen ? 'Close' : 'Menu'}
      </NavToggleButton>
      <Grid>
        <DescriptionLi collapsed={props.headerFixed}>
          <Description collapsed={props.headerFixed}>
            <Link to="/">
              <Heading
                element={'h1'}
                marginBottomL={0.5}
                uppercase={'none'}
                size={1.5}
                html={props.titleHTML}
              />
            </Link>
          </Description>
        </DescriptionLi>
        <NavLi>
          <Navigation
            open={props.navOpen}
            handleMenuClick={props.handleMenuClick}
            navigationLinks={props.navigationLinks}
            headerFixed={props.headerFixed}
          />
        </NavLi>
      </Grid>
    </Header>
  )
}

SiteHeader.propTypes = {
  titleHTML: PropTypes.string,
  headerFixed: PropTypes.bool,
  foldUp: PropTypes.bool,
  navOpen: PropTypes.bool,
  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  handleNavToggleClick: PropTypes.func,
  handleMenuClick: PropTypes.func,
}

export default SiteHeader
