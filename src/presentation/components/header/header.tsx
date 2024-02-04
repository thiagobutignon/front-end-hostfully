import { Box, Flex, Menu, Stack, Text } from '@chakra-ui/react'

import { ListPropertiesUsecase } from '@/domain/usecases'
import PropertySelect from '@/presentation/components/select/property-select'
import { ThemeModeComponent } from '@/presentation/components'
import { usePropertiesContext } from '@/presentation/context/properties-context'

type HeaderComponentProps = {
  listProperties: ListPropertiesUsecase
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  listProperties
}: HeaderComponentProps) => {
  const { properties, selectedProperty, handlePropertyChange } =
    usePropertiesContext()

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
          <Flex maxWidth={'25%'}>
            <PropertySelect
              properties={properties}
              selectedPropertyId={selectedProperty?.id}
              onPropertyChange={handlePropertyChange}
            />
          </Flex>

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
