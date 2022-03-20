import React from 'react';
import { useGet } from 'restful-react';
import ClientForm from './ClientForm';

interface ClientFormWrapperProps {
  openProp: boolean;
  setOpenProp: any;
  initValuesPath: string;
  setAPIPathState: any;
}

export interface ClientFormValues {
  name: string;
  email: string;
  mobileNumber: string;
  isCompany: boolean;
  ic: string;
  dic: string;
  address: {
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  bankAccount: {
    accountNumber: string;
    currency: string;
  };
}

const emptyAddress = {
  address: '',
  city: '',
  postcode: '',
  country: '',
};

const emptyBankAccount = {
  accountNumber: '',
  currency: '',
};

const emptyInitialValues = {
  name: '',
  email: '',
  mobileNumber: '',
  isCompany: false,
  ic: '',
  dic: '',
  country: '',
  address: emptyAddress,
  bankAccount: emptyBankAccount,
};

export const ClientFormWrapper: React.FC<ClientFormWrapperProps> = (props) => {
  const { data: initialValues } = useGet({
    path: props.initValuesPath,
  });

  return (
    <ClientForm
      openProp={props.openProp}
      setOpenProp={props.setOpenProp}
      isEditable={props.initValuesPath !== ''}
      initValues={initialValues ? initialValues : emptyInitialValues}
      setAPIPathState={props.setAPIPathState}
    />
  );
};

export default ClientFormWrapper;
