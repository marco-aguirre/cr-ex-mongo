const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')


update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-type': 'application/json'}, //tells the server we're sending JSON
        body: JSON.stringify({                          //converts data sent with the body property into JSON
            name: 'Darth Vader',                                        //have to teach our server to accept JSON by adding the body-parsers's JSON middleware in server.js
            quote: 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {                                      //handles the response from the server (because fetch returns a promise)
        if(res.ok) return res.json()
    })
    .then(response => {                                 //gets the resonse from the server
        window.location.reload(true)                    //reloads the browser page upon response
    })
})

deleteButton.addEventListener('click', _ =>{
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
        
    })
    .then(response => {
        if (response === "No quote to delete") {
            messageDiv.textContent = 'No Darth Vader quote to delete.'
        } else{
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})