import Typography from 'typography'

import FairyGates from 'typography-theme-fairy-gates'

FairyGates.overrideThemeStyles = () => ({
  'a': {
    color: '#333',
  },
  'a:hover': {
    color: '#f0f',
  },
  'h3': {
    color: 'inherit',
  }
})

const typography = new Typography(FairyGates)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
