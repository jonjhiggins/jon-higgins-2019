import React from 'react'
import styled from '@emotion/styled'

import BaselineGrid from '~/src/components/baseline-grid'
import StyleguideTypographyColumn from '~/src/components/styleguide-typography-column'
import { SPACING_RAW } from '~/src/settings/spacing'
import { GRID_GUTTER_REM } from '~/src/settings/grid'
import { rem } from '~/src/utils'
import {
  interUIStyles,
  BASELINE,
  INTER_UI_STYLES,
} from '~/src/settings/typography'

const circles = Object.keys(SPACING_RAW).map(key => SPACING_RAW[key])

const Wrapper = styled('div')`
  position: relative;
  margin-bottom: ${rem(BASELINE * 4)};
`

const col1 = 190
const col2 = 450

const Columns = styled('ul')`
  list-style: none;
  padding: 0;
  margin: ${rem(BASELINE * 6)} 0 0;
  display: grid;
  grid-gap: ${GRID_GUTTER_REM.M};
  position: relative;

  @media (min-width: ${rem(450 + BASELINE * 2)}) {
    grid-template-columns: repeat(auto-fill, minmax(${rem(col2)}, 1fr));
  }

  @media (min-width: ${rem(1290)}) {
    grid-template-columns: repeat(auto-fill, minmax(${rem(col2)}, 1fr)) ${rem(
        col1
      )};
  }
`

const StyleguideTypography = () => (
  <Wrapper>
    <BaselineGrid
      lines={6}
      top={rem(BASELINE * 7)}
      colour={'rgba(0,0,0,0.25)'}
    />
    <Columns>
      <StyleguideTypographyColumn
        block={interUIStyles}
        text={INTER_UI_STYLES}
        type={'INTER_UI'}
        heading={`TYPOGRAPHY: INTER UI (REGULAR + BOLD)`}
        paragraph={`USE CAPS X-HEIGHT FOR ALIGNMENT <br />
        -10% SPACING UNLESS OTHERWISE SPECIFIED`}
      />
      <StyleguideTypographyColumn
        heading={`SPACING`}
        paragraph={`<span style="text-transform: none">(n+2) * (n+2) - ((n+2) % 2)</span><br/>SKIPPING VALUES FOR 4, 8, 9`}
        circles={circles}
      />
    </Columns>
  </Wrapper>
)

export default StyleguideTypography
