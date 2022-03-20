import React from 'react';
import { useGet } from 'restful-react';
import JobForm from './JobForm';

interface JobFormWrapperProps {
  openProp: boolean;
  setOpenProp: any;
  initValuesPath: string;
  setAPIPathState: any;
}

export interface JobFormValues {
  email: string;
  name: string;
  description: string;
  timeWorked: string;
  hourRate: string;
  total: string;
  workStart: string;
  workEnd: string;
}

const emptyInitialValues = {
  name: '',
  email: '',
  description: '',
  timeWorked: '',
  category: '',
  currency: '',
  total: '',
  hourRate: '',
  workStart: '2021-07-20T15:24:26.256Z',
  workEnd: '2021-07-20T15:24:26.256Z',
};

export const JobFormWrapper: React.FC<JobFormWrapperProps> = (props) => {
  const { data: initialValues } = useGet({
    path: props.initValuesPath,
  });

  return (
    <JobForm
      openProp={props.openProp}
      setOpenProp={props.setOpenProp}
      initValues={initialValues ? initialValues : emptyInitialValues}
      isEditable={props.initValuesPath !== ''}
      setAPIPathState={props.setAPIPathState}
    />
  );
};

export default JobFormWrapper;
