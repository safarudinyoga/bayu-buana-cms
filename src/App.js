import Login from './views/Begin/Login';

import { Provider } from 'react-redux'
import store from './redux/stores'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
function App() {
  return (
    <Provider store={store}>
      <Router basename="/dashboard">
        <Switch>
          <Route exact path ="/" component={Login} />
        </Switch>
      </Router>
    </Provider >
  );
}

export default App;
