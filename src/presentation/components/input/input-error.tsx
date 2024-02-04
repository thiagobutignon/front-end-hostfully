import { FormHelperText, FormHelperTextProps } from '@chakra-ui/react'

import React from 'react'

type InputErrorProps = {
  dataTestid?: string
} & FormHelperTextProps

const InputError: React.FC<InputErrorProps> = ({ dataTestid, children }) => {
  return (
    <FormHelperText color={'error'} data-testid={dataTestid}>
      {children}
    </FormHelperText>
  )
}

export default InputError
