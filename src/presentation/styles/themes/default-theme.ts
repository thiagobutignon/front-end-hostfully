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
        default: '#333333',
        _dark: '#FFEBE6'
      },
      reverseText: {
        default: '#FFEBE6',
        _dark: '#333333'
      },
      background: {
        default: '#FFEBE6',
        _dark: '#333333'
      },
      text: {
        default: '#333333',
        _dark: '#FFEBE6'
      },
      detail: {
        default: '#BFD8D2',
        _dark: '#D4B483'
      },
      iconColor: {
        default: '#FFEBE6',
        _dark: '#333333'
      },
      cardColor: {
        default: '#FFEBE6',
        _dark: '#333333'
      },
      reverseIconColor: {
        default: '#333333',
        _dark: '#FFEBE6'
      },
      buttonHud: {
        default: 'rgba(207, 216, 220, 0.7)',
        _dark: 'rgba(142, 124, 195, 0.7)'
      },
      successButton: {
        default: '#A1E887',
        _dark: '#A1E887'
      },
      borderColor: {
        default: '#E2E8F0',
        _dark: '#E2E8F0'
      },
      error: {
        default: '#F4B6C2',
        _dark: '#F4B6C2'
      },
      delete: {
        default: '#FFADAD',
        _dark: '#FFADAD'
      }
    }
  }
}
