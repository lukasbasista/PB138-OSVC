import React from 'react';
import { CheckBox, FormField, Grommet } from 'grommet';
import { FieldProps } from 'formik';

interface CheckBoxWrapperProps {
  type?: string;
  labelProp: string;
}

export const CheckBoxWrapper: React.FC<CheckBoxWrapperProps & FieldProps> = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <FormField name={field.name} margin={{ top: 'medium', bottom: 'small' }}>
    <CheckBox checked={field.value} label={props.labelProp} {...field} {...props} />
  </FormField>
);

export default CheckBoxWrapper;
