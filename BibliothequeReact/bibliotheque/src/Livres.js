import React, {Component } from 'react';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label} from 'reactstrap';
import BiblioModal from './Components/Modal/Modal';
import BookModal from './Components/Modal/BookModal';
import ApiAddBook from './Function/API/Books/AddBook';
import ApiDeleteBook from './Function/API/Books/DeleteBook';
import ApiEditBook from './Function/API/Books/EditBook';
import ApiLoadBooks from './Function/API/Books/LoadBooks';
import ApiQueryBooks from './Function/API/Books/QueryBook';




class Livres extends Component {
  state = {
    books : [],

    BookData:{
      LivreID : undefined,
      Titre : '',
      Auteur : '',
      ISBN : ''
    },
 
    query:{titre: undefined,
           auteur:undefined,
            isbn :undefined},

    newBookModal: false,
    editBookModal: false,
    searchBookModal:false,

    
  }


// Get call to the rest API
componentDidMount() {
    ApiLoadBooks(this.myCallback.bind(this))
}

myCallback = (dataFromChild) => {
    this.setState({ books: dataFromChild });
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

togglesearchBookModal(){
  this.setState({
    searchBookModal : ! this.state.searchBookModal
  });
}


addBook = () => {

    ApiAddBook(this.state.BookData)

    ApiLoadBooks(this.myCallback.bind(this));

    this.setState({ newBookModal : false,  
    BookData: {Titre : '',
      Auteur : '',
      ISBN : ''}
  });

  this.setState({ state: this.state });
  this.forceUpdate();
}



editBook(vId, vTitre, vAuteur, vISBN){
  this.setState({
    BookData : {LivreID : vId, Titre : vTitre, Auteur : vAuteur,ISBN : vISBN},
    editBookModal : ! this.state.editBookModal
  })
 
}

updateBook(){
  ApiEditBook(this.state.BookData);

  ApiLoadBooks(this.myCallback.bind(this));

  {this.toggleEditBookModal();}


  this.setState({  
    BookData: { LivreId : undefined,
      Titre : '',
      Auteur : '',
      ISBN : ''}
  });
}


deleteBook(LivreId){
    ApiDeleteBook(LivreId);
    
    ApiLoadBooks(this.myCallback.bind(this));
}

searchBook(){
       ApiQueryBooks(this.myCallback.bind(this), this.state.BookData) 

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
          <Button color = "primary" className="mr-2" onClick={this.toggleNewBookModal.bind(this)}>Ajouter un Livre</Button>
          <Button color = "warning" className="mr-2" onClick={this.togglesearchBookModal.bind(this)}>Rechercher un Livre</Button>


                
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
          

          <BiblioModal 
            toggleModal    = {() =>  this.toggleNewBookModal()}
            ModalOpen = {this.state.newBookModal}
            ModalTitleString = {"Ajouter un Livre"}
            ModalActionString = {"Ajouter"}
            ModalAction = {() => this.addBook()}
            ModalBody = {<BookModal BookData = {this.state.BookData}/>}
         ></BiblioModal>

        <BiblioModal 
            ButonColor = "Primary"
            toggleModal    = {() =>  this.toggleEditBookModal()}
            ModalOpen = {this.state.editBookModal}
            ModalTitleString = {"Modifier un Livre"}
            ModalActionString = {"Modifier"}
            ModalAction = {() => this.updateBook()}
            ModalBody = {<BookModal BookData = {this.state.BookData}/>}
         ></BiblioModal>

        <BiblioModal 
            ButonColor = "Warning"
            toggleModal    = {() =>  this.togglesearchBookModal()}
            ModalOpen = {this.state.searchBookModal}
            ModalTitleString = {"Rechercher un livre"}
            ModalActionString = {"Rechercher"}
            ModalAction = {() => this.searchBook()}
            ModalBody = {<BookModal BookData = {this.state.BookData}/>}
         ></BiblioModal>

        </div>
    );
  }
}

export default Livres;