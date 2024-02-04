import { Box, Button, Text } from '@chakra-ui/react'

import React from 'react'

type Props = {
  error: string
  reload: () => void
}

const ErrorComponent: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <Box className="errorWrap" textAlign="center">
      <Text data-testid="error" color="error" fontSize="lg" mb={4}>
        {error}
      </Text>
      <Button data-testid="reload" colorScheme="successButton" onClick={reload}>
        Try Again
      </Button>
    </Box>
  )
}

export default ErrorComponent
