import { BODY_FONT_SIZE } from '~/src/settings/typography'

/**
 * Common function for consistent spacing in CSS
 * @param  {number} n
 * @return {number}
 */
const getSpacing = n => (n + 2) * (n + 2) - (n + 2) % 2

const SPACING_RAW = {
  1: getSpacing(1), // 8
  2: getSpacing(2), // 16
  3: getSpacing(3), // 24
  4: getSpacing(5), // 48
  5: getSpacing(6), // 64
  6: getSpacing(7), // 80
  7: getSpacing(10), // 144
}

export { SPACING_RAW }
