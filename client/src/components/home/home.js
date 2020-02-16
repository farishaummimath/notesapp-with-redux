import React from 'react'
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";


function Home(props){
        return (
     <MDBContainer className="text-center" style ={{marginTop:'6rem'}}>
      <MDBRow>
        <MDBCol>
          <MDBJumbotron>
            <h2 className="h1 display-3">Welcome to Notes App</h2>
            <p className="lead">
               NotesApp is a full stack MERN web application that allows 
            you to create note categories, and 
            perform basic CRUD operations for notes with image upload.

            </p>
            
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
    
export default Home