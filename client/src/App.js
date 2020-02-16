import React from 'react'
import {Route,Switch} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

import NoteList from './components/notes/List'
import NoteNew from './components/notes/New'
import NoteEdit from './components/notes/Edit'
import Archive from './components/notes/Archive'
import Bin from './components/notes/Bin'

import CategoryList from './components/categories/List'
import CategoryEdit from './components/categories/Edit'
import CategoryShow from './components/categories/Show'

import Login from './components/users/Login'
import Register from './components/users/Register'
import Home from './components/home/home'
import {startRemoveUser} from './actions/users'


class App extends React.Component{
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            collapse: false,
        };
    }

    onClick =() =>{
        this.setState({
            collapse: !this.state.collapse,
          });
    }
    handleLogout = ()=>{
        this.props.dispatch(startRemoveUser())
    }

    render(){
    
    return (
        <Router>
            <header>
            <MDBNavbar color="black" dark expand="md" scrolling fixed="top">
                <MDBNavbarBrand href="/">
                    <strong>Notes App</strong>
                    {localStorage.getItem('authToken')&&<strong style={{color:'black'}}> Hi,{this.props.user.username}</strong>}
                </MDBNavbarBrand>
                
                
                
                <MDBNavbarToggler onClick={ this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav right>
                    <MDBNavItem active>
                      <MDBNavLink to='/'>Home</MDBNavLink>
                    </MDBNavItem>
                    {localStorage.getItem('authToken') ? (
                     <React.Fragment>

                        <MDBNavItem>
                            <MDBNavLink to='/notes'>Notes</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to='/categories'>Categories</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to='/archived'>Archive</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to='/bin'>Bin</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to='#'onClick = {this.handleLogout}>Logout</MDBNavLink>
                        </MDBNavItem>
                    </React.Fragment>
                    ):(
                        <React.Fragment>
                            <MDBNavItem>
                                <MDBNavLink to='/users/login'>Login</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to='/users/register'>Register</MDBNavLink>
                            </MDBNavItem>
                        </React.Fragment>
                    )}
                  
                </MDBNavbarNav>
                </MDBCollapse>
                </MDBNavbar>
                </header>
                <section>
                <div className="sidenav">
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#clients">Clients</a>
                    <a href="#contact">Contact</a>
                </div>
                </section>
                <Switch>

                    <Route path='/' component={Home} exact={true}/>

                    <Route path='/users/login' component={Login} exact={true}/>
                    <Route path='/users/register' component={Register} exact={true}/>
                    
                    <Route path = "/notes" component={NoteList} exact={true}/>
                    <Route path = "/notes/new" component ={NoteNew} exact ={true}/>
                    <Route path = "/notes/edit/:id" component ={NoteEdit} exact ={true}/>

                    <Route path = "/archived" component ={Archive} exact ={true}/>
                    <Route path = "/bin" component ={Bin} exact ={true}/>



                    <Route path = "/categories" component={CategoryList} exact ={true}/>
                    <Route path = "/categories/edit/:id" component ={CategoryEdit} exact ={true}/>
                    <Route path = "/categories/:id" component={CategoryShow} exact ={true}/>
                </Switch>

        </Router>
    )
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps)(App)