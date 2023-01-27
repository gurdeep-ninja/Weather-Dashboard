// Assign variable to form #search-form
const searchForm = $("#search-form")

// Assign variable to input field #search-input
const searchInput = $("#search-input")

// Assign variable to div .history
const historyBox = $("#history")

// Assign variables to target Bootstrap modal title & content
const popUp = $("#messageModal")
const popUpTitle = $("#messageModalLabel")
const popUpContent = $(".modal-body")

// Assign variable to store openweathermap.org to store API key
const apiKey = "f08da3f97e0c524e1f401f44d632c947"

// Assign variable for search history (retrieve existing history or create new empty array[] if history is empty)
const searchHistory = JSON.parse(localStorage.getItem('history')) || [];

loadHistory()

// Apply jQuery event on form submission
searchForm.submit(function (event) {

    // assign variable to user input
    const userInput = searchInput.val().trim()

    // Prevent default form functionality 
    event.preventDefault()
    
    // Check if user has entered a city if not show bootstrap modal 
    if (userInput == '') {
        
        // call the popup
        showPopup("Please enter a city")

    } else {

        // showWeather() function
        showWeather(userInput)
    }
    
})


// Function that will display the weather results (takes user input)
function showWeather(userInput){
    
    const queryString = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    updateHistory(userInput)

}


// Function for showing/saving search history
function updateHistory(userInput){

    // Add current search into searchHistory array[]
    searchHistory.push(userInput);

    // Update the localStorage item 'history' with the latest history
    localStorage.setItem('history', JSON.stringify(searchHistory));

    // Refresh the history results
    loadHistory()

}

// function to load the history
function loadHistory(){

    // Clear the historyBox contents before we reload the data
    historyBox.empty()

    if(JSON.parse(localStorage.getItem('history'))){
        // Loop through each history item, create a button and append to the historyBox element
        JSON.parse(localStorage.getItem('history')).forEach(function(element){
            const button = $("<button>").addClass("btn mt-2").text(element).attr("data-city",element)
            historyBox.prepend(button)
        })
    }
}

// function to trigger popup with dynamic messages
function showPopup(message){
    // Set modal title
    popUpTitle.text("Error")
    // Set modal description
    popUpContent.text(message)
    // trigger popup to appear
    popUp.modal("show")
}