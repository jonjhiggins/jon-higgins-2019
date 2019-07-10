import React from 'react'
import { navigate } from 'gatsby'
import hexRgb from 'hex-rgb'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import Heading from '~/src/components/heading'
import BodyText from '~/src/components/body-text'
import { BASELINE } from '~/src/settings/typography'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import COLOURS from '~/src/settings/colours'
import { rem } from '~/src/utils'

const PRIMARY_RGB = hexRgb(COLOURS.PRIMARY, { format: 'array' })
PRIMARY_RGB.pop()

const LinkBlockInner = styled('li')`
  list-style: none;
  margin: 0 0 ${rem(BASELINE * 2)};
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
  position: relative;
  opacity: ${props => (props.visible || props.transitioning ? 1 : 0)};
  transition: opacity 400ms ease-out;
  ${BREAKPOINTS.M_MIN} {
    grid-column: span ${props => props.gridWidth};
  }
  & > a {
    color: ${COLOURS.GREY_1};
    text-decoration: none;
    padding: ${rem(BASELINE)};
    display: block;
    transition: background-color 400ms ease-out;
    &:hover {
      background-color: rgba(${PRIMARY_RGB.join(',')}, 0.05);
    }
  }
`

export default class LinkBlock extends React.Component {
  constructor() {
    super()
    this.handleClickBound = this.handleClick.bind(this)
    this.state = {
      transitioning: false,
    }
  }
  // Using JS for when animating
  handleClick(e) {
    e.preventDefault()
    const url = e.currentTarget.getAttribute('href')
    navigate(url)
  }
  render() {
    return (
      <LinkBlockInner
        visible={this.props.visible}
        gridWidth={this.props.gridWidth}
        transitioning={this.state.transitioning}
      >
        <a href={this.props.link} onClick={this.handleClickBound}>
          <Heading
            element={'time'}
            size={1}
            marginBottomS={0.25}
            marginBottomM={0.5}
            colour={COLOURS.GREY_2}
          >
            {this.props.frontmatter.date}
          </Heading>
          <Heading
            element={'h3'}
            sizeS={2}
            sizeM={3}
            marginBottomS={0.25}
            marginBottomM={0.5}
          >
            {this.props.frontmatter.title}
          </Heading>
          <BodyText>{this.props.frontmatter.description}</BodyText>
        </a>
      </LinkBlockInner>
    )
  }
}

LinkBlock.propTypes = {
  link: PropTypes.string,
  frontmatter: PropTypes.shape(),
  visible: PropTypes.bool,
  gridWidth: PropTypes.number,
}
