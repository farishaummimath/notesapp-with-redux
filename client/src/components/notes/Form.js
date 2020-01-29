import React from 'react'
import axios from 'axios'

class NoteForm extends React.Component {
    constructor(props){
        console.log('form constructor')

        super(props)
        this.state = {
            title : props.title? props.title:'',
            description: props.description?props.description:'',
            category: props.category?props.category._id: '',
            file: props.file?props.file:'',
            categories:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3015/categories')
        .then(response => {
            const categories =response.data
            this.setState({categories})
        })

    }
    handleChange  = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }
    onChangeHandler=e=>{
        this.setState({
            file: e.target.files[0]
        })
        console.log(this.state.file,"---")
        
        
    
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        const formData = {
            title : this.state.title,
            description : this.state.description,
            category : this.state.category
           // file : this.state.file
        }
        const form = new FormData()
        for(let key in formData){
            form.append(key, formData[key])
        }
        
        
        form.append("file", this.state.file)
        // console.log(this.state.file)
        
        console.log(formData)
        this.props.handleSubmit(form)
    }
    render(){
        console.log('form render')

        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor = "name">title</label>
                    <input type = "text" value = {this.state.title} onChange ={this.handleChange} name = "title" id = "title"/><br/>

                    <label htmlFor = "description">description</label>
                    <input type = "text" value = {this.state.description} onChange ={this.handleChange} name = "description" id = "description"/><br/>

                    <label htmlFor = "category">category</label>
                    <select name = 'category' value ={this.state.category} onChange = {this.handleChange}>
                        <option value =''> select </option>
                        {
                            this.state.categories.map((category) => {
                                return (
                                    <option key = {category._id} value = {category._id}>{category.name}</option>
                                )
                            })
                        }
                    </select><br/>
                    <input type="file" name = "file" accept=".png, .jpg" onChange={this.onChangeHandler}/>
                    <input type = 'submit'/>
                </form>
            </div>
        )

    }
}
export default NoteForm