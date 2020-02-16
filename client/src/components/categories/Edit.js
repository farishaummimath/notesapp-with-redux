import React from 'react'

import {connect} from 'react-redux'

import CategoryForm from './Form'
import { startEditCategory } from '../../actions/category'


class CategoryEdit extends React.Component{
    
    handleSubmit = (category) => {
        const id = this.props.match.params.id

        const redirect = () => this.props.history.push(`/categories`)
        this.props.dispatch(startEditCategory(category,id,redirect))
    }


    render(){
        return (
            <div>
                {this.props.category && (
                    <div>
                         <h2>Edit Category</h2>
                         {this.props.category.name && <CategoryForm category = {this.props.category} handleSubmit = {this.handleSubmit} />}
                    </div>
                )}
               
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        category: state.categories.find(category => category._id == id)
    }
}

export default connect(mapStateToProps)(CategoryEdit)