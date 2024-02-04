import { Button, Icon, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import React from 'react'

const ThemeModeComponent: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button color={'successButton'} onClick={toggleColorMode}>
      <Icon
        mr={2}
        as={colorMode === 'light' ? MoonIcon : SunIcon}
        data-testid={colorMode === 'light' ? 'moon-icon' : 'sun-icon'}
      />
      {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}

export default ThemeModeComponent
