import React, { useState } from 'react';

import { FormField, Select, SelectProps } from 'grommet';
import { useField, useFormikContext } from 'formik';

interface SelectWrapperProps {
  labelProp?: string;
  name: string;
  placeholderProp?: string;
  objectOptions?: boolean;
  disabled?: boolean;
}

const SelectWrapper: React.FC<SelectWrapperProps & SelectProps> = ({ name, ...otherProps }) => {
  const [value, setValue] = useState('');

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({
    name,
  });

  const config = {
    ...field,
    ...otherProps,
    name: name,
    label: otherProps.labelProp,
    placeholder: otherProps.placeholderProp,
    options: otherProps.options,
  };

  if (otherProps.objectOptions) {
    return (
      <FormField
        {...field}
        disabled={otherProps.disabled}
        label={config.labelProp}
        name={name}
        width="100%"
      >
        <Select
          {...config}
          {...field}
          id={name}
          name={name}
          value={value}
          labelKey="label"
          valueKey={{ key: 'value', reduce: true }}
          onChange={({ option }) => {
            setValue(option.value);
            setFieldValue(name, option.value);
          }}
        />
      </FormField>
    );
  } else {
    return (
      <FormField {...field} label={config.labelProp} name={name}>
        <Select
          {...config}
          {...field}
          name={name}
          defaultValue={'value'}
          value={value}
          options={otherProps.options}
          onChange={({ option }) => {
            setValue(option);
            setFieldValue(name, option);
          }}
        />
      </FormField>
    );
  }
};

export default SelectWrapper;
