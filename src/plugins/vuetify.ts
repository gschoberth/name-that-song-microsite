/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        dark: false,
        colors: {
          'background': '#0c0c0c',
          'on-background': '#ffffff',
          'on-primary': '#ffffff',
          'on-surface': '#ffffff',
          'primary': '#ff5b00',
          'surface': '#0c0c0c',
        },
        variables: {
          'high-emphasis-opacity': 1,
          'medium-emphasis-opacity': 1,
        },
      },
      dark: {
        dark: true,
        colors: {
          'background': '#0c0c0c',
          'on-background': '#ffffff',
          'on-primary': '#ffffff',
          'on-surface': '#ffffff',
          'primary': '#ff5b00',
          'surface': '#0c0c0c',
        },
        variables: {
          'high-emphasis-opacity': 1,
          'medium-emphasis-opacity': 1,
        },
      },
    },
    utilities: false,
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
