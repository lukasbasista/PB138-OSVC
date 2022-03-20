import React from 'react';
import { FormField, TextInput, TextInputProps } from 'grommet';
import { useField } from 'formik';
import { DisabledOutline } from 'grommet-icons';

interface TextFieldWrapperProps {
  name: string;
  labelProp: string;
  placeholderProp?: string;
  disabled?: boolean;
}

const TextFieldWrapper: React.FC<TextFieldWrapperProps & TextInputProps> = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const config = {
    ...field,
    ...otherProps,
  };
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <FormField
      label={otherProps.labelProp}
      disabled={otherProps.disabled}
      width="100%"
      {...field}
      helperText={errorText}
      error={errorText}
      name={name}
    >
      <TextInput {...field} {...config} placeholder={otherProps.placeholderProp} />
    </FormField>
  );
};

export default TextFieldWrapper;
