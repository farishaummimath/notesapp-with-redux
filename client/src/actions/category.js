import axios from "axios"
import { updateNoteCategory } from "./note"

export const setCategory = (categories) => {
    return {
        type: 'SET_CATEGORY',
        payload: categories
    }
}

export const startSetCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3015/categories',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const categories = response.data
            console.log('CATEG',categories)
            dispatch(setCategory(categories))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const addCategory = (category) => {
    return {
        type: 'ADD_CATEGORY',
        payload: category
    }
}

export const startAddCategory = (category) => {
    return (dispatch) => {
        axios.post('http://localhost:3015/categories',category,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.errors){
                alert(response.data.message)
            } else {
                const category = response.data
                dispatch(addCategory(category))
            }
        })
        
    }
}

export const removeCategory = (category) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: category
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3015/categories/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const category = response.data
            dispatch(removeCategory(category))
        })

        .catch(err=>{
            console.log(err)
        })
    }
}

export const editCategory = (category) => {
    return {
            type: 'EDIT_CATEGORY',
            payload: category
    }
}

export const startEditCategory = (category,id,redirect) => {
    return (dispatch) => {
        axios.put(`http://localhost:3015/categories/${id}`,category,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            if (response.data.errors) {
                alert(`${response.data.message}`,"","error")
            } else {
                const category = response.data
                redirect()
                dispatch(editCategory(category))
                dispatch(updateNoteCategory(category))
            }
        })
    }
}