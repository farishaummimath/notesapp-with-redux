import React from 'react'

import {connect} from 'react-redux'

import NoteForm from './Form'
import { startEditNote } from '../../actions/note'


class NoteEdit extends React.Component{
    
    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        console.log(formData)
        const redirect = () => this.props.history.push('/notes')
        this.props.dispatch(startEditNote(formData,id,redirect))
    }


    render(){
        console.log('render edit')
        return (
            <div>
                {this.props.note && (
                            <>
                         {this.props.note.title && <NoteForm note = {this.props.note} title="Update" handleSubmit = {this.handleSubmit} />}
                         </>
                )}
               
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        note: state.notes.find(note => note._id == id)
    }
}
export default connect(mapStateToProps)(NoteEdit)
