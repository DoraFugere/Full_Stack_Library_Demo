import React, {useState} from "react";

import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label} from 'reactstrap';



const BiblioModal =({toggleModal, ModalOpen, ModalTitleString, ModalActionString, ModalAction, ModalBody,ButonColor}) => {

   
    return(
    <div className="BiblioModal">
        <Modal isOpen={ModalOpen} toggle={toggleModal.bind(this)}>
        <ModalHeader toggle={toggleModal.bind(this)}>{ModalTitleString}</ModalHeader>
        {ModalBody}
        <ModalFooter>
          <Button color="primary" onClick={ModalAction.bind(this)} >{ModalActionString}</Button>
          <Button color="secondary" onClick={toggleModal.bind(this)}>Annuler</Button>
        </ModalFooter>
        </Modal>
        </div>
    )
    
}



export default BiblioModal;