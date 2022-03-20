import React, { useCallback } from 'react';
import { Button, Box, Heading, ResponsiveContext, Collapsible, Nav, Anchor } from 'grommet';

import { Menu, Filter, Add } from 'grommet-icons';
import routes from '../routes';
import { Link } from 'react-router-dom';

interface HeaderProps {
  header: string;
  button: string;
  setButton: any;
  setAPIPathState: (path: string) => void;
}

const DropdownMenu = () => (
  <Box background="#FFF" pad="large" fill>
    <Box direction="row" pad={{ vertical: 'medium' }}>
      <Nav width="small" margin={{ right: 'large' }}>
        {routes.map((route: any) => {
          return (
            <Link to={route.path}>
              <Anchor label={route.name} />
            </Link>
          );
        })}
      </Nav>
    </Box>
  </Box>
);

export const PageHeader: React.FunctionComponent<HeaderProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleInputChange = useCallback(
    (event) => {
      props.setButton(true);
      props.setAPIPathState('');
    },
    [props.setButton],
  );
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box>
          <Box width={{ min: '100%' }} justify="between" direction="row" pad="large">
            <Heading color="brand" size="large" margin="none">
              <strong>{props.header} </strong>
            </Heading>
            {size !== 'small' ? (
              <Button
                primary
                icon={<Add />}
                label={props.button}
                alignSelf="end"
                onClick={handleInputChange}
              ></Button>
            ) : (
              <Box direction="row" alignSelf="end">
                <Button a11yTitle="filter">
                  <Anchor icon={<Filter />} />
                </Button>

                <Button a11yTitle="toggle menu" onClick={() => setOpen(!open)}>
                  <Anchor icon={<Menu />} />
                </Button>
              </Box>
            )}
            {size === 'small' && (
              <Button primary className="addButton" icon={<Add />} onClick={handleInputChange} />
            )}
          </Box>
          {size === 'small' && (
            <Collapsible open={open} {...props}>
              <DropdownMenu />
            </Collapsible>
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default PageHeader;
