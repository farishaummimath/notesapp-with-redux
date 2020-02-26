import axios from "../config/axios"
export const setNote = (notes) => {
    return {
        type: 'SET_NOTE',
        payload: notes
    }
}

export const startSetNotes = () => {
    return (dispatch) => {
        axios.get('/api/notes',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const notes = response.data
                console.log("Notes",notes)
                dispatch(setNote(notes))
            })
            .catch(err=>{
                console.log(err)
            }) 
    }
}

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        payload: note
    }
}

export const startAddNote = (note,redirect) => {
    return (dispatch) => {
        console.log("Form",note)
        axios.post('/api/notes',note,{
            headers: {
                'x-auth': localStorage.getItem('authToken'),
                'content-type' : 'multipart/form-data'
            }
        })
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(`${response.data.errors}erro`)
            } else {
                const note = response.data
                redirect()
                dispatch(addNote(note))
            }
        })
        
    }
}

export const removeNote = (note) => {
    return {
        type: 'REMOVE_NOTE',
        payload: note
    }
}

export const startRemoveNote = (id) => {
    return (dispatch) => {
        axios.delete(`/api/notes/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const note = response.data
                dispatch(removeNote(note))
            })

            .catch(err=>{
                console.log(err)
            })
    }
}

export const editNote = (note) => {
    return {
            type: 'EDIT_NOTE',
            payload: note
    }
}

export const startEditNote = (note,id,redirect) => {
    return (dispatch) => {
        console.log('edit action',note)
        axios.put(`/api/notes/${id}`,note, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                console.log("Edited",response.data)
                if (response.data.errors) {
                    alert(`${response.data.message}`,"","error")
                } else {
                    const note = response.data
                    dispatch(editNote(note))
                    redirect()

                }
            })
    }
}

export const updateNoteCategory = (category) => {
    return {
        type: 'UPDATE_NOTE_CATEGORY',
        payload: category
    }
}

export const pinNote = (note) => {
    return {
        type : 'PIN_NOTE',
        payload : note
    }
}

export const binNote = (note) => {
    return {
        type : 'BIN_NOTE',
        payload : note
    }
}

export const archiveNote = (note) => {
    return {
        type : 'ARCHIVE_NOTE',
        payload : note
    }
}

export const startPinNote = (note) => {
    note.pinned = !note.pinned
    console.log(note)
    return dispatch => {
        axios.put(`/api/notes/${note._id}`, note, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            dispatch(pinNote(note))
        })
    }
}

export const startBinNote = (note) => {
    note.bin = !note.bin
    return dispatch => {
        axios.put(`/api/notes/${note._id}`, note, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            console.log(note)
            dispatch(binNote(note))
        })
    }
}

export const startArchiveNote = (note) => {
    note.archived = !note.archived
    return dispatch => {
        axios.put(`/api/notes/${note._id}`, note, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            console.log(note)
            dispatch(archiveNote(note))
        })
    }
}