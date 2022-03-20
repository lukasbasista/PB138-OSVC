import React, { Dispatch, SetStateAction } from 'react';

import {
  Grid,
  Text,
  Box,
  Select,
  DateInput,
  Button,
  Grommet,
  grommet,
  ResponsiveContext,
  FormField,
  Collapsible,
  Form,
  MaskedInput,
} from 'grommet';
import { Clock, Close, Currency, Filter, Money, Multiple, Tools, User } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { useGet } from 'restful-react';

import WorkLog from '../../../api/db/types/workLog';

const globalTheme = deepMerge(grommet, {
  /*global: {
    background: {
      color: 'light-2',
    },
    borderSize: {
      xxsmall: '10px',
      xsmall: '10px',
      small: '10px',
      medium: '10px',
      large: '10px',
    },
    rounded: '20px',
    input: {
      font: {
        weight: '500',
      },
    },
  },*/
  formField: {
    margin: '0',
    border: {
      error: {
        color: 'status-error',
      },
      /*color: 'border',*/
      color: '#D8D8D8',
      side: 'all',
    },
    /*disabled: {
      background: {
        color: undefined,
      },
      border: {
        color: 'status-disabled',
      },
      label: {
        color: 'status-disabled',
      },
    },
    error: {
      background: {
        color: { light: '#FF404033', dark: '#FF40404D' },
      },
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
      },
    },
    label: {
      size: 'medium',
      color: 'brand',
      weight: '700',
      margin: {
        horizontal: 'none',
      },
    },*/
    round: '9px',
  },
  button: {
    primary: { font: { weight: 'bold' } },
    /*primary: {
      background: { color: 'brand' },
      color: 'white',
      font: { weight: 'bold' },
    },*/
    /*secondary: {
      background: { color: '#444444' },
      color: 'white',
    },*/
    /*active: {
      background: { color: 'brand-contrast' },
      color: 'text',
      secondary: {
        background: 'none',
        border: {
          color: 'brand-contrast',
        },
      },
    },
    disabled: {
      opacity: 0.3,
      secondary: {
        border: { color: 'text-weak' },
      },
    },*/
    /*hover: {
      background: { color: 'status-ok', opacity: '0.3' },
      color: { "dark": "white", "light": "black" },
      secondary: {
        background: { color: 'grey' },
        border: { color: 'active' },
      },
    },*/
  },
});

interface FilterFormProps {
  data: WorkLog[];
  setData: any;
}

type FilterFormValues = {
  job?: string;
  client?: { label: string; email: string };
  fromTo: string[];
  category?: string;
  hourly?: string;
  hourlyComparison: string;
  hoursWorked?: string;
  hoursWorkedComparison: string;
  total?: string;
  totalComparison: string;
};

const initialValues = {
  fromTo: ['', new Date().toDateString()],
  hourlyComparison: '<',
  hoursWorkedComparison: '<',
  totalComparison: '<',
};

