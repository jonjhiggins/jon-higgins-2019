const BODY_FONT_SIZE = 16
const BASELINE = 16
const BASELINE_REM = BASELINE / BODY_FONT_SIZE

// These sizes match the caps height of the font
// to the pixel height of spacing values (settings/spacing.js)
// so need to be set manually.
const INTER_UI_STYLES = {
  1: {
    fontSizeRaw: 12, // should be 11 but bringing up to be more legible
    lineHeightRaw: BASELINE * 1,
    letterSpacing: `${50 / 1000}em`, // 50% tracking = 0.05em
    textTransform: 'uppercase',
    padding: `${BASELINE_REM / 4}rem 0`,
    marginBottom: `${BASELINE_REM / 2}rem`,
    fontWeight: 'bold',
  },
  '1.5': {
    fontSizeRaw: 14, // should be 11 but bringing up to be more legible
    lineHeightRaw: BASELINE * 1.5,
    letterSpacing: 0,
  },
  2: {
    fontSizeRaw: 22,
    lineHeightRaw: BASELINE * 2,
    padding: `${BASELINE_REM / 2}rem 0`,
    marginTop: `0`,
    marginBottom: `${BASELINE_REM / 2}rem`,
  },
  3: {
    fontSizeRaw: 33,
    lineHeightRaw: BASELINE * 2.5,
    padding: 0,
    marginTop: `${BASELINE_REM * 2}rem`,
    marginBottom: `${BASELINE_REM * 2}rem`,
  },
  4: {
    fontSizeRaw: 66,
    lineHeightRaw: BASELINE * 4.5,
    padding: `${BASELINE_REM / 4}rem 0`,
    marginBottom: `${BASELINE_REM * 4}rem`,
  },
  5: {
    fontSizeRaw: 88,
    lineHeightRaw: BASELINE * 6,
    padding: 0,
    marginBottom: `${BASELINE_REM * 4}rem`,
  },
  6: {
    fontSizeRaw: 108,
    lineHeightRaw: BASELINE * 7,
    padding: 0,
    marginBottom: `${BASELINE_REM * 4}rem`,
  },
  7: {
    fontSizeRaw: 198,
    lineHeightRaw: BASELINE * 11,
    padding: 0,
    marginBottom: `${BASELINE_REM * 4}rem`,
  },
}

const defaultStyle = {
  interUI: {
    fontFamily: '"Inter UI", Helvetica, Arial, sans-serif',
    textTransform: 'none',
    letterSpacing: `-${10 / 1000}em`, // -10% tracking = 0.01em
    marginTop: 0,
  },
}

/**
 * Merge default styles with styles for each type size
 * @param  {object} newStyles object of CSS styles
 * @return {object}
 */
const mergeStyles = newStyles => {
  const copyStyle = Object.assign({}, newStyles)
  copyStyle.fontSize = `${newStyles.fontSizeRaw / BODY_FONT_SIZE}rem`
  const lineHeight = copyStyle.lineHeightRaw / copyStyle.fontSizeRaw
  delete copyStyle.fontSizeRaw
  delete copyStyle.lineHeightRaw
  copyStyle.lineHeight = `${Math.round(lineHeight * 1000000000) / 1000000000}`
  return Object.assign({}, defaultStyle.interUI, copyStyle)
}

const interUIStyles = {}
Object.keys(INTER_UI_STYLES)
  .sort()
  .forEach(key => {
    interUIStyles[key] = mergeStyles(INTER_UI_STYLES[key])
  })

export {
  interUIStyles,
  BASELINE,
  BASELINE_REM,
  BODY_FONT_SIZE,
  INTER_UI_STYLES,
}
