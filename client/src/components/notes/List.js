import React from 'react'
import axios from 'axios'
import {Link}  from 'react-router-dom'
class NoteList extends React.Component{
    constructor(){
        super()
        this.state ={
            notes : []
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3015/notes')
        .then(response =>{
            const notes = response.data
            this.setState({notes})
        })
        .catch(err => console.log(err))

    }
    handleRemove(id) {
        console.log(id)
        axios.delete(`http://localhost:3015/notes/${id}`)
        .then(response =>{
            console.log("remove",response.data)
            this.setState(prevState => ({
                notes : prevState.notes.filter( note => note._id !== response.data._id)
            }))
        })
        .catch(err => alert(err))
    }

    render(){
        return(
            <div>
                <h1>Listing Notes</h1>
                <ul>
                    {this.state.notes.map(note=>{
                        return <li key ={note._id}><Link to ={`/notes/${note._id}`}>{note.title}</Link> <button onClick ={()=>{this.handleRemove(note._id)}}> REMOVE </button></li>
                    })}
                </ul>
                <Link to='/notes/new'>Add Notes</Link>

            </div>
            
        )
    }

}

export default NoteList