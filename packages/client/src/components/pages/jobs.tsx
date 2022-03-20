import React, { useState } from 'react';
import IPage from '../../interfaces/page';
import DataTable from '../DataTable';
import { Box, ResponsiveContext, Spinner } from 'grommet';
import { useGet } from 'restful-react';
import { FilterForm } from '../FilterForm';
import JobFormWrapper from '../JobFormWrapper';

const JobsPage: React.FunctionComponent<IPage> = (props) => {
  const {
    data: worklogs,
    loading,
    error,
  } = useGet({
    path: 'workLogs',
  });

  const toggleAPIPathState = (path: string) => {
    props.setAPIPathState(path);
    props.setOpenForm(true);
  };

  const [initialized, setInitialized] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState(worklogs);
  if (!initialized && !loading) {
    setFilteredLogs(worklogs);
    setInitialized(true);
  }

  const tableData =
    filteredLogs &&
    filteredLogs.map((x: any) => ({
      date: x.workStart.split('T')[0] + ' - ' + x.workEnd.split('T')[0],
      job: x.name,
      type: x.jobCategory.name,
      client: x.email,
      wage: Math.floor(x.total / x.timeWorked),
      hours: x.timeWorked,
      total: x.total,
      button: 'workLogs/' + x.uuid,
    }));

  const mobileTableData =
    filteredLogs &&
    filteredLogs.map((x: any) => ({
      date: x.workStart + x.workEnd,
      job: x.name,
      client: x.email,
      hours: x.timeWorked,
      total: x.total,
      button: 'workLogs/' + x.uuid,
    }));
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box className="content">
          {props.openForm && (
            <JobFormWrapper
              openProp={props.openForm}
              setOpenProp={props.setOpenForm}
              initValuesPath={props.APIPathState}
              setAPIPathState={props.setAPIPathState}
            />
          )}
          <FilterForm data={worklogs} setData={setFilteredLogs}></FilterForm>

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
            {error && (
              <Box background="status-error" align="center">
                {error.message}
              </Box>
            )}
            {loading && <Spinner alignSelf="center" color="brand" size="small" />}
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default JobsPage;

// Temporary data
const columns = [
  {
    property: 'date',
    label: 'From - To',
    dataScope: 'row',
  },
  {
    property: 'job',
    label: 'Job',
  },
  {
    property: 'type',
    label: 'Job Category',
  },
  {
    property: 'client',
    label: 'Client',
  },
  {
    property: 'wage',
    label: 'Hourly Wage',
  },
  {
    property: 'hours',
    label: 'Hours Worked',
  },
  {
    property: 'total',
    label: 'Total',
  },
  {
    property: 'button',
    label: '',
    align: 'end',
  },
];

const columnsMobile = [
  {
    property: 'date',
    label: 'From - To',
    dataScope: 'row',
  },
  {
    property: 'job',
    label: 'Job',
  },
  {
    property: 'client',
    label: 'Client',
  },
  {
    property: 'hours',
    label: 'Hours Worked',
  },
  {
    property: 'total',
    label: 'Total',
  },
  {
    property: 'button',
    label: '',
    align: 'end',
  },
];
