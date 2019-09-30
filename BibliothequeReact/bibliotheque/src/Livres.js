import React, {Component } from 'react';
import axios from 'axios';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label} from 'reactstrap';


const queryString = require('query-string');

class Livres extends Component {
  state = {
    books : [],
    newBookData:{
      Titre : '',
      Auteur : '',
      ISBN : ''
    },
    editBookData:{
      LivreID : null,
      Titre : '',
      Auteur : '',
      ISBN : ''
    },
    searchBookData:{
      Titre:'',
      Auteur:'',
      ISBN:''
    },
    query2:{titre: undefined,
           auteur:undefined,
            isbn :undefined},

    newBookModal: false,
    editBookModal: false,
    searchBookModal:false
  }


// Get call to the rest API
componentDidMount() {
    this._refreshBooks();
}

toggleNewBookModal() {
  this.setState({
    newBookModal : ! this.state.newBookModal
  });
}

toggleEditBookModal(){
  this.setState({
    editBookModal : ! this.state.editBookModal
  });
}

toggleDeleteModal(){
  this.setState({
    deleteModal : ! this.state.deleteModal
  });
}

togglesearchBookModal(){
  this.setState({
    searchBookModal : ! this.state.searchBookModal
  });
}

_refreshBooks(){
  axios.get("https://localhost:44306/api/livres").then((response) => {
    this.setState({
      books: response.data
    })
  });
}

addBook =e => {
    e.preventDefault()
    
      axios.post(
        "https://localhost:44306/api/Livres",
        this.state.newBookData,
        {header :{'Content-Type': 'application/x-www-form-urlencoded'}}
        )
    .then(response => {
      this._refreshBooks()
      console.log(response)
    })
    .then(error => {
      this._refreshBooks()
      console.log(error)
    })
    
    this.setState({ newBookModal : false,  
      newBookData: {Titre : '',
      Auteur : '',
      ISBN : ''}
  })

  

}

editBook(vId, vTitre, vAuteur, vISBN){
  this.setState({
    editBookData : {LivreID : vId, Titre : vTitre, Auteur : vAuteur,ISBN : vISBN},
    editBookModal : ! this.state.editBookModal
  })
  console.log(this.state.editBookData,vId, vTitre, vAuteur, vISBN );
}

updateBook =e => {
  
  e.preventDefault()
  
    axios.put(
      "https://localhost:44306/api/Livres/"+this.state.editBookData.LivreID,
      this.state.editBookData,
      {header :{'Content-Type': 'application/x-www-form-urlencoded'}}
      )
  .then(response => {
    this._refreshBooks()
    console.log(response)
  })
  .then(error => {
    this._refreshBooks()
    console.log(error)
  }
  )
  this.setState({
      editBookModal : ! this.state.editBookModal
  })

  
 
}


deleteBook(Id){
      axios.delete(
        "https://localhost:44306/api/Livres/"+Id
        )
    .then(response => {
      this._refreshBooks()
      console.log(response)
    })
    .then(error => {
      this._refreshBooks()
      console.log(error)
    })
    
}

searchBook(){

let {query2} = this.state;

if (this.state.searchBookData.Titre.trim()!=="")
{
  query2.titre=this.state.searchBookData.Titre;
}

if (this.state.searchBookData.Auteur.trim()!=='')
{
  query2.auteur=this.state.searchBookData.Auteur;
}

if (this.state.searchBookData.ISBN.trim()!=='')
{
  query2.isbn=this.state.searchBookData.ISBN;
}
   

  this.setState({query2});

  axios.get(
    "https://localhost:44306/api/Livres?"+queryString.stringify(this.state.query2)
    )
.then(response => {
  this.setState({
    books: response.data
  })
})
.then(error => {
  console.log(error)
})

this.setState({ searchBookModal : false,  
  searchBookData: {Titre : '',
  Auteur : '',
  ISBN : ''}
})
}

render() {

  let books = this.state.books.map((book) => {
    return(
      <tr key={book.LivreID}>
        <td>{book.LivreID}</td>
        <td>{book.Titre}</td>
        <td>{book.Auteur}</td>
        <td>{book.ISBN}</td>
        <td>
          <Button color ="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.LivreID, book.Titre, book.Auteur, book.ISBN)}>Modifier</Button>
          <Button color ="danger" size="sm" onClick = {this.deleteBook.bind(this, book.LivreID)}>Effacer</Button>
        </td>
      </tr>
    )
  });
  
    return (
      <div>
           <Button color="primary" className="mr-2" onClick={this.toggleNewBookModal.bind(this)}>Ajouter un livre</Button>
                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                  <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Ajouter un livre</ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Titre">Titre</Label>
                      <Input id="Titre" value={this.state.newBookData.Titre} onChange ={(e) => {
                        let {newBookData} = this.state;

                        newBookData.Titre = e.target.value;

                        this.setState({ newBookData});
                      }}/>
                    </FormGroup>

                    <FormGroup>
                      <Label for="Auteur">Auteur</Label>
                      <Input id="Auteur" value={this.state.newBookData.Auteur} onChange ={(e) => {
                        let {newBookData} = this.state;

                        newBookData.Auteur = e.target.value;

                        this.setState({ newBookData});
                        }}/>
                    </FormGroup>

                    <FormGroup>
                    <Label for="ISBN">ISBN</Label>
                    <Input id="ISBN" value={this.state.newBookData.ISBN} onChange ={(e) => {
                      let {newBookData} = this.state;

                      newBookData.ISBN = e.target.value;

                      this.setState({ newBookData});
                    }}/>
                    </FormGroup>
                  
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.addBook.bind(this)}>Ajouter</Button>
                    <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Annuler</Button>
                  </ModalFooter>
                </Modal>
               


                <Button color="warning" onClick={this.togglesearchBookModal.bind(this)}>Rechercher un livre</Button>
                <Modal isOpen={this.state.searchBookModal} toggle={this.togglesearchBookModal.bind(this)}>
                  <ModalHeader toggle={this.togglesearchBookModal.bind(this)}>Rechercher un livre</ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Titre">Titre</Label>
                      <Input id="Titre" value={this.state.searchBookData.Titre} onChange ={(e) => {
                        let {searchBookData} = this.state;

                        searchBookData.Titre = e.target.value;

                        this.setState({ searchBookData});
                      }}/>
                    </FormGroup>

                    <FormGroup>
                      <Label for="Auteur">Auteur</Label>
                      <Input id="Auteur" value={this.state.searchBookData.Auteur} onChange ={(e) => {
                        let {searchBookData} = this.state;

                        searchBookData.Auteur = e.target.value;

                        this.setState({ searchBookData});
                        }}/>
                    </FormGroup>

                    <FormGroup>
                    <Label for="ISBN">ISBN</Label>
                    <Input id="ISBN" value={this.state.searchBookData.ISBN} onChange ={(e) => {
                      let {searchBookData} = this.state;

                      searchBookData.ISBN = e.target.value;

                      this.setState({ searchBookData});
                    }}/>
                    </FormGroup>
                  
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.searchBook.bind(this)}>Rechercher</Button>
                    <Button color="secondary" onClick={this.togglesearchBookModal.bind(this)}>Annuler</Button>
                  </ModalFooter>
                </Modal>
                




