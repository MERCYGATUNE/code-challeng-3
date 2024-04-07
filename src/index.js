// WRITE TOUR CODE HERE
 const apiURL = 'http://localhost:3000/films'
//fetch the data from server
fetch(apiURL,{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
})
//convert response  to json format
.then((response) => response.json())
.then((data) => {
//adding  the movie  titles in the list

    const allMovieNames = document.querySelector('#films')
    allMovieNames.innerHTML = ''
    data.forEach((title,index) => {
        const movieNamesList = document.createElement('li')
        movieNamesList.innerText = title.title

       //DELETE BUTTON
       let  deleteFilm = document.createElement('button')
       deleteFilm.innerText =  'Delete'
       deleteFilm.addEventListener('click', () =>{
         deleteMovie(title.id)
         movieNamesList.remove()
       })
       movieNamesList.appendChild(deleteFilm)


     function deleteMovie(id){
        fetch (`${apiURL}/${id}`,{
        method: 'DELETE'
       })
       .then(response => {
        if(response.ok){
            //  UPON PRESSING DELETE BUTTON ,RELOAD TO UPDATE NEW 
            location.reload()
        }
        else{
            alert('ERROR DELETING')
        }
 
       })
     }



        //add an eventlistener for when a particular title is selected, the showTitleInfo function is called
        movieNamesList.addEventListener('click', () =>{
          showTitleInfo(title)
        })
        // finally append the names to the list
        allMovieNames.append(movieNamesList)
    //  DISPLAYING THE FIRST MOVIE TITLE
        if(index===0){
            showTitleInfo(title)
        }
    });
})
//function to display the movies

function showTitleInfo(title){
  //SHOW-TITLE INFO CONTAINS ; TITLE,RUNTIMR,FILM-INFO,SHOWTIME,TICKET-NUM AND POSTER. THE INDIVIDUAL 'ID' RETRIEVES THIS INFO
  document.querySelector('#title').innerText = title.title
  document.querySelector('#runtime').innerText = title.runtime
  document.querySelector('#film-info').innerText = title.description
  document.querySelector('#showtime').innerText = title.showtime
  document.querySelector('#ticket-num').innerText = `${title.capacity - title.tickets_sold}`
  document.querySelector('#poster').src = title.poster
}





//Buy Tickets Button
// ADDED AN EVENTLISTENER

 document.querySelector('#buy-ticket').addEventListener('click',() =>{
    let allAvailableTickets = document.querySelector('#ticket-num')
    let availableTickets = parseInt(allAvailableTickets.textContent)

    //   
        if(!isNaN(availableTickets) && availableTickets > 0){
            availableTickets--
            allAvailableTickets.innerText = availableTickets;

            
            
        }
      if(availableTickets===0){
      
        document.querySelector('#buy-ticket').innerText= 'Sold Out'
      } else if (availableTickets >= 0)
          document.querySelector('#buy-ticket').innerText= 'Buy Ticket'

        

      })
      
      
  

 
 

