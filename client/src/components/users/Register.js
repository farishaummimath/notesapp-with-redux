import React from 'react'

import {connect} from 'react-redux'

import {startAddUser} from '../../actions/users'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }
    handleChange =  (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const registerData  = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        console.log(registerData)
        
        const redirect = () => this.props.history.push('/users/login')
        
        this.props.dispatch(startAddUser(registerData,redirect))

    }
    render(){
        const container = {height: 1300,align:'center',marginTop:'6rem'}
        return (
            <MDBContainer style={container}>
            <MDBRow>
              <MDBCol md="6"> 
                <form onSubmit={this.handleSubmit}>
                  <p className="h5 text-center mb-4">Sign up</p>
                  <div className="grey-text">
                    <MDBInput label="Username" icon="user" value ={this.state.username} onChange ={this.handleChange} group type="text" name= "username" validate error="wrong"
                      success="right" />
                    <MDBInput label="Email" icon="envelope" group value ={this.state.email} onChange ={this.handleChange} type="email" name= "email" validate error="wrong"
                      success="right" />
                    <MDBInput label="Your password" icon="lock" group value ={this.state.password} onChange ={this.handleChange} type="password" name = "password" validate />
                  </div>
                  <div className="text-center">
                    <MDBBtn  type ="submit">Register</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )
        
    }
}
export default connect()(Register)