import React from 'react'
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { startRemoveNote,startEditNote, startBinNote } from '../../actions/note'
import { MDBContainer,MDBIcon,MDBRow,MDBBadge,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { CirclePicker } from 'react-color'



class Bin extends React.Component {

    constructor(props){
      console.log('insuide archive')
        super(props)
        this.state = {
            category : {},
            pickerVisible: false ,       
        }
    }
    handleRemove = (id) =>{
        const confirmRemove = window.confirm("Are you sure to delete it permanently?")
        if (confirmRemove) {
            this.props.dispatch(startRemoveNote(id))
        } 
        
    }
    handleColorChange = (note,{hex}) => {
        console.log(note,hex)
        const redirect = () => this.props.history.push('/notes')
        note.color = hex
        this.props.dispatch(startEditNote(note,note._id,redirect))
    }
    onTogglePicker = (id) => this.setState({ pickerVisible: !this.state.pickerVisible })

    handleBin = (note) => {
        this.props.dispatch(startBinNote(note))
    }
    

    findCategory = (id) => {
        return this.props.categories.find(category=>category._id == id)
    }
    render(){
    return (
        <MDBContainer style ={{marginTop:'6rem',height:'30px'}}>
                  <MDBRow>
                    <MDBCol className="mb-lg-0 mb-4">
                        <h2>Bin Notes:{this.props.notes.length}</h2>
                      
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>

                        {this.props.notes.map((note,i)=>{

                            return (
                              
                                <MDBCol lg="3" md="6" className="mb-lg-0 mb-4" key ={note._id}>
                                 
                                 <MDBCard style={{ width: "16rem",backgroundColor :note.color}}>
                                 
                                 <MDBCardImage className="img-fluid" src={`http://localhost:3000/uploads/${note.photo}`} waves />
                                   <MDBCardBody>
                                     <MDBCardTitle>{note.title}</MDBCardTitle>
                                     <MDBCardText>
                                     {note.description}
                                     </MDBCardText>
                                     <MDBCardText>Category:<MDBBadge pill color="light">{note.category.name}</MDBBadge></MDBCardText>
                                     
                                    <MDBRow>
                                         
                                          <MDBCol>
                                            <MDBIcon onClick={()=>{this.handleBin(note)}}icon="dumpster" />
                                          </MDBCol>
                                          <MDBCol>
                                            <MDBIcon icon="palette" onClick={()=> {this.onTogglePicker(note._id)}} />
                                            { this.state.pickerVisible && (
                                              <div style={{ position: 'absolute' }}>
                                              <CirclePicker 
                                              color="#333"
                                              onChange={ (value)=>this.handleColorChange(note,value) }
                                              />
                                              </div>
                                            )}
                                          </MDBCol>
                                          <MDBCol>
                                            <MDBIcon onClick={()=>{this.handleRemove(note._id)}}icon="trash" />
                                          </MDBCol>

                                      </MDBRow>
                                   </MDBCardBody>
                                 </MDBCard>
                                 <br/>
                                 </MDBCol>
                            )

                            })}
                    
                    </MDBRow>

                <br/>
                
                
        </MDBContainer>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        notes : state.notes.filter(note => note.bin== true),
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Bin)