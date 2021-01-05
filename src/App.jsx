import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { permissionRoutes } from './routes'
import FrameLayout from './layout'
function App() {
  return (
    <>
      
    <FrameLayout>
      <Switch>
        {
          permissionRoutes.map(route => (<Route key={route.path} path={route.path} component={route.component}/>))
        }
        <Redirect to="/admin/dashboard" from="/admin" exact />
        <Redirect to="/404" />
      </Switch>
    </FrameLayout>
    </>
  );
}

export default App;
