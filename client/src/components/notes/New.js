import React from 'react'
import NoteForm from './Form'
import axios from 'axios'

class NoteNew extends React.Component {
    
    handleSubmit = (FormData) => {
        axios.post('http://localhost:3015/notes',FormData,
        {   headers: {
            "Content-type": "multipart/form-data"
        }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            } else {
                this.props.history.push('/notes')
            }
        })
        .catch(err=> alert(err))

    }

    render() {
        return (
            <div> 
                <h1>Add Note</h1>
                <NoteForm handleSubmit ={this.handleSubmit}/>
            </div>
           
        )
    }
}
export default NoteNew