                <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                  <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Modifier un livre</ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Titre">Titre</Label>
                      <Input id="Titre" value={this.state.editBookData.Titre} onChange ={(e) => {
                        let {editBookData} = this.state;

                        editBookData.Titre = e.target.value;

                        this.setState({ editBookData});
                      }}/>
                    </FormGroup>

                    <FormGroup>
                      <Label for="Auteur">Auteur</Label>
                      <Input id="Auteur" value={this.state.editBookData.Auteur} onChange ={(e) => {
                        let {editBookData} = this.state;

                        editBookData.Auteur = e.target.value;

                        this.setState({ editBookData});
                        }}/>
                    </FormGroup>

                    <FormGroup>
                    <Label for="ISBN">ISBN</Label>
                    <Input id="ISBN" value={this.state.editBookData.ISBN} onChange ={(e) => {
                      let {editBookData} = this.state;

                      editBookData.ISBN = e.target.value;

                      this.setState({ editBookData});
                    }}/>
                    </FormGroup>
                  
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.updateBook.bind(this)}>Modifier</Button>
                    <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Annuler</Button>
                  </ModalFooter>
                </Modal>

             

                
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Titre</th> 
                <th>Auteur</th>
                <th>ISBN</th>
                <th>Action</th>
              </tr>

              </thead>
              <tbody>
              {books}
              </tbody>
          </Table>
          
        </div>
    );
  }
}

export default Livres;