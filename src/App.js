import React, { Suspense, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import MainPage from './components/MainPage/MainPage';

const lazyAuth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  render(){
    let routes = (
      <Suspense fallback={<div>Cargando...</div>}>
        <Switch>
          <Route path="/auth" component={lazyAuth} />
          <Route path="/" exact component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    return (
      <Layout>
        {routes}
      </Layout>
    );
  };
}

export default App;
