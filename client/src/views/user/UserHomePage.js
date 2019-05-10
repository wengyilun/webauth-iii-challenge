import React, { createRef, Component } from 'react';
import {get_users} from '../../actions';
import {connect} from 'react-redux'
import styled from "styled-components";
import AccountIcon from "@material-ui/icons/PermIdentity";
import requiresAuth from '../../utils/requiresAuth';


const Wrapper = styled.div`
  width: 500px;
  margin:0 auto;
  margin-top: 20px;
  justify-content:center;
  h1 {
  	text-variant: uppercase;
    padding: 15px 10px;
    margin:0 auto 20px;
    font-size: 2rem;
    top: -20px;
    text-align: center;
    font-weight: 700;
    color: #fff;
    border-radius:4px;
  }
`;

const UserList = styled.ul`
  padding:0;
  margin:0;
  list-style-type:none;
  text-decoration: none;
  li {
    background: #444;
    padding: 10px 20px;
    margin-bottom:20px;
    top: -20px;
    text-align: left;
    font-weight: 550;
    font-weight:bold;
    color: #fff;
    z-index:1;
    border-radius:4px;
    display: flex;
    align-items: center;
    svg{
    	margin-right: 10px;
    }
    span{
    	background-color:#03DAC5;
    	color:#222;
    	padding:10px 20px;
    	border-radius:4px;
    	width: 80%;
    	max-width:80%;
    	margin-left:20px;
    }
  }
`;

class UserHomePage extends Component {
	constructor(){
		super()
		this.inst = ''
	}
	state = {
		startLocation: {
			"coordinates" : [
				77.612257,
				12.934729
			],
			"address" : "239 Harbor way San Francisco, CA"
		},
		endLocation : {
			"coordinates" : [
				77.612257,
				12.934729
			],
			"address" : ""
		},
		showEstimate:false,
		showDriver:false,
		enRoute: false,
		users:[]
	}
	
	componentDidMount() {
		this.props.get_users()
		.then(res => {
			console.log('res', res)
			if(!res.data){
				this.setState({users: res})
				// this.props.history.push('/users');
			}
		})}
	
	handleChange = e => {
		// console.log('e',e)
		this.setState({
			 [e.currentTarget.name]: {
			 	address: e.currentTarget.value
			 }
		});
	};
	
	loadDriverProfile = (driver)=>{
		// console.log('login clicked')
		this.props.getDriversById(driver.driver_id).then(() => {
	    	this.props.history.push(`/drivers/${driver.driver_id}`);
		});
	}
	
	findDriversNearby = (e)=>{
		e.preventDefault()
		const tripRequest = {
			startLocation : this.state.startLocation,
			endLocation : this.state.endLocation,
		}
	
	   localStorage.setItem('tripRequest',   JSON.stringify(tripRequest))
		this.props.findDriversNearby(tripRequest)
			.then(res => {
			this.setState({showDriver: !this.state.showDriver})
			})
	}
	
	cancelTrip = ()=>{
		console.log('cancelling trips')
	}
	
	render() {
		return (
			<Wrapper>
					<h1>{`Welcome to users page`}</h1>
					<UserList>
						{this.state.users && this.state.users.map(el =>{
							return (<li key={el.id}>
										<AccountIcon/>{el.username}
										<span>{el.email}</span>
									</li>)
						})}
					</UserList>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('state', state)
	return {
			...state
		// findNearbyDriverStarted:state.findNearbyDriverStarted,
		// driversNearby: state.driversNearby,
		// submitDriverReviewSuccessMessage:state.submitDriverReviewSuccessMessage
	}
}


export default connect(
	mapStateToProps,
	{ get_users }
)(requiresAuth(UserHomePage));
