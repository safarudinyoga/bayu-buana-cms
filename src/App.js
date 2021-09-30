import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Master from './pages/Master/Flight/index';
import CreateFlight from './pages/Master/Flight/create';
import EditFlight from './pages/Master/Flight/edit';
import store from './redux/stores';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/dashboard">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/master" component={Master} />
          <Route exact path="/master/create-flight" component={CreateFlight} />
          <Route exact path="/master/edit-flight" component={EditFlight} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
