import api from '../utils/api'

export const RIDER_SIGNUP_STARTED = 'RIDER_SIGNUP_STARTED'
export const RIDER_SIGNUP_SUCCESS = 'RIDER_SIGNUP_SUCCESS'
export const RIDER_SIGNUP_FAILURE = 'RIDER_SIGNUP_FAILURE'

export const RIDER_LOGIN_STARTED = 'RIDER_LOGIN_STARTED'
export const RIDER_LOGIN_SUCCESS = 'RIDER_LOGIN_SUCCESS'
export const RIDER_LOGIN_FAILURE = 'RIDER_LOGIN_FAILURE'

export const LOGOUT_USER = 'LOGOUT_USER'


export const signup_rider = (user) => dispatch => {
	console.log('user', user)
	//return api.post('/users', user).then(res => res.data)
	dispatch({type: RIDER_SIGNUP_STARTED})
	// dispatch({type: RIDER_SIGNUP_SUCCESS, payload: res.data})
	return (
		api.post('/api/register', {...user})
		.then(res =>{
			console.log('res', res)
			dispatch({type: RIDER_SIGNUP_SUCCESS, payload: res.data})
			return res.data
		})
		.catch(error => {
			console.log(error)
			dispatch({type: RIDER_SIGNUP_FAILURE, payload: error})
			return error.response
		})
	)
}


export const login_rider = (user) => dispatch => {
	dispatch({type: RIDER_LOGIN_STARTED})
	return (
		api.post('/api/login', {...user})
		.then(res =>{
	
			localStorage.setItem('token', res.data.token)
			console.log('token', res.data.token)
			localStorage.setItem('loggedInUser', JSON.stringify({...res.data}))
			// localStorage.setItem('loggedInUser', JSON.stringify({...res.data}))
			dispatch({type: RIDER_LOGIN_SUCCESS, payload: res.data})
			return res.data
		})
		.catch(err =>{
			console.log('err', err.response)
			if (err.response.status === 401) {
				dispatch({type: RIDER_LOGIN_FAILURE, payload: err.response})
			}
			return err.response
		})
	)
}

export const logoutUser = () => dispatch => {
	localStorage.removeItem('token')
	localStorage.removeItem('loggedInUser')
	dispatch({type: LOGOUT_USER})
}



//
// export const getSmurfByName = (smurf)=>{
// 	return api.get(`/smurfs/${smurf.name}`).then(res => res.data)
// }
//
// export const updateSmurfById = (smurf)=>{
// 	return api.put(`/smurfs/${smurf.id}`, smurf).then(res => res.data)
// }
//
// export const deleteSmurf = (id)=>{
// 	return api.delete(`/smurfs/${id}`).then(res => res.data)
// }
