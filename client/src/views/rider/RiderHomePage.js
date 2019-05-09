import React, { createRef, Component } from 'react';
// import PinkButton from "../../components/Button/PinkButton";
import {connect} from 'react-redux'

class RiderHomePage extends Component {
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
		// const tripRequest = JSON.parse(localStorage.getItem('tripRequest'))
		// if(tripRequest && tripRequest.startLocation){
		// 	const trip = {
		// 		startLocation : tripRequest.startLocation,
		// 		endLocation : tripRequest.endLocation,
		// 	}
		//
		// 	this.props.findDriversNearby(trip)
		// 	.then(res => {
		// 		this.setState({showDriver: !this.state.showDriver})
		// 	})
		// }
	}
	
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
			<div className="map-wrapper ">
				<div id="map-instructions"
					 name="instruction" ref={instruction => this.inst = instruction}>
					<h1>{`Welcome to users page ${JSON.parse(localStorage.getItem("loggedInUser")) || "guest"}`}</h1>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (riderReducer) => (
	{
		// findNearbyDriverStarted:riderReducer.findNearbyDriverStarted,
		// driversNearby: riderReducer.driversNearby,
		// submitDriverReviewSuccessMessage:riderReducer.submitDriverReviewSuccessMessage
	}
)

export default connect(
	mapStateToProps,
)(RiderHomePage);
