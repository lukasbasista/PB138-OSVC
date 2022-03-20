import React, { useState } from 'react';

import { Button, Heading } from 'grommet';
import { Form, Formik } from 'formik';
import { FormLayer } from './FormLayer';
import * as Yup from 'yup';
import TextFieldWrapper from './TextFieldWrapper';
import { useMutate } from 'restful-react';
import TextAreaWrapper from './TextAreaWrapper';
import { Edit } from 'grommet-icons';

const initialValues = {
  name: '',
  description: '',
};

interface CategoryFormProps {
  openProp: boolean;
  setOpenProp: any;
  setAPIPathState: any;
  isEditable: boolean;
  name: string;
  description: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
});

export const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const { mutate: post } = useMutate({
    verb: 'POST',
    path: `categories`,
  });

  const [isDetail, setIsDetail] = useState(props.isEditable);
  if (props.isEditable) {
    initialValues.name = props.name
    initialValues.description = props.description
  }
  else {
    initialValues.name = ""
    initialValues.description = ""
  }

  return (
    <FormLayer
      openProp={props.openProp}
      setOpenProp={props.setOpenProp}
      setDetailProp={setIsDetail}
      detailProp={isDetail}
      setAPIPathState={props.setAPIPathState}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          post(values);
          props.setOpenProp(!props.openProp);
        }}
        validationSchema={schema}
      >
        {({ values, errors, resetForm }) => (
          <Form>
            <Heading color="brand">
              {props.isEditable ? 'Category detail' : 'Create category'}
              {props.isEditable && (
                <Button icon={<Edit color="brand" />} onClick={() => setIsDetail(!isDetail)} />
              )}
            </Heading>
            <TextFieldWrapper name="name" labelProp="name" disabled={isDetail} />
            <TextAreaWrapper name="description" labelProp="description" disabled={isDetail} />
            <Button type="submit" primary label="Create" />
            <Button type="reset" primary label="Reset" onClick={() => resetForm} />
          </Form>
        )}
      </Formik>
    </FormLayer>
  );
};
