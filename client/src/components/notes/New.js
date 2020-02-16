import React from 'react'
import NoteForm from './Form'
import {connect} from 'react-redux'

import { startAddNote } from '../../actions/note'

class NoteNew extends React.Component {

    
    handleSubmit = (formData) => {
        console.log('New note',formData)
        const redirect = () => this.props.history.push('/notes')
        this.props.dispatch(startAddNote(formData,redirect))

    }

    render() {
        return (
            <> 
                <NoteForm handleSubmit ={this.handleSubmit} title="Add"/>
            </>
           
        )
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}
export default connect(mapStateToProps)(NoteNew)