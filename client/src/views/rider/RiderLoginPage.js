import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import { login_rider } from '../../actions';
import {Link} from "react-router-dom";

class RiderLoginPage extends React.Component {
	state = {
		credentials: {
			username: '',
			password: ''
		},
		isEditing: false
	};
	
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
	}
	
	handleChange = e => {
		this.setState({
			isEditing:true,
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		});
	};
	
	login = e => {
		e.preventDefault();
		this.setState({
			isEditing:false,
		})
		this.props.login_rider(this.state.credentials)
		.then(res => {
			console.log('res', res)
			if(!res.data){
				this.props.history.push('/users');
			}
		})}
	
	render() {
		// console.log('this.props', this.props)
		return (
				<div>
								<form  onSubmit={this.login}>
										<h2  >Rider Login</h2>
										<h4  >No Account?
											<Link
												to="/signup">
												Sign Up
											</Link>
										</h4>
										<input
											id="username"
											placeholder= "username"
											type="text"
											name = 'username'
											onChange={this.handleChange}
											value={this.state.credentials.username}
										/>
										<input
											id="password"
											name = 'password'
											placeholder= "password"
											type="password"
											onChange={this.handleChange}
											value={this.state.credentials.password}
										/>
									
										<button type="submit" color="primary"  >
											{this.props.loggingIn
											? <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
											: "Log in"
											}
										</button>
								</form>
					<div>
						<h2 >
							{!this.state.isEditing && this.props.serverMessage}
						</h2>
					</div>
				</div>
		);
	}
}
const mapStateToProps = (userReducer) => {
	console.log('userReducer',userReducer)
	return {
			// riderLoginStarted:userReducer.riderLoginStarted,
			// serverMessage:userReducer.serverMessage
		
	}
}


export default connect(
	mapStateToProps,
	{ login_rider }
)(RiderLoginPage);
