import React, {useState} from "react";

import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label} from 'reactstrap';



const BookModal =({BookData}) => {
    return(
        <div className = "BookModal">
        <ModalBody>
        <FormGroup>
          <Label for="Titre">Titre</Label>
          <Input id="Titre" placeholder={BookData.Titre} onChange ={(e) => {

        BookData.Titre = e.target.value;
           
           
         
          }}/>
        </FormGroup>

        <FormGroup>
          <Label for="Auteur">Auteur</Label>
          <Input id="Auteur"  placeholder={BookData.Auteur} onChange ={(e) => {
              BookData.Auteur = e.target.value;
    
            }}/>
        </FormGroup>

        <FormGroup>
        <Label for="ISBN">ISBN</Label>
        <Input id="ISBN" placeholder={BookData.ISBN} onChange ={(e) => {
                BookData.ISBN = e.target.value;
        }}/>
        </FormGroup>
      
      </ModalBody>
      </div>
    )
    
}

export default BookModal;