import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Nav, Sidebar } from 'grommet';

import { Configure } from 'grommet-icons';
import routes from '../routes';

const SidebarButton = ({ label, ...rest }: { label: string }) => (
  <Box
    pad={{ left: 'none', bottom: 'small' }}
    border={{ side: 'bottom', color: 'brand', size: 'medium' }}
  >
    <Button gap="medium" alignSelf="start" color="brand" plain label={label} {...rest} />
  </Box>
);

const MainNavigation = () => (
  <Nav gap="large" responsive={false}>
    {routes.map((route: any) => {
      return (
        <Link to={route.path}>
          <SidebarButton label={route.name} />
        </Link>
      );
    })}
  </Nav>
);

export const SideMenu = () => (
  <Box direction="row" height={{ min: '100%' }}>
    <Sidebar
      responsive
      background="light-1"
      pad={{ left: 'large', right: 'large', vertical: 'medium', top: '200px' }}
    >
      <MainNavigation />
    </Sidebar>
  </Box>
);

export default SideMenu;
