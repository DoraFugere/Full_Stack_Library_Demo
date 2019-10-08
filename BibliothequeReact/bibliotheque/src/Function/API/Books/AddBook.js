import axios from 'axios';


    function ApiAddBook(BookData){
        
        
    axios.post(
        "https://localhost:44306/api/Livres",
        BookData,
        {header :{'Content-Type': 'application/x-www-form-urlencoded'}}
        )
    .then(response => {
        console.log(response)
    })
    .then(error => {
        console.log(error)
    })
}
    

export default ApiAddBook;

