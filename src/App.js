import { Helmet } from 'react-helmet';
import './assets/css/styles.css';
import Login from './views/Begin/Login';
import Home from './views/Home';
import { Provider } from 'react-redux';
import store from './redux/stores';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
	return (
		<>
			<Helmet>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossorigin="anonymous"
				/>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
					crossorigin="anonymous"
				></script>
			</Helmet>
			<Provider store={store}>
				<Router basename="/dashboard">
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/home" component={Home} />
					</Switch>
				</Router>
			</Provider>
		</>
	);
}

export default App;
