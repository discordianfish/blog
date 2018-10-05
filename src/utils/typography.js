import Typography from 'typography'

import FairyGates from 'typography-theme-fairy-gates'

FairyGates.overrideThemeStyles = () => ({
  'a': {
    color: '#333',
  },
})

const typography = new Typography(FairyGates)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
