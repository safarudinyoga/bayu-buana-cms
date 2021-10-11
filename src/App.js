import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Master from './pages/Master/Flight/index';
import CreateFlight from './pages/Master/Flight/create';
import EditFlight from './pages/Master/Flight/edit';
import CreateHotel from './pages/Master/Hotel/create';
import EditHotel from './pages/Master/Hotel/edit';
import CreateOther from './pages/Master/Other/create';
import EditOther from './pages/Master/Other/edit';
import CreateAircraft from './pages/AirCraft/create';
import AirCraft from './pages/AirCraft/index';
import editAirCraft from './pages/AirCraft/edit';
import detailAircraft from './pages/AirCraft/detail';

import CreateRegion from './pages/Region/create';
import Region from './pages/Region/index';
import editRegion from './pages/Region/edit';
import detailRegion from './pages/Region/detail';

function App() {
  return (
    <div>
      <Router basename="/dashboard">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/master" component={Master} />
          <Route exact path="/aircraft" component={AirCraft} />
          <Route
            exact
            path="/aircraft/create-aircraft"
            component={CreateAircraft}
          />
          <Route
            exact
            path="/aircraft/edit-aircraft/:id"
            component={editAirCraft}
          />
          <Route
            exact
            path="/aircraft/detail-aircraft/:id"
            component={detailAircraft}
          />

          <Route exact path="/region" component={Region} />
          <Route exact path="/region/create-region" component={CreateRegion} />
          <Route exact path="/region/edit-region/:id" component={editRegion} />
          <Route
            exact
            path="/region/detail-region/:id"
            component={detailRegion}
          />

          <Route exact path="/master/create-flight" component={CreateFlight} />
          <Route exact path="/master/create-hotel" component={CreateHotel} />
          <Route exact path="/master/create-other" component={CreateOther} />
          <Route exact path="/master/edit-flight/:id" component={EditFlight} />
          <Route exact path="/master/edit-hotel/:id" component={EditHotel} />
          <Route exact path="/master/edit-other/:id" component={EditOther} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
