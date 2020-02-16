import React from 'react'
import {connect} from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


class NoteForm extends React.Component {
    constructor(props){
        console.log('form constructor')

        super(props)
        this.state = {
            title : props.note? props.note.title:'',
            description: props.note?props.note.description:'',
            category: props.note?props.note.category._id: '',
            photo : props.note ? props.note.photo : null
        }
    }
   
    handleChange  = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }
   
    handleFileChange = (e) => {
        if(e.target.type == 'file') {
            console.log('file change', e.target.files[0])
            this.setState({ photo : e.target.files[0]})
        }
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        console.log(this.state.title)
        const formData = new FormData()
        formData.append('title' , this.state.title)
        formData.append('description' , this.state.description)
        formData.append('category' , this.state.category)  
        formData.append('photo' , this.state.photo)
        console.log(formData)
        this.props.handleSubmit(formData)
    }
    render(){ 
        console.log('Note form render')
        const container = {height: 1300,align:'center',marginTop:'6rem'}

        return (
            <>
                <MDBContainer style={container}>
                    <h1>{this.props.title} Note</h1>
                    <MDBRow>
                        <MDBCol md="6">
                            <form onSubmit = {this.handleSubmit}>
                                <div className="grey-text">
                                    <MDBInput label="title" icon="edit" value ={this.state.title} onChange ={this.handleChange} group type="text" name= "title"  error="wrong"
                                    success="right" />
                                    <MDBInput label="description" icon="sticky-note" group value ={this.state.description} onChange ={this.handleChange} type="textarea" name= "description" validate error="wrong"
                                    success="right" />
                                    <div>
                                        <select name = 'category' value ={this.state.category} className ="browser-default custom-select" onChange = {this.handleChange}>
                                            <option value =''> Choose your category </option>
                                            {
                                                this.props.categories.map((category) => {
                                                    return (
                                                        <option key = {category._id} value = {category._id}>{category.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <br/>
                                    <input
                                            type="file"
                                            id="photo"
                                            name = "photo"
                                            onChange = { this.handleFileChange }
                                           
                                            />
                                    {/* <div className="input-group">
                                        <div className="custom-file">
                                           
                                        </div>
                                    </div> */}
                                </div>
                                <div className="text-center">
                                    <MDBBtn  type ="submit">{this.props.note?'Edit':'Add'}</MDBBtn>
                                </div>
                            </form> 
                        </MDBCol>

                    </MDBRow>
                </MDBContainer>
            </>
        )
        

    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(NoteForm)