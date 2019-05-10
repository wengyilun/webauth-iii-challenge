
import {
	RIDER_SIGNUP_STARTED,
	RIDER_SIGNUP_SUCCESS,
	RIDER_SIGNUP_FAILURE,
	RIDER_LOGIN_STARTED,
	RIDER_LOGIN_SUCCESS,
	RIDER_LOGIN_FAILURE
} from '../actions'

const initialState = {
	riderSignupStarted: false,
	riderLoginStarted: false,
	loggedInUser:null,
	serverMessage:'',
	users:''
}

export const userReducer = (state = initialState, action)=>{
	switch(action.type){
		
		case RIDER_SIGNUP_STARTED:
			return {...state,
				riderSignupStarted:true,
				serverMessage: 'Creating User Account...'
			}
		case RIDER_SIGNUP_SUCCESS:
			return {...state,
				riderSignupStarted:false,
				serverMessage: 'Creating User Account Success'
			}
		case RIDER_SIGNUP_FAILURE:
			console.log('RIDER_SIGNUP_FAILURE', action.payload)
			return {...state,
				riderSignupStarted:false,
				serverMessage:action.payload
			}
		
		case RIDER_LOGIN_STARTED:
			return {...state,
				riderLoginStarted:true,
				serverMessage: 'Logging in...'
			}
		case RIDER_LOGIN_SUCCESS:
			return {...state,
				riderLoginStarted:false,
				loggedInUser: action.payload,
				serverMessage: 'Login Success'
			}
		case RIDER_LOGIN_FAILURE:
			console.log('this.state',action.payload)
			return {...state,
				riderLoginStarted:false,
				serverMessage:action.payload
			}
	}
}
