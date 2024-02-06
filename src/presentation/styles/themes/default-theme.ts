import { ThemeStyles } from '@/presentation/styles/models'

export const defaultTheme: ThemeStyles = {
  styles: {
    global: {
      body: {
        bgColor: 'background',
        color: 'text'
      }
    }
  },
  semanticTokens: {
    colors: {
      reverseBackground: {
        default: '#5D5C61', // Dark slate gray for light theme
        _dark: '#F0EBE6' // Soft off-white for dark theme
      },
      reverseText: {
        default: '#F0EBE6', // Soft off-white for light theme
        _dark: '#5D5C61' // Dark slate gray for dark theme
      },
      background: {
        default: '#F0EBE6', // Soft off-white for light theme
        _dark: '#2B2D42' // Deep indigo for dark theme
      },
      text: {
        default: '#2B2D42', // Deep indigo for light theme
        _dark: '#F0EBE6' // Soft off-white for dark theme
      },
      detail: {
        default: '#8D99AE', // Muted blue for light theme
        _dark: '#EDD4B2' // Pale gold for dark theme
      },
      iconColor: {
        default: '#F0EBE6', // Soft off-white for light theme
        _dark: '#2B2D42' // Deep indigo for dark theme
      },
      cardColor: {
        default: '#2B2D42', // Soft off-white for light theme
        _dark: '#F0EBE6' // Deep indigo for dark theme
      },
      reverseIconColor: {
        default: '#2B2D42', // Deep indigo for light theme
        _dark: '#F0EBE6' // Soft off-white for dark theme
      },
      buttonHud: {
        default: 'rgba(216, 178, 155, 0.7)', // Warm beige for light theme
        _dark: 'rgba(108, 92, 231, 0.7)' // Soft purple for dark theme
      },
      successButton: {
        default: '#4CAF50', // Vibrant green for both themes
        _dark: '#4CAF50'
      },
      borderColor: {
        default: '#CBD5E0', // Light gray for light theme
        _dark: '#434C5E' // Darker gray for dark theme
      },
      error: {
        default: '#EF233C', // Bright red for both themes
        _dark: '#EF233C'
      },
      delete: {
        default: '#D90429', // Vivid red for both themes
        _dark: '#D90429'
      }
    }
  }
}
