import { ThemeConfig, extendTheme } from '@chakra-ui/react'

import activeTheme from './themes/active-theme'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  ...activeTheme,

  '@font-face': [
    {
      fontFamily: 'JT Douro Light',
      src: "url('../app/fonts/JTDOURO-SANS-LIGHT.TTF') format('truetype')",
      fontWeight: 'light',
      fontStyle: 'normal'
    }
  ],
  fonts: {
    body: 'JT Douro Light, Roboto, sans-serif',
    heading: 'JT Douro Light, Montserrat, sans-serif'
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px'
  },

  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em' // 1280px
  },
  space: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px'
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
      },
      sizes: {
        md: {
          fontSize: 'lg'
        }
      },
      variants: {
        light: {
          color: 'white',
          bg: 'light.successButton',
          _hover: {
            bg: 'light.accent'
          }
        },
        dark: {
          color: 'white',
          bg: 'dark.successButton',
          _hover: {
            bg: 'dark.accent'
          }
        }
      }
    }
  }
})

export default theme
