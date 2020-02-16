import React from 'react'

import {Link} from 'react-router-dom'


import {connect} from 'react-redux'

import { MDBContainer,MDBIcon,MDBRow,MDBBadge,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { CirclePicker } from 'react-color'

import {startEditNote,startPinNote,startArchiveNote,startBinNote} from '../../actions/note'

class NoteList extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                category : {},
                pickerVisible: false ,    
                pickerNoteId : ''   
            }
        }
        handleColorChange = (note,{hex}) => {
          console.log(note,hex)
          const redirect = () => this.props.history.push('/notes')
          note.color = hex
          this.props.dispatch(startEditNote(note,note._id,redirect))
        }

        onTogglePicker = (id) => this.setState({ pickerVisible: !this.state.pickerVisible, pickerNoteId:id })

       
        handleInputChange = inputName => value => {
            const nextValue = value
            this.setState({
              [inputName]: nextValue
            })
            console.log(this.state)
          }

        findCategory = (id) => {
            return this.props.categories.find(category=>category._id == id)
        }
        handlePin = (note) => {
            this.props.dispatch(startPinNote(note))
        }
    
        handleArchive = (note) => {
           this.props.dispatch(startArchiveNote(note))
        }
    
        handleBin = (note) => {
          this.props.dispatch(startBinNote(note))
        }

    render(){
      const pinned = this.props.notes.filter(note => note.pinned == true)
      const unPinned = this.props.notes.filter(note => note.pinned == false)
        return (

                <MDBContainer style ={{marginTop:'6rem',height:'30px'}}>
                  
                   
                  <MDBRow>
                   
                      <MDBCol className="mb-lg-0 mb-4">
                      {pinned.length!=0 || unPinned.length!=0 ?( <h1>Total notes :{this.props.notes.length}</h1>):<h2>No notes added</h2>}
                     
                      </MDBCol >
                    <MDBCol className="mb-lg-0 mb-4">
                   
                    <Link to ='/notes/new' className="float-right">
                      <MDBIcon icon="plus-circle" size="2x"className="amber-text"></MDBIcon>
                    </Link>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {pinned.length!=0&&<h3>Pinned notes :{pinned.length}</h3>}
                      <hr/>
                    </MDBCol>
                 
                  </MDBRow>
                  <MDBRow>
                      
                 
                        { pinned.map((note,i)=>{
                            console.log("note",note.photo)
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
                                            <MDBIcon icon="thumbtack" onClick={()=>{this.handlePin(note)}} />
                                          </MDBCol>
                                          <MDBCol>
                                          <Link to={`/notes/edit/${note._id}`}><MDBIcon icon="edit" /></Link>
                                          </MDBCol>
                                          
                                          <MDBCol>
                                            <MDBIcon icon="palette" onClick={()=> {this.onTogglePicker(note._id)}} />
                                            {  this.state.pickerVisible && this.state.pickerNoteId  == note._id && (
                                              <div style={{ position: 'absolute' }}>
                                              <CirclePicker 
                                              color="#333"
                                              onChangeComplete={ (value)=>this.handleColorChange(note,value) }
                                              />
                                              </div>
                                            )}
                                          </MDBCol>
                                          <MDBCol>
                                            <MDBIcon onClick={()=>{this.handleArchive(note)}}icon="archive" />
                                          </MDBCol>
                                          <MDBCol>
                                            <MDBIcon onClick={()=>{this.handleBin(note)}}icon="dumpster" />
                                          </MDBCol>
                                          

                                      </MDBRow>
                                   </MDBCardBody>
                                 </MDBCard>
                                 <br/>
                                 </MDBCol>
                            )

                            })}
                    
                    </MDBRow>
                    <MDBRow>
                    <MDBCol>
                      { pinned.length!=0&&<h3>Other notes :{unPinned.length}</h3>}
                    </MDBCol>
                 
                  </MDBRow>
                    <MDBRow>
                        {unPinned.map((note,i)=>{
                            console.log("note",note.photo)
                            return (
                              
                                <MDBCol lg="3" md="6" className="mb-lg-0 mb-4" key ={note._id}>
                                 
                                 <MDBCard style={{ width: "16rem",backgroundColor :note.color}}>
                                 {note.photo && note.photo != ''&& <MDBCardImage className="img-fluid" src={`http://localhost:3000/uploads/${note.photo}`} waves />}
                                   <MDBCardBody>
                                     <MDBCardTitle>{note.title}</MDBCardTitle>
                                     <MDBCardText>
                                     {note.description}
                                     </MDBCardText>
                                     <MDBCardText>Category:<MDBBadge pill color="light">{note.category.name}</MDBBadge></MDBCardText>
                                     
                                    <MDBRow>
                                          
                                          <MDBCol>
                                          <Link to={`/notes/edit/${note._id}`}><MDBIcon icon="edit" /></Link>
                                          </MDBCol>
                                          {/* <MDBCol>
                                            <MDBIcon onClick={()=>{this.handleRemove(note._id)}}icon="trash" />
                                          </MDBCol> */}
                                          <MDBCol>
                                             <MDBIcon icon="thumbtack" onClick={()=>{this.handlePin(note)}}/>
                                          </MDBCol>
                                          
                                          <MDBCol>
                                            <MDBIcon icon="palette" onClick={()=> {this.onTogglePicker(note._id)}} />
                                            {  this.state.pickerVisible && this.state.pickerNoteId  == note._id && (
                                              <div style={{ position: 'absolute' }}>
                                              <CirclePicker 
                                              color="#333"
                                              onChange={ (value)=>this.handleColorChange(note,value) }
                                              />
                                              </div>
                                            )}
                                          </MDBCol>
                                          <MDBCol>
                                            <MDBIcon onClick={()=>{this.handleArchive(note)}}icon="archive" />
                                          </MDBCol>
                                          <MDBCol>
                                            <MDBIcon onClick={()=>{this.handleBin(note)}}icon="dumpster" />
                                          </MDBCol>
                                         

                                      </MDBRow>
                                   </MDBCardBody>
                                 </MDBCard>
                                 <br/>
                                 </MDBCol>
                            )

                            })}
                    
                    </MDBRow>                
                
                
        </MDBContainer>
        )
    }
}


const mapStateToProps = (state) => {
  //let notes =  state.notes.sort((a, b) => a.pinned - b.pinned).filter(note => note.archived == false)
  const notes = state.notes.filter(note => !note.bin).filter(note => !note.archived)

    return {
        notes,
        categories: state.categories
    }
}
console.log(mapStateToProps)
export default connect(mapStateToProps)(NoteList)