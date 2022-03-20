import React from 'react';
import { FormField, TextArea, TextAreaProps } from 'grommet';
import { useField } from 'formik';

interface TextAreaWrapper {
  name: string;
  labelProp: string;
  placeholderProp?: string;
  disabled?: boolean;
}

const TextAreaWrapper: React.FC<TextAreaWrapper & TextAreaProps> = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const config = {
    ...field,
    ...otherProps,
  };
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <FormField
      label={otherProps.labelProp}
      {...field}
      helperText={errorText}
      error={errorText}
      name={name}
    >
      <TextArea {...field} {...config} />
    </FormField>
  );
};

export default TextAreaWrapper;
