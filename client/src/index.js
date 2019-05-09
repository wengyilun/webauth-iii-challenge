import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {userReducer} from './reducers'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import RiderLoginPage from "./views/rider/RiderLoginPage";
import RiderSignupPage from "./views/rider/RiderSignupPage";
import RiderHomePage from "./views/rider/RiderHomePage";

import * as serviceWorker from './serviceWorker';

const store = createStore(
	userReducer,
	applyMiddleware(
		thunk,
		logger
	)
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


class App extends React.Component {
	render() {
		// if(!this.state.items){
		// 	return <Loader>Loading Data</Loader>
		// }
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={RiderLoginPage} />
					<Route path="/signin" component={RiderLoginPage} />
					<Route path="/signup" component={RiderSignupPage} />
					<Route path="/users" component={RiderHomePage} />
				</Switch>
			</div>
		);
	}
}

const AppWithRouter = withRouter(App)


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppWithRouter />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
