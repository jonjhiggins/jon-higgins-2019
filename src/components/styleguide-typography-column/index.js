import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import Heading from '~/src/components/heading'
import { rem } from '~/src/utils'
import COLOURS from '~/src/settings/colours'
import {
  BASELINE,
  BASELINE_REM,
  INTER_UI_STYLES,
} from '~/src/settings/typography'

const Column = styled('li')`
  box-sizing: border-box;
  border-top: ${rem(2)} solid rgba(0, 0, 0, 0.1);
  padding-top: ${rem(BASELINE - 2)};
  grid-column: ${props => (props.type === 'typography' ? 'span 2' : null)};
  list-style: none;
`

const TYPEBLOCK_MARGINS = {
  INTER_UI: [
    3.5 * BASELINE_REM,
    3 * BASELINE_REM,
    1.5 * BASELINE_REM,
    0,
    BASELINE_REM * 1,
    BASELINE_REM * 2,
  ],
  CIRCLES: [
    5 * BASELINE_REM,
    4.5 * BASELINE_REM,
    3 * BASELINE_REM,
    BASELINE_REM * 2,
    BASELINE_REM * 3,
    BASELINE_REM * 4,
  ],
}

const TypeBlock = styled('div')({ position: 'relative' }, ({ index, type }) => {
  const marginBottom = TYPEBLOCK_MARGINS[type][index]
  return marginBottom ? { marginBottom: `${marginBottom}rem` } : { top: 0 }
})

const TypeBlockP = styled('p')(
  {
    margin: 0,
    whiteSpace: 'nowrap',
  },
  ({ newStyles, index, last }) => {
    delete newStyles.marginBottom
    newStyles.color = last ? 'rgba(0,0,0,0.1)' : undefined
    return newStyles
  }
)

const TypeBlockPX = styled('span')`
  color: ${COLOURS.PRIMARY};
`

const SpacingLine = styled('ul')(
  {
    display: 'flex',
    listStyle: 'none',
    alignItems: 'flex-end',
    padding: 0,
    '& li': {
      flex: '0 1 50%',
    },
    '& p': {
      padding: 0,
      position: 'relative',
    },
  },
  ({ value, index }) => {
    const padding = INTER_UI_STYLES[1].padding
    return {
      margin: `0 0 ${TYPEBLOCK_MARGINS.CIRCLES[index]}rem`,
      '& p': {
        top: padding ? padding.replace(' 0', '') : null,
      },
    }
  }
)

const Circle = styled('div')(
  {
    borderRadius: '50%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({ value, index, last }) => ({
    height: `${rem(value)}`,
    width: `${rem(value)}`,
    border: `${rem(2)} solid ${COLOURS.GREY_3}`,
  })
)

const StyleguideTypographyColumn = ({
  heading,
  paragraph,
  text,
  type,
  block,
  circles,
}) => (
  <Column type={block ? 'typography' : 'circle'}>
    <Heading element={'h2'}>{heading}</Heading>
    <Heading
      element={'p'}
      marginTop={-0.5}
      marginBottom={1.5}
      html={paragraph}
    />

    {block &&
      Object.keys(block)
        .sort()
        .map((key, childIndex) => (
          <TypeBlock key={childIndex} index={childIndex} type={type}>
            <TypeBlockP
              newStyles={block[key]}
              index={childIndex}
              last={childIndex === block.length - 1}
            >
              <b>{text[key].fontSizeRaw}</b> / {text[key].lineHeightRaw}{' '}
              <TypeBlockPX>{type === 'INTER_UI' ? 'X' : 'x'}</TypeBlockPX>
            </TypeBlockP>
          </TypeBlock>
        ))}

    {circles &&
      Object.keys(circles)
        .sort((a, b) => circles[a] - circles[b])
        .map((key, childIndex) => (
          <SpacingLine key={childIndex} value={circles[key]} index={childIndex}>
            <li>
              <Circle
                value={circles[key]}
                index={childIndex}
                last={childIndex === circles.length - 1}
              >
                {childIndex === circles.length - 1 && (
                  <Heading element={'p'}>{circles[key]}</Heading>
                )}
              </Circle>
            </li>
            {childIndex !== circles.length - 1 && (
              <li>
                <Heading element={'p'}>{circles[key]}</Heading>
              </li>
            )}
          </SpacingLine>
        ))}
  </Column>
)

StyleguideTypographyColumn.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  text: PropTypes.shape(),
  type: PropTypes.oneOf(['INTER_UI']),
  block: PropTypes.shape(),
  circles: PropTypes.array,
}

export default StyleguideTypographyColumn
