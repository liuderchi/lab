import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

import viewports from './viewports'
import { globalCSS, inTheKnowTheme, marketplaceTheme } from '../src/utils/theme'

const THEME_ITK = 'Theme: In The Know'
const THEME_MARKETPLACE = 'Theme: Marketplace'

const themeOptions = [
  {
    value: THEME_MARKETPLACE,
    title: THEME_MARKETPLACE,
    theme: marketplaceTheme,
  },
  {
    value: THEME_ITK,
    title: THEME_ITK,
    theme: inTheKnowTheme,
  },
]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: THEME_MARKETPLACE,
    toolbar: {
      icon: 'photo',
      items: themeOptions,
    },
  },
}

const GlobalStyles = createGlobalStyle`
  ${normalize()}
  ${globalCSS}
  body {
    font-family: Arial, sans-serif;
  }
`

const withThemeProvider = (Story, context) => {
  const themeOption = themeOptions.find(
    option => option.value === context.globals?.theme,
  )
  const theme = themeOption?.theme || inTheKnowTheme

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyles />
        <Story />
      </React.Fragment>
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports },
}
