import { Box, Grommet, Grid, ResponsiveContext } from 'grommet';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import routes from './routes';
import SideMenu from './components/SideMenu';
import PageHeader from './components/PageHeader';

function App() {
  const [openForm, setOpenForm] = React.useState(false);
  const [APIPathState, setAPIPathState] = useState('');
  return (
    <BrowserRouter>
      <Grommet full>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Switch>
              {routes.map((route: any, index: any) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props: RouteComponentProps<any>) => (
                      <Grid
                        fill
                        rows={['auto', 'flex']}
                        columns={['auto', 'flex']}
                        areas={[
                          { name: 'sidebar', start: [0, 0], end: [0, 1] },
                          { name: 'header', start: [1, 0], end: [1, 0] },
                          { name: 'content', start: [1, 1], end: [1, 1] },
                        ]}
                      >
                        {size !== 'small' && (
                          <Box gridArea="sidebar">
                            <SideMenu />
                          </Box>
                        )}
                        <Box gridArea="header" background="light-2" fill={true} responsive={true}>
                          <PageHeader
                            header={route.name}
                            button={route.button}
                            setButton={setOpenForm}
                            setAPIPathState={setAPIPathState}
                          />
                        </Box>
                        <Box
                          gridArea="content"
                          fill={true}
                          responsive={true}
                          pad="medium"
                          background="light-2"
                        >
                          <route.component
                            name={route.name}
                            openForm={openForm}
                            setOpenForm={setOpenForm}
                            APIPathState={APIPathState}
                            setAPIPathState={setAPIPathState}
                            {...props}
                            {...route.props}
                          />
                        </Box>
                      </Grid>
                    )}
                  />
                );
              })}
            </Switch>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    </BrowserRouter>
  );
}

export default App;
