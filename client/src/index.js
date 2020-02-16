import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import { startSetCategories } from './actions/category'
import { startSetNotes } from './actions/note'
import { setUser} from './actions/users'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const store = configureStore()

if(localStorage.getItem('authToken')){
    store.dispatch(startSetCategories())
    store.dispatch(startSetNotes())
    
    axios.get('http://localhost:3015/users/account',{
        headers: {
            'x-auth': localStorage.getItem('authToken')
        }
    })
    .then(response=>{
        console.log(response.data)
        store.dispatch(setUser(response.data))
       
        console.log(store.getState())

    })
    .catch(err=>console.log("ERRRRR",err))
}


const ele = <Provider store ={store}>
    <App/>
</Provider>

ReactDOM.render(ele,document.getElementById('root'))