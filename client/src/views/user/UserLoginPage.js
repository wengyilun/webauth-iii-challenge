import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import { login_rider } from '../../actions';
import {Link} from "react-router-dom";
import styled from "styled-components";
import AccountIcon from "@material-ui/icons/PermIdentity";
import PasswordIcon from "@material-ui/icons/Lock";

const PanelSmall = styled.div`
  width: 500px;
  margin:0 auto;
  margin-top: 20px;
  position:relative;
  display:flex;
  justify-content:center;
  h1 {
  	position:absolute;
    padding: 15px 10px;
    margin:0 auto;
    font-size: 1.4rem;
    background: linear-gradient(to bottom, #6200ee, #3700b3);
    width: 200px;
    top: -20px;
    text-align: center;
    font-weight: 550;
    color: #fff;
    z-index:1;
    border-radius:4px;
  }
`;

const CustomForm = styled.form`
	width: 80%;
	margin: 0 auto;
	padding: 2rem;
	background-color:white;
	font-size: 1.1rem;
	text-align: center;
	
	h2{
	   font-size:1.1rem;
	   color: black;
       background:none;
       padding-top: 2rem;
       a{
       	  font-size:1.1rem;
       	  color: #018786;
       	  padding: 0 20px;
       }
	}
	
	label{
		position: relative;
		display: flex;
		align-items:center;
		margin-bottom: 12px;
		svg{
			display:inline-block;
			position: absolute;
			color: gray;
			left: 10px;
		}
	}
	
	input{
		font-size: 1.1rem;
		outline: none;
		border:none;
		width:100%;
		padding: 10px;
		border-radius: 5px;
		padding-left: 50px;
	}
	
	button{
		font-size: inherit;
		outline: none;
		border:1px solid #03DAC5;
		padding:15px;
		color: #555;
		font-weight:bold ;
		border-radius: 5px;
		background-color: #03DAC5;
		margin-top:20px
		width: 100%;
		cursor: pointer;
		transition: 0.3s;
		box-shadow: 0 9px #eee;
		&:hover{
			background-color: #fff;
			color: #03DAC5;
		}
	}

`;

class UserLoginPage extends React.Component {
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
		return (
				<PanelSmall>
								<h1>Login</h1>
								<CustomForm  onSubmit={this.login}>
										<h2>No Account?
											<Link
												to="/signup">
												Sign Up
											</Link>
										</h2>
										<label>
											<AccountIcon/>
											<input
												id="username"
												placeholder= "username"
												type="text"
												name = 'username'
												onChange={this.handleChange}
												value={this.state.credentials.username}
											/>
										</label>
										<label>
											<PasswordIcon/>
											<input
												id="password"
												name = 'password'
												placeholder= "password"
												type="password"
												onChange={this.handleChange}
												value={this.state.credentials.password}
											/>
										</label>
										<button type="submit" color="primary"  >
											{this.props.loggingIn
											? <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
											: "Log in"
											}
										</button>
								</CustomForm>
						<h2 >
							{!this.state.isEditing && this.props.serverMessage}
						</h2>
				 </PanelSmall>
					
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
)(UserLoginPage);
