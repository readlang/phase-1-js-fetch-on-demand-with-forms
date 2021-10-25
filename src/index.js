//1 - Add event listener which waits for Dom to load.  upon loading, it calls initiate function
document.addEventListener( 'DOMContentLoaded', initiate() );

// 2 - function listens to submit event, and when it fires, it prevents page from reloading (default action)
// it grabs the input and stores it in a variable, it calls JSON lookup function and sends ID variable
function initiate() {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault()
        const input = document.getElementById("searchByID").value;
        serverLookup(input)
    })
}

// 3 - function JSON lookup - fetches JSON, converts Data, calls searchOBJ function
function serverLookup(input) {
    fetch("http://localhost:3000/movies")
    .then( response => response.json() )
    .then( data => searchObj(data, input) )
}

//4 - function to search through data for the right ID variable
//there is a bug in this where the else part doesn't work correctly - maybe else should go first?
function searchObj(data, input) {
    if ( input > data.length ) {    
        alert("Movie ID not found.  Try Again with a lower number.")
    } else {
        for (const iterator of data) {
            if (iterator["id"] === parseInt(input) ){
                addMovie(iterator["title"], iterator["summary"])
                break;
            } 
        }
    }

}

// 5 - Function - add new text to website display 
function addMovie(title, summary) {
    console.log(title, summary)
    const displaySection = document.getElementById("movieDetails")
    const titleSection = displaySection.querySelector("h4")
    const summarySection = displaySection.querySelector("p")

    titleSection.textContent = title
    summarySection.textContent = summary
}
