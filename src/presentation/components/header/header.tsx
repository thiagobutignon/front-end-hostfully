import { Box, Flex, Menu, Stack, Text } from '@chakra-ui/react'

import { ThemeModeComponent } from '@/presentation/components'

const HeaderComponent: React.FC = () => {
  return (
    <>
      <Box
        data-testid="mock-theme-mode-component"
        bg="reverseBackground"
        px={4}
        mb={8}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Text color="reverseText" fontSize="xl" fontWeight={700}>
            Hostfully
          </Text>

          <Flex alignItems={'center'}>
            <Stack direction={'row'}>
              <Menu>
                <ThemeModeComponent />
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default HeaderComponent
