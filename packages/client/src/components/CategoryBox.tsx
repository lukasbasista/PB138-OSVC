import React from 'react';
import { Card, CardHeader, CardBody, Text, Box, Heading, Form, FormField } from 'grommet';

interface CategoryProps {
  name: string;
  description: string;
  toggleForm: (name: string, desc: string) => void;
}

const CategoryBox: React.FC<CategoryProps> = ({ name, description , toggleForm}) => {
  return (
    <Card
      background="light-1"
      onClick={() => toggleForm(name, description)}
      hoverIndicator={true}
    >
      <CardHeader color="brand" pad="medium" alignSelf="center">
        <Text size="large" color="brand" weight="bold" a11yTitle={name}>
          {name}
        </Text>
      </CardHeader>
      <CardBody pad="medium">{description}</CardBody>
    </Card>
  );
};

export default CategoryBox;
