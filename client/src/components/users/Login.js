import React from 'react'
import  {connect} from 'react-redux'

import {startSetUser} from '../../actions/users'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password:''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const loginData = {
            email: this.state.email,
            password: this.state.password
        }
         const redirect = () => this.props.history.push('/notes',{headers:{
            'x-auth': localStorage.getItem('authToken')
        }})
         this.props.dispatch(startSetUser(loginData,redirect))
    }

    render(){
        console.log('form render')
        const container = {height: 1300,align:'center',marginTop:'6rem'}
        return (
            <MDBContainer style={container}>
                <MDBRow>
                <MDBCol md="9">
                    <form onSubmit = {this.handleSubmit}>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                        <MDBInput label="Type your email" icon="envelope" group  value = {this.state.email} onChange ={this.handleChange} type="email" name = "email"validate error="wrong"
                        success="right" />
                        <MDBInput label="Type your password" icon="lock" group  value = {this.state.password} onChange ={this.handleChange} type="password" name= "password" validate />
                    </div>
                    <div className="text-center">
                        <MDBBtn type="submit">Login</MDBBtn>
                    </div>
                    </form>
                </MDBCol>
                </MDBRow>
          </MDBContainer>
        )

    }
}
export default connect()(Login)
