import React from 'react'
import {Link}  from 'react-router-dom'
import axios from 'axios'


class NotesShow extends React.Component {
    constructor(){
        super()
        this.state = {
            note:{}
        }
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/notes/${id}`)
        .then(response=>{
            const note = response.data
            console.log(note)

            
            let imageStr,base64Flag
            if(note.img.data){
             base64Flag = 'data:image/jpeg;base64,'
             imageStr =this.arrayBufferToBase64(note.img.data.data)
             Object.assign(note,{img :base64Flag + imageStr})
            }
          
            //Object.assign(note,{img :base64Flag + imageStr})
            this.setState({note})
        })
    }
    render(){
        return(
            <div>
                <h3>TITLE:{this.state.note.title}</h3>
                {this.state.note.img && <img src={this.state.note.img} alt="Note image" style={{width:'50%'}}/>}<br/>
                <p>BODY:{this.state.note.description}</p>
                <p>Category:{this.state.note.category && this.state.note.category.name}</p>
                <Link to = {`/notes/edit/${this.props.match.params.id}`}>Edit Note</Link>
            </div>
            
        )
    }
}
export default NotesShow