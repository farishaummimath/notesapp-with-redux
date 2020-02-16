import React from 'react'
import {Link}  from 'react-router-dom'
import {connect} from 'react-redux'
import { startAddCategory, startRemoveCategory} from '../../actions/category'
import CategoryForm from './Form'
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBtn } from "mdbreact";

class CategoryList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }
    
    handleRemove =(id)=> {
        const confirmRemove = window.confirm('Are you sure you want to delete?')
        if(confirmRemove){
            this.props.dispatch(startRemoveCategory(id))
        }
    }
    handleSubmit = (category) => {
        this.props.dispatch(startAddCategory(category))
    }
    render(){

   
        return(
            <div>
                <MDBContainer style ={{marginTop:'6rem'}}>
                <h1>Listing Categories</h1>

                <MDBListGroup style={{ width: "50rem" }}>
                    {this.props.categories.map(category=>{
                        return <MDBListGroupItem key ={category._id}>
                            <Link to ={`/categories/${category._id}`}>{category.name}</Link>
                            <Link to ={`/categories/edit/${category._id}`}>
                                <MDBBtn className="float-right"> EDIT </MDBBtn>
                            </Link>
                            <MDBBtn className="float-right" onClick ={()=>{this.handleRemove(category._id)}}> REMOVE </MDBBtn>
                            </MDBListGroupItem>

                        })}
                </MDBListGroup>
                <h3>Add Category</h3>

                <CategoryForm handleSubmit={this.handleSubmit}/>
            </MDBContainer>
            </div>   
            

            
        )
    }


}
const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        user: state.user
    }
}


export default connect(mapStateToProps)(CategoryList)