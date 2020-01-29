import React from 'react'
import CategoryForm from './Form'
import axios from 'axios'

class CategoryNew extends React.Component {
    
    handleSubmit = (FormData) => {
        axios.post('http://localhost:3015/categories',FormData)
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            } else {
                this.props.history.push('/categories')
            }
        })

    }

    render() {
        return (
            <div> 
                <h1>Add Category</h1>
                <CategoryForm handleSubmit ={this.handleSubmit}/>
            </div>
           
        )
    }
}
export default CategoryNew