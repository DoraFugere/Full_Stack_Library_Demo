import axios from 'axios';


function ApiLoadBooks(myCallback) {

    axios.get("https://localhost:44306/api/livres").then((response) => {     
       

        myCallback(response.data);
      });
      
}

export default ApiLoadBooks;