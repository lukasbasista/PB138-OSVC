import React, { useState } from 'react';

import { Box, Button, Collapsible, Grid, Heading, Layer, Paragraph } from 'grommet';
import { Form, Field, Formik } from 'formik';
import { FormLayer } from './FormLayer';
import TextFieldWrapper from './TextFieldWrapper';
import CheckBoxWrapper from './CheckBoxWrapper';
import SelectWrapper from './SelectWrapper';
import clientSchema from './validation_schemas/clientSchema';
import countries from '../data/countries.json';
import currencies from '../data/currencies.json';
import { useMutate } from 'restful-react';
import { ClientFormValues } from './ClientsFormWrapper';
import { Edit } from 'grommet-icons';

interface ClientFormProps {
  openProp: boolean;
  setOpenProp: any;
  initValues: ClientFormValues;
  setAPIPathState: any;
  isEditable: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = (props) => {
  const { mutate: post } = useMutate({
    verb: 'POST',
    path: `clients`,
  });

  const [isDetail, setIsDetail] = useState(props.isEditable);

  return (
    <FormLayer
      openProp={props.openProp}
      setOpenProp={props.setOpenProp}
      setDetailProp={setIsDetail}
      detailProp={isDetail}
      setAPIPathState={props.setAPIPathState}
    >
      <Formik
        initialValues={props.initValues}
        onSubmit={(values, actions) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !values.isCompany && ((values.ic = ''), (values.dic = ''));
          console.log(values);
          post(values);
          props.setOpenProp(!props.openProp);
        }}
        validationSchema={clientSchema}
        enableReinitialize={true}
      >
        {({ values, resetForm }) => (
          <Form>
            <Heading color="brand">
              {props.isEditable ? 'Client detail' : 'Create client'}
              {props.isEditable && (
                <Button icon={<Edit color="brand" />} onClick={() => setIsDetail(!isDetail)} />
              )}
            </Heading>
            <TextFieldWrapper
              name="name"
              labelProp="Client name"
              placeholderProp="Enter client name"
              disabled={isDetail}
            />

            <TextFieldWrapper
              name="email"
              labelProp="Email"
              placeholderProp="example@mail.com"
              disabled={isDetail}
            />

            <TextFieldWrapper
              name="mobileNumber"
              labelProp="Phone number"
              placeholderProp="+000 123 456 789"
              disabled={isDetail}
            />

            <Field
              component={CheckBoxWrapper}
              name="isCompany"
              labelProp="company"
              disabled={isDetail}
            />

            <Collapsible open={values.isCompany}>
              <Box direction="row">
                <TextFieldWrapper
                  name="ic"
                  labelProp="ICO"
                  placeholderProp="01234567"
                  disabled={isDetail}
                />
                <TextFieldWrapper
                  name="dic"
                  labelProp="DICO"
                  placeholderProp="AB01234567"
                  disabled={isDetail}
                />
              </Box>
            </Collapsible>

            <SelectWrapper
              name="address.country"
              labelProp="Country"
              options={countries}
              objectOptions={true}
              disabled={isDetail}
            />
            <Grid
              rows={['1']}
              columns={['1/3', '1/3', '1/3']}
              areas={[
                { name: 'city', start: [0, 0], end: [1, 0] },
                { name: 'postcode', start: [2, 0], end: [2, 0] },
              ]}
            >
              <Box gridArea="city">
                <TextFieldWrapper name="address.city" labelProp="City" disabled={isDetail} />
              </Box>
              <Box gridArea="postcode">
                <TextFieldWrapper
                  name="address.postcode"
                  labelProp="Postcode"
                  disabled={isDetail}
                />
              </Box>
            </Grid>
            <TextFieldWrapper name="address.address" labelProp="Address" disabled={isDetail} />

            <Box direction="row">
              <TextFieldWrapper
                name="bankAccount.accountNumber"
                labelProp="Bank account number"
                disabled={isDetail}
              />
              <SelectWrapper
                name="bankAccount.currency"
                labelProp="Currency"
                options={currencies}
                objectOptions={true}
                disabled={isDetail}
              />
            </Box>

            <Box direction="row" justify="end" /*height='xxsmall'*/>
              <Button
                type="reset"
                primary
                label="Reset"
                onClick={() => resetForm}
                color="#444444"
                margin={{ right: 'small' }}
              />
              <Button type="submit" primary label={props.isEditable ? 'Save' : 'Create'} />
            </Box>
          </Form>
        )}
      </Formik>
    </FormLayer>
  );
};

export default ClientForm;
