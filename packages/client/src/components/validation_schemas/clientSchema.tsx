import * as Yup from 'yup';

export const clientSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email('enter valid email adress').required(),
  mobileNumber: Yup.string()
    .matches(/^\+{1}\d{12}$/, 'enter a valid phone number')
    .required(),
  isCompany: Yup.boolean().required(),
  ic: Yup.string().when('isCompany', {
    is: true,
    then: Yup.string().matches(/^\d+$/, 'enter a valid ICO').max(8).min(8),
  }),
  dic: Yup.string().when('isCompany', {
    is: true,
    then: Yup.string()
      .matches(/^([A-Z]{2})\d{8}$/, 'enter a valid DIC')
      .max(10)
      .min(10),
  }),
  bankAccount: Yup.object().shape({
    accountNumber: Yup.string()
      .matches(
        /^(([0-9]{2,6})?\-?([0-9]{2,10}){1}\/?([0-9]{4})?)/,
        'enter a valid bank account format',
      )
      .required('account number is a required field'),
    currency: Yup.string().required('currency is a required filed'),
  }),
  address: Yup.object().shape({
    address: Yup.string().required('address is a required field'),
    postcode: Yup.string().required('postcode is a required field'),
    city: Yup.string(),
    country: Yup.string().required('country is a required field'),
  }),
});

export default clientSchema;
