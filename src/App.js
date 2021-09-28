import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import store from './redux/stores';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/dashboard">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
