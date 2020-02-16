const notesReducer = (state=[],action) => {
    switch(action.type){
        case 'SET_NOTE': return [].concat(state,action.payload)

        case 'REMOVE_NOTE': return state.filter(note=>{
            return note._id != action.payload._id
        })

        case 'ADD_NOTE' : return [...state,action.payload]

        case 'EDIT_NOTE': return state.map(note=>{
                    if(note._id == action.payload._id){
                        return Object.assign({},note,action.payload)
                    } else {
                        return Object.assign({},note)
                    }
        })

        case 'UPDATE_NOTE_CATEGORY': {
            return state.map(note => {

                if(note.category._id == action.payload._id) {
                    note.category = action.payload._id 
                    return {...note}
                } else {
                    return {...note}
                }
            })
        }

        case 'PIN_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload._id){
                    return Object.assign({},note,action.payload)
                } else {
                    return Object.assign({},note)
                }
            })
        }
        case 'ARCHIVE_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload) {
                    return action.payload
                } else {
                    return note
                }
            })
        }
        case 'BIN_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload._id) {
                    return note
                } else {
                    return note
                }
            })
        }
        default: return [...state]
    }
}

export default notesReducer