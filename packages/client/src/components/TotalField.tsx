import React from 'react';
import { useField, useFormikContext } from 'formik';
import { JobFormValues } from './JobFormWrapper';
import { FormField, TextInput } from 'grommet';

interface TotalFieldProps {
  labelProp: string;
  placeholderProp: string;
  name: string;
  isHourly: boolean;
}

const TotalField: React.FC<TotalFieldProps> = ({ name, isHourly, ...otherProps }) => {
  const {
    values: { timeWorked, hourRate },
    touched,
    setFieldValue,
  } = useFormikContext<JobFormValues>();
  const [field, meta] = useField(name);
  React.useEffect(() => {
    if (isHourly && touched.timeWorked && touched.hourRate) {
      timeWorked
        ? setFieldValue(name, parseInt(hourRate, 10) * parseInt(timeWorked, 10))
        : setFieldValue(name, '');
    }
  }, [timeWorked, touched.timeWorked, touched.hourRate, setFieldValue, name, isHourly]);

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <FormField {...field} {...otherProps} name={name} label={otherProps.labelProp}>
      <TextInput
        {...otherProps}
        {...field}
        name={name}
        placeholder={otherProps.placeholderProp}
        disabled={isHourly}
      />
    </FormField>
  );
};

export default TotalField;
