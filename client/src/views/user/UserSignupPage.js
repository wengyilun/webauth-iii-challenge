import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import { signup_rider } from '../../actions';
import {Link} from "react-router-dom";
import styled from "styled-components";
import AccountIcon from "@material-ui/icons/PermIdentity";
import PasswordIcon from "@material-ui/icons/Lock";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

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
		background-color:#efefef;
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
                <PanelSmall >
                     <h1 >Sign Up</h1>
                                <CustomForm  onSubmit={this.signup}>
                                        <h2 > Already Sign Up?
                                            <Link
                                                to="/signin">
                                                Login
                                            </Link>
                                        </h2>
                                        <label>
                                            <AccountIcon/>
                                            <input
                                                id="Useraname"
                                                    onChange = {this.handleChange}
                                                    value = {this.state.profile.username}
                                                    placeholder = "Useraname"
                                                    name = 'username'
                                                    type = "text"
                                            />
                                        </label>
                                        <label>
                                            <PasswordIcon/>
                                            <input
                                                onChange = {this.handleChange}
                                                value = {this.state.profile.password}
                                                placeholder = "Password"
                                                name = 'password'
                                                type = "text"
                                                id="password"
                                            />
                                        </label>
                                        <label>
                                            <PhoneIcon/>
                                            <input
                                                onChange = {this.handleChange}
                                                value = {this.state.profile.phone}
                                                placeholder = "Cell phone"
                                                name = 'phone'
                                                type = "text"
                                                id="cellphone"
                                            />
                                        </label>
                                        <label>
                                            <EmailIcon/>
                                                <input
                                                    onChange = {this.handleChange}
                                                    value = {this.state.profile.email}
                                                    placeholder = "Email"
                                                    name = 'email'
                                                    type = "text"
                                                    id="email"
                                                />
                                        </label>
                                        <div >
                                            <button type="submit" color="primary">
                                                {this.props.loggingIn
                                                    ? <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
                                                    : "Sign up"
                                                }
                                            </button>
                                        </div>
                                    </CustomForm>
                            <div>
                                <h2>
                                   {!this.state.isEditing && this.props.serverMessage}
                                </h2>
                            </div>
                </PanelSmall>
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
