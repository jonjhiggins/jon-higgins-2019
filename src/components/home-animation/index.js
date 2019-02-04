import styled from '@emotion/styled'
import React from 'react'
import anime from 'animejs'

import { GRID_GUTTER_REM } from '~/src/settings/grid'
import { BASELINE_REM } from '~/src/settings/typography'
import { rem } from '~/src/utils'
import COLOURS from '~/src/settings/colours'
import { BREAKPOINTS, BREAKPOINT_STRINGS } from '~/src/settings/breakpoints'
import ANIMATION from '~/src/settings/animation'
import Heading from '~/src/components/heading'

const PERSPECTIVE = BASELINE_REM * 60
const CUBE_HEIGHT = BASELINE_REM * 5
const CUBE_DEPTH = CUBE_HEIGHT
const CUBE_Z = CUBE_HEIGHT / 2

/**
 * Calculate what transform is needed for each cube face
 * @param {object} props
 */
const getCubeFaceTransform = props => {
  if (props.side) {
    return `rotateY(${
      props.left ? '-90deg' : '90deg'
    }) translateZ(${CUBE_Z}rem)`
  }

  return `rotateX(${props.index * 90}deg) translateZ(${CUBE_Z}rem)`
}

/**
 * Rotate cube based on which side should be visible
 * @param {number} visibleSide
 */
const getCubeRotation = visibleSide => `rotateX(-${visibleSide * 90}deg)`

const HomeAnimationWrapper = styled('div')`
  display: flex;
  min-height: 40vh;
  align-items: center;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

const BlockList = styled('ul')`
  flex-basis: 100%;
  display: grid;
  grid-gap: ${GRID_GUTTER_REM.S};

  ${BREAKPOINTS.L_MIN} {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: ${GRID_GUTTER_REM.M};
  }
`

const BlockListItem = styled('li')`
  perspective: ${PERSPECTIVE}rem;

  ${BREAKPOINTS.L_MIN} {
    grid-column: ${props => (props.index !== 0 ? 'span 2' : null)};
  }
`

const Cube = styled('ul')`
  position: relative;
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: ${CUBE_HEIGHT}rem;
  transition: 400ms transform ${ANIMATION.EASING};
  transform: ${props =>
      props.mode3d ? 'translateZ(0)' : `translateZ(${-CUBE_Z}rem)`}
    ${props => getCubeRotation(props.visibleSide)};
  & h3 {
    transition: 400ms opacity ${ANIMATION.EASING_IN};
    opacity: ${props => (props.textVisible ? '1' : '0')};
  }
`

const CubeFace = styled('li')`
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
  box-sizing: border-box;
  position: absolute;
  top: 0;
  /* align the right "side" face to right, everything else to left  */
  left: ${props => (props.side && props.right ? null : '0')};
  right: ${props => (props.side && props.right ? '0' : null)};
  width: ${props => (props.side ? `${CUBE_DEPTH}rem` : '100%')};
  z-index: ${props => (props.side ? `0` : '1')};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transform: ${props => getCubeFaceTransform(props)};
  backface-visibility: hidden;
