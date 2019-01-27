import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Heading from '~/src/components/heading'
import Navigation from '~/src/components/navigation'
import Grid from '~/src/components/grid'
import { GRID_GUTTER_REM } from '~/src/settings/grid'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import {
  interUIStyles,
  BASELINE,
  BASELINE_REM,
} from '~/src/settings/typography'
import { rem } from '~/src/utils'
import COLOURS from '~/src/settings/colours'
import Z_INDEX from '~/src/settings/z-index'

const Header = styled('header')`
  padding: ${rem(BASELINE * 1)} ${GRID_GUTTER_REM.S} ${rem(BASELINE / 2)};
  margin-bottom: ${rem(BASELINE * 2)};
  border-bottom: ${rem(1)} solid ${COLOURS.GREY};

  ${BREAKPOINTS.M_MIN} {
    padding: ${rem(BASELINE * 3)} ${GRID_GUTTER_REM.M} ${rem(BASELINE)};
    margin-bottom: ${rem(BASELINE * 2)};
    min-height: ${rem(BASELINE * 4)};
  }
`

const DescriptionLi = styled('li')`
  ${BREAKPOINTS.S_MAX} {
    margin-right: 5rem;
  }
  ${BREAKPOINTS.M_MIN} {
    grid-column: 1 / 3;
  }
`

const Description = styled('div')`
  & a {
    text-decoration: none;
    color: inherit;

    & span {
      display: block;
      text-transform: none;
      opacity: 0.5;
    }
  }
`

const NavToggleButton = styled('button')({
  ...interUIStyles[0],
  border: 'none',
  position: 'absolute',
  top: `${BASELINE_REM}rem`,
  right: GRID_GUTTER_REM.S,
  backgroundColor: 'transparent',
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
    background-color: ${COLOURS.BLACK};
    opacity: 0.3;
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

class SiteHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      navOpen: false,
    }
    this.events = {
      handleMenuClick: this.handleMenuClick.bind(this),
    }
  }
  handleNavToggleClick() {
    this.setState({ navOpen: !this.state.navOpen })
  }
  handleMenuClick() {
    this.setState({ navOpen: false })
  }
  render() {
    return (
      <Header>
        <NavToggleButton
          type="button"
          onClick={this.handleNavToggleClick.bind(this)}
        >
          <BurgerIcons open={this.state.navOpen}>
            <span />
          </BurgerIcons>
          {this.state.navOpen ? 'Close' : 'Menu'}
        </NavToggleButton>
        <Grid>
          <DescriptionLi>
            <Description>
              <Link to="/">
                <Heading
                  element={'h1'}
                  marginBottomL={0.5}
                  size={1}
                  html={this.props.titleHTML}
                />
              </Link>
            </Description>
          </DescriptionLi>
          <NavLi>
            <Navigation
              open={this.state.navOpen}
              handleMenuClick={this.events.handleMenuClick}
            />
          </NavLi>
        </Grid>
      </Header>
    )
  }
}

SiteHeader.propTypes = {
  titleHTML: PropTypes.string,
}

export default SiteHeader
