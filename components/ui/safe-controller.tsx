import * as React from "react"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"

// Safe wrapper for Controller that prevents undefined name props
export const SafeController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) => {
  // Early return if name is undefined or invalid
  if (!props.name || typeof props.name !== 'string') {
    console.error('SafeController: name prop is required and must be a valid string', props)
    return null
  }

  return <Controller {...props} />
}

export default SafeController