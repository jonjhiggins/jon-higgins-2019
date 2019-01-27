import { BODY_FONT_SIZE } from '~/src/settings/typography'

/**
 * Convert a pixel number to a rem string
 * @param  {number} n
 * @return {string}
 */
const rem = n => `${n / BODY_FONT_SIZE}rem`

/**
 * Convert a pixel number to an em string
 * @param  {number} n
 * @return {string}
 */
const em = n => `${n / BODY_FONT_SIZE}em`

export { rem, em }
