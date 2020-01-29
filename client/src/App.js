import React from 'react'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'

import NoteList from './components/notes/List'
import NoteNew from './components/notes/New'
import NoteEdit from './components/notes/Edit'
import NoteShow from './components/notes/Show'

import CategoryList from './components/categories/List'
import CategoryNew from './components/categories/New'
import CategoryEdit from './components/categories/Edit'
import CategoryShow from './components/categories/Show'

function App(props){
    return (
        <BrowserRouter>
            <h1>Notes App</h1>
            <Link to ='/notes'>Notes</Link> <br/>
            <Link to ='/categories'>Categories</Link>
            <Switch>
                <Route path = "/notes" component={NoteList} exact={true}/>
                <Route path = "/notes/new" component ={NoteNew} exact ={true}/>
                <Route path = "/notes/edit/:id" component ={NoteEdit} exact ={true}/>
                <Route path = "/notes/:id" component={NoteShow} exact ={true}/>

                <Route path = "/categories" component={CategoryList} exact ={true}/>
                <Route path = "/categories/new" component ={CategoryNew} exact ={true}/>
                <Route path = "/categories/edit/:id" component ={CategoryEdit} exact ={true}/>
                <Route path = "/categories/:id" component={CategoryShow} exact ={true}/>
            </Switch>

        </BrowserRouter>
    )
}
export default App