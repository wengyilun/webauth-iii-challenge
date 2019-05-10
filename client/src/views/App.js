import styled from "styled-components";
import React from "react";
import AccountIcon from "@material-ui/core/SvgIcon/SvgIcon";
import UserLoginPage from "./user/UserLoginPage";
import UserSignupPage from "./user/UserSignupPage";
import UserHomePage from "./user/UserHomePage";
import {Switch, Route, NavLink, withRouter} from "react-router-dom";

const Header = styled.header`
  width: 100%;
  margin:0 auto;
  position:relative;
  margin-bottom: 60px;
  display:flex;
  justify-content:flex-end;
  align-items: center;
 	a, button {
 		background-color: white;
 		text-decoration: none;
		padding: 15px 10px;
		padding-right:40px;
		margin:0 auto;
		font-size: 1.2rem;
		background: #03DAC5;
		width: 100%;
		font-weight: 700;
		color: #444;
		text-align:right;
		z-index:1;
		border-radius:4px;
		display:flex;
  		align-items: center;
		svg{
			margin-right: 20px;
		}
  	}
  }
`;

class App extends React.Component {
	logout = ()=>{
		localStorage.removeItem('token');
		this.props.history.push('/signin');
	}
	render() {
		return (
			<div className="App">
				<Header>
					{
						!localStorage.getItem('token')
							?  (<NavLink to="/signin">
									<AccountIcon/>Login
								</NavLink>)
							: 	(
								
								<button onClick={this.logout}>
									Logout
								</button>)
					}
				
				</Header>
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

export default withRouter(App)

