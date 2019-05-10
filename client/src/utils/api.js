import axios from 'axios'
// const getToken = localStorage.getItem('token') || ''

const api = axios.create({
	baseURL: 'http://localhost:5000',
	timeout: 60000,
	headers: {
		authorization: localStorage.getItem('token') || ''
	}
})

// axios.defaults.baseURL = 'http://localhost:5000/api'; // process.env.REACT_APP_API_URL
// axios.interceptors.request.use(
// 	function(requestConfig) {
// 		requestConfig.headers.authorization = localStorage.getItem('token');
//
// 		return requestConfig;
// 	},
// 	function(error) {
// 		return Promise.reject(error);
// 	}
// );
export default api
