import React from 'react';
import IPage from '../../interfaces/page';
import DataTable from '../DataTable';
import { Box, ResponsiveContext, Spinner } from 'grommet';
import { useGet } from 'restful-react';
import ClientFormWrapper from '../ClientsFormWrapper';

const ClientsPage: React.FunctionComponent<IPage> = (props) => {
  const {
    data: clients,
    loading,
    error,
  } = useGet({
    path: 'clients',
  });

  const toggleAPIPathState = (path: string) => {
    props.setAPIPathState(path);
    props.setOpenForm(true);
  };

  const tableData =
    clients &&
    clients.map((x: any) => ({
      client: x.name,
      email: x.email,
      telephone: x.mobileNumber,
      address: x.address.address,
      bank: x.bankAccount.accountNumber,
      timeWorked: x.timeWorked,
      earningsSum: x.earningsSum,
      currency: x.bankAccount.currency,
      button: 'clients/' + x.email,
    }));

  const mobileTableData =
    clients &&
    clients.map((x: any) => ({
      name: x.name,
      email: x.email,
      telephone: x.mobileNumber,
      button: 'clients/' + x.email,
    }));
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box className="content">
          {props.openForm && (
            <ClientFormWrapper
              openProp={props.openForm}
              setOpenProp={props.setOpenForm}
              initValuesPath={props.APIPathState}
              setAPIPathState={props.setAPIPathState}
            />
          )}

          <Box className="dataTable">
            {size !== 'small'
              ? !loading &&
                !error && (
                  <DataTable
                    toggleState={(path) => toggleAPIPathState(path)}
                    COLUMNS={columns}
                    DATA={tableData}
                  />
                )
              : !loading &&
                !error && (
                  <DataTable
                    toggleState={(path) => toggleAPIPathState(path)}
                    COLUMNS={columnsMobile}
                    DATA={mobileTableData}
                  />
                )}
          </Box>
          {error && (
            <Box background="status-error" align="center">
              {error.message}
            </Box>
          )}
          {loading && <Spinner alignSelf="center" color="brand" size="small" />}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default ClientsPage;

// Temporary data
const columns = [
  {
    property: 'client',
    label: 'Client Name',
    dataScope: 'row',
  },
  {
    property: 'email',
    label: 'Email',
  },
  {
    property: 'telephone',
    label: 'Telephone',
  },
  {
    property: 'address',
    label: 'Address',
  },
  {
    property: 'bank',
    label: 'Bank Account',
  },
  {
    property: 'timeWorked',
    label: 'Time Spent',
  },
  {
    property: 'earningsSum',
    label: 'Earnings',
  },
  {
    property: 'currency',
    label: 'Currency',
  },
  {
    property: 'button',
    label: '',
    align: 'end',
  },
];

const columnsMobile = [
  {
    property: 'name',
    label: 'Name',
    dataScope: 'row',
  },
  {
    property: 'email',
    label: 'Email',
  },
  {
    property: 'telephone',
    label: 'Telephone',
  },
  {
    property: 'earningsSum',
    label: 'Earnings',
  },
  {
    property: 'timeWorked',
    label: 'Time Spent',
  },
  {
    property: 'button',
    label: '',
    align: 'end',
  },
];
