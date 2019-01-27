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
  VOLLKORN: [2.5 * BASELINE_REM, 1 * BASELINE_REM, 0.5 * BASELINE_REM],
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
  const shift = type === 'VOLLKORN' && index === 3 ? `-${BASELINE_REM}rem` : 0
  return marginBottom ? { marginBottom: `${marginBottom}rem` } : { top: shift }
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
    const padding = INTER_UI_STYLES[0].padding
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
    backgroundColor: last ? undefined : `rgba(0, 0, 0, ${0.25})`,
    border: last ? `${rem(2)} solid ${COLOURS.PRIMARY}` : null,
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
  <Column>
    <Heading element={'h2'}>{heading}</Heading>
    <Heading
      element={'p'}
      marginTop={-0.5}
      marginBottom={1.5}
      html={paragraph}
    />

    {block &&
      block.map((styles, childIndex) => (
        <TypeBlock key={childIndex} index={childIndex} type={type}>
          <TypeBlockP
            newStyles={styles}
            index={childIndex}
            last={childIndex === block.length - 1}
          >
            <b>{text[childIndex].fontSizeRaw}</b> /{' '}
            {text[childIndex].lineHeightRaw}{' '}
            <TypeBlockPX>{type === 'INTER_UI' ? 'X' : 'x'}</TypeBlockPX>
          </TypeBlockP>
        </TypeBlock>
      ))}

    {circles &&
      circles.map((value, childIndex) => (
        <SpacingLine key={childIndex} value={value} index={childIndex}>
          <li>
            <Circle
              value={value}
              index={childIndex}
              last={childIndex === circles.length - 1}
            >
              {childIndex === circles.length - 1 && (
                <Heading element={'p'}>{value}</Heading>
              )}
            </Circle>
          </li>
          {childIndex !== circles.length - 1 && (
            <li>
              <Heading element={'p'}>{value}</Heading>
            </li>
          )}
        </SpacingLine>
      ))}
  </Column>
)

StyleguideTypographyColumn.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  text: PropTypes.array,
  type: PropTypes.oneOf(['INTER_UI', 'VOLLKORN']),
  block: PropTypes.array,
  circles: PropTypes.array,
}

export default StyleguideTypographyColumn