`

const DURATIONS = {
  wait: 300,
  forward: 400,
  spin: 800,
  backwards: 400,
}

const WORDS = {
  intro: ['A', 'developer', 'who'],
  sections: ['writes', 'builds', 'learns'],
  codeDescription: ['clean', 'concise'],
  codeItems: ['code'],
  buildDescription: ['performant', 'accsesible', 'inclusive', 'engaging'],
  buildItems: ['products', 'websites', 'experiences', 'webapps'],
  learnDescription: ['new', 'emerging', 'useful'],
  learnItems: ['things', 'technologies', 'skills', 'processes'],
}

export default class HomeAnimation extends React.Component {
  constructor() {
    super()
    const newBlockItems = this.generateBlockItems()

    this.state = {
      blocks: [
        {
          activeSide: 0,
          blockItems: newBlockItems[0],
          mode3d: false,
          textVisible: false,
        },
        {
          activeSide: 0,
          blockItems: newBlockItems[1],
          mode3d: false,
          textVisible: false,
        },
        {
          activeSide: 0,
          blockItems: newBlockItems[2],
          mode3d: false,
          textVisible: false,
        },
      ],
    }

    if (typeof window === 'undefined') {
      return
    }

    this.timeline = anime.timeline({
      complete: () => {
        this.generateAndSetBlockItems()
        this.timeline.restart()
      },
    })
  }

  /**
   * Return a random item from an arrau
   * @param {Array} sourceArray
   * @returns {*}
   */
  getRandomFromArray(sourceArray) {
    return sourceArray[Math.floor(Math.random() * sourceArray.length)]
  }

  /**
   * Get the text for all blocks
   * Text is chosen randomly from pre-set lists
   */
  generateBlockItems() {
    const {
      intro,
      sections,
      codeItems,
      codeDescription,
      buildDescription,
      learnDescription,
      buildItems,
      learnItems,
    } = WORDS
    const codeDescriptionItem = this.getRandomFromArray(codeDescription)
    const codeItemsItem = this.getRandomFromArray(codeItems)
    const buildDescriptionItem = this.getRandomFromArray(buildDescription)
    const buildItemsItem = this.getRandomFromArray(buildItems)
    const learnDescriptionItem = this.getRandomFromArray(learnDescription)
    const learnItemsItem = this.getRandomFromArray(learnItems)

    return [
      [intro[0], sections[0], sections[1], sections[2]],
      [
        intro[1],
        codeDescriptionItem,
        buildDescriptionItem,
        learnDescriptionItem,
      ],
      [intro[2], codeItemsItem, buildItemsItem, learnItemsItem],
    ]
  }

  generateAndSetBlockItems() {
    const newBlockItems = this.generateBlockItems()
    this.state.blocks.forEach((block, blockIndex) => {
      this.setBlockState(blockIndex, { blockItems: newBlockItems[blockIndex] })
    })
  }

  /**
   * Update the state of item in blocks array
   * @param {number} index
   * @param {object} updatedAttributes
   */
  setBlockState(index, updatedAttributes) {
    this.setState({
      blocks: [
        ...this.state.blocks.slice(0, index),
        Object.assign({}, this.state.blocks[index], updatedAttributes),
        ...this.state.blocks.slice(index + 1),
      ],
    })
  }
  /**
   * Generate an array of timeline items to be passed to
   * pushToTimeline
   * @param {number} prevSideIndex
   * @returns {array}
   */
  makeTimelineItems(prevSideIndex, blockIndex) {
    const sidesTotal = 4
    return [
      {
        duration: DURATIONS.wait,
        attributes: {
          mode3d: true,
        },
      },
      {
        duration: DURATIONS.forward,
        attributes: {
          activeSide: prevSideIndex < sidesTotal - 1 ? prevSideIndex + 1 : 0,
        },
      },
      {
        duration: DURATIONS.backwards,
        attributes: {
          mode3d: false,
        },
      },
    ]
  }
  /**
   * Add timelineItems to the anime.js timeline
   * @param {array} timelineItems
   * @param {number} blockIndex
   */
  pushToTimeline(timelineItems, blockIndex) {
    timelineItems.forEach(({ duration: itemDuration, attributes }, index) => {
      this.timeline.add({
        targets: {},
        duration: itemDuration,
        complete: this.setBlockState.bind(this, blockIndex, attributes),
      })
    })
  }
  componentDidMount() {
    // Fade in text animation
    const fadeInText = [
      {
        duration: 300,
        attributes: {
          textVisible: true,
        },
      },
    ]
    this.pushToTimeline(fadeInText, 0)
    this.pushToTimeline(fadeInText, 1)
    this.pushToTimeline(fadeInText, 2)

    // Main cube rotation animation
    this.state.blocks[0].blockItems.forEach((blockItem, blockItemIndex) => {
      if (blockItemIndex === 0) {
        return
      }
      this.state.blocks.forEach((block, blockIndex) => {
        const timelineItems = this.makeTimelineItems(blockItemIndex, blockIndex)
        this.pushToTimeline(timelineItems, blockIndex)
      })
    })
  }
  componentWillUnmount() {
    // Stop animation timelines
    this.timeline.pause()
    this.timeline = null
  }
  render() {
    return (
      <HomeAnimationWrapper>
        <BlockList>
          {this.state.blocks.map(
            ({ blockItems, activeSide, mode3d, textVisible }, index) => (
              <BlockListItem key={index} index={index}>
                <Cube
                  visibleSide={activeSide}
                  mode3d={mode3d}
                  textVisible={textVisible}
                >
                  <CubeFace side={true} left={true} />
                  <CubeFace side={true} right={true} />
                  {blockItems.map((blockItem, blockItemIndex) => (
                    <CubeFace key={blockItemIndex} index={blockItemIndex}>
                      <Heading element={'h3'} size={3}>
                        {typeof blockItem === 'string'
                          ? blockItem
                          : blockItem[0]}
                      </Heading>
                    </CubeFace>
                  ))}
                </Cube>
              </BlockListItem>
            )
          )}
        </BlockList>
      </HomeAnimationWrapper>
    )
  }
}
