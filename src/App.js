import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateAircraft from './pages/AirCraft/create';
import detailAircraft from './pages/AirCraft/detail';
import editAirCraft from './pages/AirCraft/edit';
import AirCraft from './pages/AirCraft/index';
import Login from './pages/Login';
import CreateFlight from './pages/Master/Flight/create';
import EditFlight from './pages/Master/Flight/edit';
import Master from './pages/Master/Flight/index';
import CreateHotel from './pages/Master/Hotel/create';
import EditHotel from './pages/Master/Hotel/edit';
import CreateOther from './pages/Master/Other/create';
import EditOther from './pages/Master/Other/edit';
import {CreateProvince, DetailProvince, EditProvince, Province} from './pages/Province';
import CreateRegion from './pages/Region/create';
import detailRegion from './pages/Region/detail';
import editRegion from './pages/Region/edit';
import Region from './pages/Region/index';

function App() {
  return (
    <div>
      <Router basename="/dashboard">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/master" component={Master} />

          <Route exact path="/province" component={Province} />
          <Route exact path="/province/create" component={CreateProvince} />
          <Route exact path="/province/edit/:id" component={EditProvince} />
          <Route exact path="/province/show/:id" component={DetailProvince} />

          <Route exact path="/aircraft" component={AirCraft} />
          <Route exact path="/aircraft/create-aircraft" component={CreateAircraft} />
          <Route exact path="/aircraft/edit-aircraft/:id" component={editAirCraft} />
          <Route exact path="/aircraft/detail-aircraft/:id" component={detailAircraft} />

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
