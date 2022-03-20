import React, { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  Grommet,
  Box,
  Button,
} from 'grommet';
import { useGet } from 'restful-react';
import { Search } from 'grommet-icons';

const customTheme = {
  global: {
    font: {
      family: 'Helvetica',
      size: '5px',
    },
  },
  table: {
    body: {
      align: 'left',
      pad: { vertical: 'xsmall' },
      background: 'white',
    },
    extend: () => `font-family: Arial`,
    footer: {
      align: 'start',
      border: undefined,
      pad: { vertical: 'small' },
      verticalAlign: 'bottom',
    },
    header: {
      align: 'left',
      border: 'bottom',
      fill: 'horizontal',
      pad: { vertical: 'medium' },
      verticalAlign: 'bottom',
      background: {
        color: 'accent-1',
      },
      color: 'brand',
      text: {
        color: 'brand',
      },
    },
  },
};

interface TableProps {
  COLUMNS: {
    property: string;
    label: string;
    datascope?: any;
    align?: string;
  }[];
  DATA: Array<any>;
  toggleState: (path: string) => void;
}

export const DataTable: FC<TableProps> = (props) => {
  return (
    <Grommet theme={customTheme}>
      <Box pad="small" basis="small">
        <Table>
          <TableHeader>
            <TableRow>
              {props.COLUMNS.map((c) => (
                <TableCell key={c.property} scope="col" border="bottom">
                  <Text>{c.label}</Text>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.DATA?.map((data) => (
              <TableRow key={data.id}>
                {props.COLUMNS.map((c) => (
                  <TableCell key={c.property} scope="row">
                    {c.property != 'button' ? (
                      <Text>{(data as any)[c.property]}</Text>
                    ) : (
                      <Button
                        icon={<Search />}
                        onClick={() => props.toggleState((data as any)[c.property])}
                      ></Button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Grommet>
  );
};

export default DataTable;
