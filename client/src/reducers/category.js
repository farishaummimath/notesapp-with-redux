const categoriesReducer = (state=[],action) => {
    switch(action.type){
        case 'SET_CATEGORY': return [].concat(state,action.payload)

        case 'REMOVE_CATEGORY': return state.filter(category=>{
            return category._id != action.payload._id
        })

        case 'ADD_CATEGORY' : return [...state,action.payload]

        case 'EDIT_CATEGORY': return state.map(category=>{
            console.log(action.payload)
                    if(category._id == action.payload._id){
                        return Object.assign({},category,action.payload)
                    } else {
                        return Object.assign({},category)
                    }
        })
        default: return [...state]
    }
}

export default categoriesReducer