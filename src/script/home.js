// Get data from local storage
let data = getTaskData()

let points = getPoints()

// Insert data into input fields on form
const pointsForm = document.querySelector('#points')
for (let objective in data) {
    if (data.hasOwnProperty(objective)) {
        if (data[objective] > 0) {
            pointsForm.querySelector("input[name='" + objective + "']").value = data[objective]
        }
    }
}

// Check for change in points

// Submit points
// When user submits form, redirect to another page
pointsForm.addEventListener('change' , (event) => {
    saveData()
})

pointsForm.addEventListener('submit', (event) => {
    // Stop page from reloading (default)
    event.preventDefault()

    // Sends user to prize page
    if (points < 150)
        window.location.href = "./goback"
    else 
       window.location.href = "./prize"
})

// This function runs every second and serves two purposes:
// * Save the user submitted data to localstorage
// * Update the total number of points and save that to local storage
function saveData() {
    
    // Set data to most recent user entered data
    for (var objective in data) {
        if (data.hasOwnProperty(objective)) {
            let val = pointsForm.querySelector("input[name='" + objective +"']").value
            console.log(val)
            if (val == "") {
                data[objective] = 0
            } else {
                data[objective] = parseInt(val)
            }
        }
    }

    // Save data object to local storage
    window.localStorage.setItem("formData", JSON.stringify(data))

    let pointVals = {
        meditationClass: 1,
        fruits: 1,
        noSugaryDrinks: 1,
        fitnessClass: 1,         
        homeLunch: 1,
        parkFar: 1,
        sleep: 1,
        upstairsBathroom: 1,
        seatbelt: 1,
        medications: 5,
        snackForOffice: 0,
        increaseSteps: 5,
        exercise: 5,
        lunchAndLearn: 25,
        read: 25,
        healthyBlog: 25,
        annualConsult: 50,
        annualPhysical: 50,
    }

    // Set initial points
    let points = 0;
    
    console.log()
    var total = 0
    for (var key in pointVals) {
        if (data[key] > 0) {
            total = total + (pointVals[key] * data[key]) 
        }
    }

    // Set #point-total tag to show points
    document.querySelector("#point-total").textContent = total

    savePoints(total)
}

saveData()