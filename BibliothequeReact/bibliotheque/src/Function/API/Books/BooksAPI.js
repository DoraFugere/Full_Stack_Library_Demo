import axios from 'axios';

function AddBook(BookData){
        
        
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


function ReloadBooks(){
    axios.get("https://localhost:44306/api/livres").then((response) => {     
        return response.data;
      });
      
}



export default ReloadBooks;