import axios from 'axios';


    function ApiDeleteBook(LivreID){
        
        axios.delete(
            "https://localhost:44306/api/Livres/"+LivreID
            )
        .then(response => {
          console.log(response)
        })
        .then(error => {
          console.log(error)
        })
}
    

export default ApiDeleteBook;
