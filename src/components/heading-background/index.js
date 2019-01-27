import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Heading from '~/src/components/heading'
import { rem } from '~/src/utils'
import { BREAKPOINTS } from '~/src/settings/breakpoints'
import { BASELINE } from '~/src/settings/typography'

const Wrapper = styled('div')({
  position: 'relative',
  marginBottom: rem(BASELINE * 3),
  boxSizing: 'border-box',

  [BREAKPOINTS.M_MIN]: {
    marginTop: rem(BASELINE * 4),
    marginBottom: rem(BASELINE * 6),
  },

  '& > h1': {
    [BREAKPOINTS.M_MIN]: {
      lineHeight: rem(BASELINE * 6),
      padding: 0,
    },
  },
})

const HeadingBackground = ({ children }) => (
  <Wrapper>
    <Heading element={'h1'} marginBottom={0} sizeS={3} sizeM={5}>
      {children}
    </Heading>
  </Wrapper>
)

HeadingBackground.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default HeadingBackground
