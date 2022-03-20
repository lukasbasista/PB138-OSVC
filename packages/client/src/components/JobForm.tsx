import React, { useState } from 'react';

import { Box, Button, CheckBox, Collapsible, DateInput, Heading } from 'grommet';
import { Form, Formik } from 'formik';
import { FormLayer } from './FormLayer';
import TextFieldWrapper from './TextFieldWrapper';
import SelectWrapper from './SelectWrapper';
import jobSchema from './validation_schemas/jobSchema';
import currencies from '../data/currencies.json';
import { useGet, useMutate } from 'restful-react';
import TotalField from './TotalField';
import TextAreaWrapper from './TextAreaWrapper';
import { JobFormValues } from './JobFormWrapper';
import { Edit } from 'grommet-icons';

interface JobFormProps {
  openProp: boolean;
  setOpenProp: any;
  initValues: JobFormValues;
  isEditable: boolean;
  setAPIPathState: any;
}

const GetClients = () => {
  const { data: clients, loading } = useGet({
    path: `clients`,
    resolve: (clients) => {
      let clientOptions = [];
      for (let client of clients) {
        clientOptions.push({ label: client.name, value: client.email });
      }
      return clientOptions;
    },
  });
  return { clients, loading };
};

const GetCategories = () => {
  const { data: categories, loading } = useGet({
    path: `categories`,
    resolve: (categories) => {
      let categoryOptions = [];
      for (let cat of categories) {
        categoryOptions.push(cat.name);
      }
      return categoryOptions;
    },
  });
  return { categories, loading };
};

export const JobForm: React.FC<JobFormProps> = ({ isEditable, ...props }) => {
  const [isHourly, setIsHourly] = useState(props.initValues.hourRate == '');
  const [dateValue, setDateValue] = React.useState<string[]>([
    props.initValues.workStart,
    props.initValues.workEnd,
  ]);
  const { mutate: post } = useMutate({
    verb: 'POST',
    path: `worklogs`,
  });

  const clients = GetClients();
  const categories = GetCategories();
  const [isDetailProp, setIsDetailProp] = useState(isEditable);

  return (
    <>
      <FormLayer
        openProp={props.openProp}
        setOpenProp={props.setOpenProp}
        setDetailProp={setIsDetailProp}
        detailProp={isDetailProp}
        setAPIPathState={props.setAPIPathState}
      >
        <Formik
          initialValues={props.initValues}
          onSubmit={(values) => {
            console.log(values);
            post(values);
            props.setOpenProp(!props.openProp);
          }}
          enableReinitialize={true}
          validationSchema={jobSchema}
        >
          {({ values, resetForm }) => (
            <Form>
              <Heading color="brand">
                {isEditable ? 'Job detail' : 'Create Job'}
                {isEditable && (
                  <Button
                    icon={<Edit color="brand" />}
                    onClick={() => setIsDetailProp(!isDetailProp)}
                  />
                )}
              </Heading>
              <SelectWrapper
                name="email"
                labelProp="client"
                options={clients.clients ? clients.clients : []}
                objectOptions={true}
                disabled={isDetailProp}
              />
              <TextFieldWrapper name="name" labelProp="job name" disabled={isDetailProp} />
              <TextAreaWrapper name="description" labelProp="description" disabled={isDetailProp} />
              <SelectWrapper
                name="jobCategory.name"
                labelProp="job category"
                options={categories.categories ? categories.categories : []}
                objectOptions={false}
                disabled={isDetailProp}
              />
              <Box align="start" pad={{ top: 'medium', bottom: 'medium', left: 'xsmall' }}>
                <CheckBox
                  label="hourly rate"
                  checked={isHourly}
                  onChange={(event) => setIsHourly(event.target.checked)}
                  disabled={isDetailProp}
                />
              </Box>
              <Collapsible open={isHourly}>
                {}
                <TextFieldWrapper name="hourRate" labelProp="hourly rate" disabled={isDetailProp} />
              </Collapsible>
              <TextFieldWrapper name="timeWorked" labelProp="time worked" disabled={isDetailProp} />
              <TotalField
                name="total"
                labelProp={'total'}
                isHourly={isHourly}
                placeholderProp="0"
              />
              <SelectWrapper
                name="currency"
                labelProp="currency"
                options={currencies}
                objectOptions={true}
                disabled={isDetailProp}
              />
              <Box
                align="start"
                pad={{ top: 'medium', bottom: 'large', left: 'xxsmall' }}
                margin={{ left: 'none' }}
              >
                <DateInput
                  disabled={isDetailProp}
                  value={dateValue}
                  format="mm/dd/yyyy-mm/dd/yyyy"
                  onChange={(event) => {
                    let nextValue = event.value;
                    console.log(nextValue);
                    if (!Array.isArray(nextValue)) {
                      nextValue = Array(nextValue);
                    }
                    setDateValue(nextValue);
                    values.workStart = nextValue[0];
                    values.workEnd = nextValue[1];
                  }}
                />
              </Box>
              <Box direction="row" justify="end" /*height='xxsmall'*/>
                <Button
                  type="reset"
                  primary
                  label="Reset"
                  margin={{ right: 'small' }}
                  onClick={() => resetForm}
                />
                <Button type="submit" primary label={isEditable ? 'Save' : 'Create'} />
              </Box>
            </Form>
          )}
        </Formik>
      </FormLayer>
    </>
  );
};

export default JobForm;
