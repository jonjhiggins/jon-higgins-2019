import { em } from '~/src/utils'

const BREAKPOINTS_RAW = {
  S: 0,
  M: 800,
  L: 1150,
}

const BREAKPOINT_STRINGS = {
  S_MAX: `(max-width: ${em(BREAKPOINTS_RAW.M - 1)})`,
  M_MIN: `(min-width: ${em(BREAKPOINTS_RAW.M)})`,
  M_MAX: `(max-width: ${em(BREAKPOINTS_RAW.L - 1)})`,
  L_MIN: `(min-width: ${em(BREAKPOINTS_RAW.L)})`,
}

const BREAKPOINTS = {
  S_MAX: `@media ${BREAKPOINT_STRINGS.S_MAX}`,
  M_MIN: `@media ${BREAKPOINT_STRINGS.M_MIN}`,
  M_MAX: `@media ${BREAKPOINT_STRINGS.M_MAX}`,
  L_MIN: `@media ${BREAKPOINT_STRINGS.L_MIN}`,
}

export { BREAKPOINTS_RAW, BREAKPOINTS, BREAKPOINT_STRINGS }
