import axios from 'axios';


const queryString = require('query-string');


function ApiQueryBooks(myCallback, BookData) {
    var query = {titre: undefined,
        auteur:undefined,
         isbn :undefined}

    if (BookData.Titre.trim()!=="")
    {
      query.titre=BookData.Titre;
    }
    
    if (BookData.Auteur.trim()!=='')
    {
      query.auteur=BookData.Auteur;
    }
    
    if (BookData.ISBN.trim()!=='')
    {
      query.isbn=BookData.ISBN;
    }
      
    
      axios.get(
        "https://localhost:44306/api/Livres?"+queryString.stringify(query)
        )
    .then(response => {
      myCallback(response.data)
    })
    .then(error => {
      console.log(error)
    })
}

export default ApiQueryBooks;