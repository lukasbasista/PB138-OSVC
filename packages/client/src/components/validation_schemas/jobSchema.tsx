import * as Yup from 'yup';

export const jobSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  email: Yup.string().required(),
  timeWorked: Yup.string()
    .matches(/^\d+$/, 'field should be digits only')
    .required('hours worked is a required field'),
  total: Yup.number().required().min(1),
  workStart: Yup.string().required(),
  workEnd: Yup.string().required(),
});

export default jobSchema;
