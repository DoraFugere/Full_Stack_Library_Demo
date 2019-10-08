import axios from 'axios';



    function ApiEditBook(BookData){
        axios.put(
        "https://localhost:44306/api/Livres/"+BookData.LivreID,
        BookData,
        {header :{'Content-Type': 'application/x-www-form-urlencoded'}}
        )
    .then(response => {
        console.log(response)
    })
    .then(error => {
        console.log(error)
    }
    )
}

export default ApiEditBook;
