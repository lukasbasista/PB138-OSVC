import React, {useState} from 'react';
import IPage from '../../interfaces/page';
import { ResponsiveContext, Grid, Box, Spinner } from 'grommet';
import Category from '../CategoryBox';
import { useGet } from 'restful-react';
import { CategoryForm } from '../CategoryForm';

const initialValues = {
  name: "",
  description: "",
}

const CategoriesPage: React.FunctionComponent<IPage> = ({
  openForm,
  setOpenForm,
  setAPIPathState,
  APIPathState,
}) => {
  const {
    data: categories,
    loading,
    error,
  } = useGet({
    path: 'categories ',
  });

  const toggleForm = (CategoryName?: string, CategoryDesc?: string) => {
    if (CategoryName) {initialValues.name = CategoryName}
    if (CategoryDesc) {initialValues.description = CategoryDesc}
    setAPIPathState("category")
    setOpenForm(true);
  };

  return (
    <Box className="content">
      {openForm && (
        <CategoryForm
          openProp={openForm}
          setOpenProp={setOpenForm}
          setAPIPathState={setAPIPathState}
          isEditable={APIPathState !== ""}
          name={initialValues.name}
          description={initialValues.description}
        />
      )}
      <ResponsiveContext.Consumer>
        {() => (
          <Grid gap="medium" columns={{ count: 'fit', size: 'medium' }}>
            {categories &&
              categories.map((category: any) => (
                <Category
                  key={category.name}
                  name={category.name}
                  description={category.description}
                  toggleForm={(name, desc) => toggleForm(name, desc)}
                />
              ))}
          </Grid>
        )}
      </ResponsiveContext.Consumer>

      {error && (
        <Box background="status-error" align="center">
          {error.message}
        </Box>
      )}
      {loading && <Spinner alignSelf="center" color="brand" size="small" />}
    </Box>
  );
};

export default CategoriesPage;
