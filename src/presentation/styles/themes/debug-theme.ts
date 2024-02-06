import { ThemeStyles } from '@/presentation/styles/models'

export const debugTheme: ThemeStyles = {
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
        default: '#FFB6C1', // Light Pink
        _dark: '#ADD8E6' // Light Blue
      },
      reverseText: {
        default: '#90EE90', // Light Green
        _dark: '#FFD700' // Gold
      },
      background: {
        default: '#ADD8E6', // Light Blue
        _dark: '#FFB6C1' // Light Pink
      },
      text: {
        default: '#FFD700', // Gold
        _dark: '#90EE90' // Light Green
      },
      detail: {
        default: '#D3D3D3', // Light Grey
        _dark: '#FFA07A' // Light Salmon
      },
      iconColor: {
        default: '#FFA07A', // Light Salmon
        _dark: '#D3D3D3' // Light Grey
      },
      cardColor: {
        default: '#FFDEAD', // Navajo White
        _dark: '#BA55D3' // Medium Orchid
      },
      reverseIconColor: {
        default: '#BA55D3', // Medium Orchid
        _dark: '#FFDEAD' // Navajo White
      },
      buttonHud: {
        default: 'rgba(255, 192, 203, 0.7)', // Semi-transparent Pink
        _dark: 'rgba(173, 216, 230, 0.7)' // Semi-transparent Blue
      },
      successButton: {
        default: '#98FB98', // Pale Green
        _dark: '#98FB98' // Pale Green
      },
      borderColor: {
        default: '#FFDAB9', // Peach Puff
        _dark: '#87CEFA' // Light Sky Blue
      },
      error: {
        default: '#FF6347', // Tomato
        _dark: '#FF6347' // Tomato
      },
      delete: {
        default: '#FF69B4', // Hot Pink
        _dark: '#FFD700' // Gold
      }
    }
  }
}
