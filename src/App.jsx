import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { permissionRoutes } from './routes'
import FrameLayout from './layout'
import { connect } from 'react-redux';
function App(props) {
  return (
    props.token
    ?
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
    :
    <Redirect to='/login' />
  );
}

export default connect(state => {
  return {token: state.user.token}
})(App);
