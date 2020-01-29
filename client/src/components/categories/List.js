import React from 'react'
import axios from 'axios'
import {Link}  from 'react-router-dom'


class CategoryList extends React.Component{
    constructor(){
        super()
        this.state ={
            categories : []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3015/categories')
        .then(response =>{
            console.log(response)
            const categories = response.data
            this.setState({categories})
        })
        .catch(err => console.log(err))

    }

    handleRemove(id){
        axios.delete(`http://localhost:3015/categories/${id}`)
        .then(response=>{
            console.log('Removed')
            this.setState(prevState=>({
                categories : prevState.categories.filter(category=> category._id !== response.data._id)
            }))
        })
        .catch(err => alert(err))

    }
    


    render(){
        return(
            <div>
                <h1>Listing Categories</h1>
                <ul>
                    {this.state.categories.map(category=>{
                    return <li key ={category._id}><Link to ={`/categories/${category._id}`}>{category.name}</Link> <button onClick ={()=>{this.handleRemove(category._id)}}> REMOVE </button></li>

                    })}
                </ul>
                <Link to='/categories/new'>Add Category</Link>
            </div>
            
        )
    }

}

export default CategoryList