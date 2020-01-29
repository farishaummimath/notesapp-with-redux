import React from 'react'
import axios from 'axios'
import CategoryForm from './Form'

class CategoryEdit extends React.Component{
    constructor() {
        console.log('edit constructor')
        super()
        this.state = {
            category : {}
        }
    }

    handleSubmit = (FormData) =>{
        axios.put(`http://localhost:3015/categories/${this.props.match.params.id}`,FormData)
        .then(response => {
            const category = response.data
            console.log("categ--",category)
            this.props.history.push(`/categories/${category._id}`)
        })
        .catch(err=> alert(err))

    }

    componentDidMount(){
        console.log('edit componentDidMount')
        const id = this.props.match.params.id

        console.log(id)
        
        axios.get(`http://localhost:3015/categories/${id}`)
        .then(response =>{
            const category = response.data
            this.setState({category})
        })
        .catch(err=>{
            console.log(err)
            alert(err)})
    }

    render(){
        console.log('edit render')
        return(
            <div>
                <h2>Edit Category</h2>
                {
                    Object.keys(this.state.category).length !=0 && <CategoryForm {...this.state.category} handleSubmit = {this.handleSubmit} />
                }
             </div>
        )
    }
}
export default CategoryEdit