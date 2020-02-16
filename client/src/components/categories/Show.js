import React from 'react'
import { MDBContainer,MDBIcon,MDBBtn,MDBRow,MDBBadge,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


import {connect} from 'react-redux'
import axios from 'axios'


class CategoryShow extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                notes: []
            }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/categories/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const category = response.data
                axios.get('http://localhost:3015/notes',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                .then(response=>{
                    const notes = response.data
                    console.log("notes",notes)
                    const categNotes = notes.filter(note=>note.category._id == category._id)
                    this.setState({notes : categNotes})
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render(){
        const container = {height: 1300,align:'center',marginTop:150}

        return (

            <MDBContainer style = {container}>

                 {this.props.category && (
                        <>
                        <h1 className="mb-5">{this.state.notes.length} notes  under category {this.props.category.name} </h1>
                        <MDBRow>
                            {this.state.notes.map(note=>{
                                return (
                                    <MDBCol lg="3" md="6" className="mb-lg-0 mb-4" key={note._id}>
                                        <MDBCard style={{ width: "13rem", height: 'auto' }}>
                                            <MDBCardBody>
                                                <MDBCardTitle>{note.title}</MDBCardTitle>
                                                <MDBCardText> {note.description}</MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                )
                                }
                            )}
                        </MDBRow>
                        </>
                        )
                }
                        </MDBContainer>

                
        )
    }
}

const mapStateToProps = (state,props) => {
    const id =  props.match.params.id
    return {
        category: state.categories.find(category=>category._id == id)
    }
}

export default connect(mapStateToProps)(CategoryShow)