import React from 'react'

class CategoryForm extends React.Component {
    constructor(props){
        console.log('form constructor')

        super(props)
        this.state = {
            name: props.name?props.name: '',
        }
    }
   
    handleChange  = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }
    render(){
        console.log('form render')

        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor = "name">Category Name</label>
                    <input type = "text" value = {this.state.name} onChange ={this.handleChange} name = "name" id = "name"/><br/>
                    <input type = 'submit'/>
                </form>
            </div>
        )

    }
}
export default CategoryForm