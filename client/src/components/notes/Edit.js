import React from 'react'
import axios from 'axios'
import NoteForm from './Form'

class NoteEdit extends React.Component{
    constructor() {
        console.log('edit constructor')
        super()
        this.state = {
            note : {}
        }
    }

    handleSubmit = (FormData) =>{
        axios.put(`http://localhost:3015/notes/${this.props.match.params.id}`,FormData)
        .then(response => {
            const note = response.data
            console.log("note--",note)
            this.props.history.push(`/notes/${note._id}`)
        })
        .catch(err=> alert(err))

    }

    componentDidMount(){
        console.log('edit componentDidMount')
        const id = this.props.match.params.id

        console.log(id)
        
        axios.get(`http://localhost:3015/notes/${id}`)
        .then(response =>{
            const note = response.data
            this.setState({note})
        })
        .catch(err=>{
            console.log(err)
            alert(err)})
    }

    render(){
        console.log('edit render')
        return(
            <div>
                <h2>Edit Note</h2>
                {Object.keys(this.state.note).length}
                {
                    Object.keys(this.state.note).length !=0 && <NoteForm {...this.state.note} handleSubmit = {this.handleSubmit} />
                }
             </div>
        )
    }
}
export default NoteEdit