export const FilterForm: React.FC<FilterFormProps> = (props) => {
  const size = React.useContext(ResponsiveContext);

  const { data: jobs } = useGet({
    path: `workLogs`,
    resolve: (workLogs) => {
      let jobOptions: string[] = [];
      const jobs = new Set<string>(workLogs.map((x: any) => x.name));
      jobs.forEach((x: string) => jobOptions.push(x));
      return jobOptions;
    },
  });

  const { data: clients } = useGet({
    path: `clients`,
    resolve: (clients) => {
      let clientOptions = [];
      for (let client of clients) {
        clientOptions.push({ label: client.name, email: client.email });
      }
      return clientOptions;
    },
  });

  const { data: categories } = useGet({
    path: `categories`,
    resolve: (categories) => {
      let categoryOptions = [];
      for (let cat of categories) {
        categoryOptions.push(cat.name);
      }
      return categoryOptions;
    },
  });

  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState<string[]>(['', new Date().toDateString()]);
  const [activeFilters, setActiveFilters]: [JSX.Element, any] = React.useState(<></>);
  const [values, setValues]: [FilterFormValues, Dispatch<SetStateAction<FilterFormValues>>] =
    React.useState(initialValues);

  return (
    <Grommet theme={globalTheme}>
      <Box background="light-2" pad={{ horizontal: 'small' }}>
        <Button
          label="filters"
          icon={<Filter />}
          alignSelf="start"
          hoverIndicator={{ color: 'accents-1' }}
          margin={{ bottom: 'small' }}
          plain
          onClick={() => setOpen(!open)}
        />
        <Collapsible open={open}>
          <Box
            background="white"
            pad="small"
            round="small"
            overflow="hidden"
            margin={{ bottom: 'small' }}
          >
            <Form
              value={values}
              validate="change"
              onReset={() => {
                setValues(initialValues);
                setDateValue(initialValues.fromTo);
              }}
              onChange={(nextValue) => setValues(nextValue)}
              onSubmit={({ value }) => {
                const filteredData = props.data.filter(
                  (workLog: WorkLog) =>
                    (!values.job || workLog.name === values.job) &&
                    (!values.client || workLog.email === values.client.email) &&
                    (!values.fromTo[0] ||
                      values.fromTo[0] === '' ||
                      (new Date(workLog.workStart) >= new Date(values.fromTo[0]) &&
                        new Date(workLog.workEnd) <= new Date(values.fromTo[1]))) &&
                    (!values.category || workLog.jobCategory.name === values.category) &&
                    (!values.hourly ||
                      (values.hourlyComparison === '<' &&
                        (workLog.hourRate
                          ? workLog.hourRate
                          : Math.floor(workLog.total / workLog.timeWorked) >
                            Number(values.hourly))) ||
                      (values.hourlyComparison === '=' &&
                        (workLog.hourRate
                          ? workLog.hourRate
                          : Math.floor(workLog.total / workLog.timeWorked) ===
                            Number(values.hourly))) ||
                      (values.hourlyComparison === '>' &&
                        (workLog.hourRate
                          ? workLog.hourRate
                          : Math.floor(workLog.total / workLog.timeWorked)) <
                          Number(values.hourly))) &&
                    (!values.hoursWorked ||
                      (values.hoursWorkedComparison === '<' &&
                        (workLog.timeWorked ? workLog.timeWorked : 0) >
                          Number(values.hoursWorked)) ||
                      (values.hoursWorkedComparison === '=' &&
                        workLog.timeWorked === Number(values.hoursWorked)) ||
                      (values.hoursWorkedComparison === '>' &&
                        (workLog.timeWorked ? workLog.timeWorked : 0) <
                          Number(values.hoursWorked))) &&
                    (!values.total ||
                      (values.totalComparison === '<' &&
                        (workLog.total ? workLog.total : 0) > Number(values.total)) ||
                      (values.totalComparison === '=' && workLog.total === Number(values.total)) ||
                      (values.totalComparison === '>' &&
                        (workLog.total ? workLog.total : 0) < Number(values.total))),
                );
                props.setData(filteredData);
                setOpen(!open);

                let filtersTexts = [];
                values.job &&
                  filtersTexts.push(
                    <Box direction="row">
                      {' '}
                      <Text weight="normal">job:&nbsp;</Text>
                      <Text>{values.job}</Text>{' '}
                    </Box>,
                  );
                values.client &&
                  values.client.label &&
                  filtersTexts.push(
                    <Box direction="row">
                      {' '}
                      <Text weight="normal">client:&nbsp;</Text>
                      <Text>{values.client.label}</Text>{' '}
                    </Box>,
                  );
                values.fromTo[0] &&
                  values.fromTo[0] !== '' &&
                  filtersTexts.push(
                    <Box direction="row">
                      {' '}
                      <Text weight="normal">date:&nbsp;</Text>
                      <Text>{`${new Date(values.fromTo[0]).toLocaleDateString()} - ${new Date(
                        values.fromTo[1],
                      ).toLocaleDateString()}`}</Text>{' '}
                    </Box>,
                  );
                values.category &&
                  filtersTexts.push(
                    <Box direction="row">
                      {' '}
                      <Text weight="normal">category:&nbsp;</Text>
                      <Text>{values.category}</Text>{' '}
                    </Box>,
                  );
                values.hourly &&
                  filtersTexts.push(
                    <Box direction="row">
                      {' '}
                      <Text>
                        {values.hourly} {values.hourlyComparison}
                      </Text>
                      <Text weight="normal">&nbsp;hourly wage</Text>{' '}
                    </Box>,
                  );
                values.hoursWorked &&
                  filtersTexts.push(
                    <Box direction="row">
                      {' '}
                      <Text>
                        {values.hoursWorked} {values.hoursWorkedComparison}
                      </Text>
                      <Text weight="normal">&nbsp;work hours</Text>{' '}
                    </Box>,
                  );
                values.total &&
                  filtersTexts.push(
                    <Box direction="row">
                      {' '}
                      <Text>
                        {values.total} {values.totalComparison}
                      </Text>
                      <Text weight="normal">&nbsp;total</Text>{' '}
                    </Box>,
                  );

                if (filtersTexts.length > 0) {
                  setActiveFilters(
                    <Button
                      label={
                        <Box direction="row" gap="small" wrap>
                          <Text color="brand">active filters:&nbsp;</Text>
                          {filtersTexts}
                        </Box>
                      }
                      margin={{ bottom: 'xsmall' }}
                      color="#444444"
                      icon={<Close />}
                      reverse
                      onClick={() => {
                        setActiveFilters(<></>);
                        setValues(initialValues);
                        setDateValue(initialValues.fromTo);
                        props.setData(props.data);
                        setOpen(false);
                      }}
                    ></Button>,
                  );
                }
              }}
            >
              <Grid
                columns={
                  {
                    xsmall: ['1'],
                    small: ['1'],
                    medium: ['1/3', '1/3', '1/3'],
                    middle: ['1/3', '1/3', '1/3'],
                    large: ['1/3', '1/3', '1/3'],
                    xlarge: ['1/3', '1/3', '1/3'],
                  }[size]
                }
                width={
                  {
                    xsmall: '100%',
                    small: '100%',
                    medium: '97%',
                    middle: '98%',
                    large: '98%',
                    xlarge: '99%',
                  }[size]
                }
                gap="small"
                rows="xxsmall"
              >
                <FormField name="job">
                  <Select
                    name="job"
                    id="job"
                    options={jobs ? jobs : []}
                    placeholder="job"
                    clear
                    icon={<Tools color="black" />}
                  ></Select>
                </FormField>

                <FormField name="client">
                  <Select
                    name="client"
                    id="client"
                    options={clients ? clients : []}
                    children={(option) => <Box pad="small">{option.label}</Box>}
                    placeholder="client"
                    clear
                    icon={<User />}
                  ></Select>
                </FormField>

                <FormField name="fromTo">
                  <DateInput
                    name="fromTo"
                    value={dateValue}
                    format="dd/mm/yyyy-dd/mm/yyyy"
                    onChange={(event) => {
                      let nextValue = event.value;
                      console.log(nextValue);
                      if (!Array.isArray(nextValue)) {
                        nextValue = Array(nextValue);
                      }
                      setDateValue(nextValue);
                    }}
                  />
                </FormField>

                <FormField name="category">
                  <Select
                    name="category"
                    id="category"
                    options={categories ? categories : []}
                    placeholder="category"
                    clear
                    icon={<Multiple />}
                  />
                </FormField>

                <Box direction="row">
                  <FormField name="hourly" width="100%">
                    <MaskedInput
                      name="hourly"
                      placeholder="hourly wage"
                      mask={[{ regexp: /^[1-9]+[0-9]*$/ }]}
                    />
                  </FormField>
                  <Box direction="row" flex={false}>
                    <FormField name="hourlyComparison" width="90px">
                      <Select
                        name="hourlyComparison"
                        options={['<', '=', '>']}
                        defaultValue="<"
                        icon={<Money size="medium" />}
                      />
                    </FormField>
                  </Box>
                </Box>

                <Box direction="row">
                  <FormField name="hoursWorked" width="100%">
                    <MaskedInput
                      name="hoursWorked"
                      placeholder="work hours"
                      mask={[{ regexp: /^[1-9]+[0-9]*$/ }]}
                    />
                  </FormField>
                  <Box direction="row" flex={false}>
                    <FormField name="hoursWorkedComparison" width="90px">
                      <Select
                        name="hoursWorkedComparison"
                        options={['<', '=', '>']}
                        defaultValue="<"
                        icon={<Clock />}
                      />
                    </FormField>
                  </Box>
                </Box>

                <Box direction="row">
                  <FormField name="total" width="100%">
                    <MaskedInput
                      name="total"
                      placeholder="total wage"
                      mask={[{ regexp: /^[1-9]+[0-9]*$/ }]}
                    />
                  </FormField>
                  <Box direction="row" flex={false}>
                    <FormField name="totalComparison" width="90px">
                      <Select
                        name="totalComparison"
                        options={['<', '=', '>']}
                        defaultValue="<"
                        icon={<Currency />}
                      />
                    </FormField>
                  </Box>
                </Box>

                {size !== 'small' && size !== 'xsmall' ? <Box></Box> : []}
                <Box direction="row" gap="small" justify="end">
                  <Button type="reset" label="reset" margin="none" primary color="#444444" />
                  <Button type="submit" label="apply" primary />
                </Box>
              </Grid>
            </Form>
          </Box>
        </Collapsible>

        <Box direction="row" align="start" wrap>
          {activeFilters}
        </Box>
      </Box>
    </Grommet>
  );
};
