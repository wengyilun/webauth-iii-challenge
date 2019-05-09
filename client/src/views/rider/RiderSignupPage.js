import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import { signup_rider } from '../../actions';
import {Link} from "react-router-dom";

class RiderSingupPage extends React.Component {
    state = {
        profile: {
            username: '',
            password: '',
            phone:'',
            email:'',
            department_id:'1'
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
            profile: {
                ...this.state.profile,
                [e.currentTarget.name]: e.currentTarget.value
            }
        });
    };
    
    signup = e => {
        e.preventDefault()
          this.setState({
            isEditing:false,
        })
        this.props.signup_rider(this.state.profile)
        .then((res) => {
            console.log('res', res)
            if(!res.data){
                this.props.history.push('/signin');
    
            }
        });
    };
    
    render() {
        return (
                <div >
                                <form  onSubmit={this.signup}>
                                        <h2 >Rider Sign Up</h2>
                                        <h4 > Already Sign Up?
                                            <Link
                                                to="/signin">
                                                Login
                                            </Link>
                                        </h4>
                                  
                                        <input
                                            id="Useraname"
                                                onChange = {this.handleChange}
                                                value = {this.state.profile.username}
                                                placeholder = "Useraname"
                                                name = 'username'
                                                type = "text"
                                        />
                                        <input
                                            onChange = {this.handleChange}
                                            value = {this.state.profile.password}
                                            placeholder = "Password"
                                            name = 'password'
                                            type = "text"
                                            id="password"
                                        />
    
                                        <input
                                            onChange = {this.handleChange}
                                            value = {this.state.profile.phone}
                                            placeholder = "Cell phone"
                                            name = 'phone'
                                            type = "text"
                                            id="cellphone"
                                        />
    
                                        <input
                                            onChange = {this.handleChange}
                                            value = {this.state.profile.email}
                                            placeholder = "Email"
                                            name = 'email'
                                            type = "text"
                                            id="email"
                                        />
                                    
                                    <div >
                                        <button type="submit" color="primary">
                                            {this.props.loggingIn
                                                ? <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
                                                : "Sign up"
                                            }
                                        </button>
                                    </div>
                                </form>
                    <div>
                        <h2>
                           {!this.state.isEditing && this.props.serverMessage}
                        </h2>
    
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (userReducer) => {
    return  {
        // riderSignupStarted:userReducer.riderSignupStarted,
        // serverMessage:userReducer.serverMessage
    }
}


export default connect(
    mapStateToProps,
    { signup_rider }
)(RiderSingupPage);
