import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {userReducer} from './reducers'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {BrowserRouter as Router, Switch, Route, withRouter, NavLink} from "react-router-dom";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import UserLoginPage from "./views/user/UserLoginPage";
import UserSignupPage from "./views/user/UserSignupPage";
import UserHomePage from "./views/user/UserHomePage";

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
				<header>
					<NavLink to="/signin">Login</NavLink>
				</header>
				<Switch>
					<Route exact path="/" component={UserLoginPage} />
					<Route path="/signin" component={UserLoginPage} />
					<Route path="/signup" component={UserSignupPage} />
					<Route path="/users" component={UserHomePage} />
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
