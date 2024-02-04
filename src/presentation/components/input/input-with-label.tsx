import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react'
import React, { useRef } from 'react'

import { InputError } from '@/presentation/components'

type InputWithLabelProps = {
  children: React.ReactNode
  type: React.HTMLInputTypeAttribute
  htmlFor?: string
  state: any
  setState: any
  name: string
  h?: string
  w?: string
} & InputProps

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  children,
  type,
  htmlFor,
  state,
  name,
  setState,
  w,
  h,
  autoComplete = false,
  color,
  textColor,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${name}Error`]
  return (
    <FormControl>
      <FormLabel
        data-testid={`${name}-label`}
        onClick={() => {
          inputRef.current.focus()
        }}
        htmlFor={htmlFor}
        color={color || 'reverseText'}
        fontSize={'14px'}
        ml={'20px'}
      >
        {children}
      </FormLabel>
      <Input
        {...props}
        w={{ base: w ?? '315px', md: w ?? '359px' }}
        h={h ?? '40px'}
        autoComplete={autoComplete ? 'on' : `new-${name}`}
        flexShrink={0}
        textColor={textColor || 'reverseText'}
        borderRadius={0}
        border={'2px solid #E5EAF1'}
        _hover={{}}
        ref={inputRef}
        type={type}
        name={name}
        value={state[name]}
        onChange={(e) =>
          setState({ ...state, [e.target.name]: e.target.value })
        }
        data-testid={`${name}`}
      />
      <InputError dataTestid={`${name}-error`}>{error}</InputError>
    </FormControl>
  )
}

export default InputWithLabel
