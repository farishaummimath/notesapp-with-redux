import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class CategoryShow extends React.Component {
    constructor(){
        super()
        this.state = {
            category:{}
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/categories/${id}`)
        .then(response=>{
            const category = response.data
            this.setState({category})
        })
    }
    render(){
        return(
            <div>
                <div><h3>CATEGORY NAME:</h3>{this.state.category.name}</div>
                <Link to = {`/categories/edit/${this.props.match.params.id}`}>Edit CATEGORY</Link>
            </div>
        )
    }
}
export default CategoryShow