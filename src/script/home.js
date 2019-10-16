// Populate the form with data
let data = getLocalFormData()

<<<<<<< HEAD
// Check for change in points

// Submit points
=======
// When user submits form, redirect to another page
>>>>>>> fbfce1348b3f3dd7d090115ebf0a2e76edf48fd4
const pointsForm = document.querySelector('#points')
pointsForm.addEventListener('change' , (event) => {

})
pointsForm.addEventListener('submit', (event) => {
    // Stop page from reloading (default)
    event.preventDefault()

    // Sends user to final page
    window.location.href = "./final.html"
})

<<<<<<< HEAD
// function fillFormForWeek(week) {
//     for (var objective in data[week - 1]) {
//         if (data[week - 1].hasOwnProperty(objective)) {
//             form.querySelector("input[name='" + objective +"']").value = data[week - 1][objective]
//         }
//     }
// }

function saveData() {
    console.log()
    // for (var objective in data) {
    //     if (data.hasOwnProperty(objective)) {
    //         data[objective] = form.querySelector("input[name='" + objective +"']").value
    //     }
    // }
=======
// This function runs every second and serves two purposes:
// * Save the user submitted data to localstorage
// * Update the total number of points and save that to local storage
function saveData() {
    
    // Set data to most recent user entered data
    for (var objective in data) {
        if (data.hasOwnProperty(objective)) {
            data[objective] = form.querySelector("input[name='" + objective +"']").value
        }
    }

    // Save data object to local storage
>>>>>>> fbfce1348b3f3dd7d090115ebf0a2e76edf48fd4
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
    
<<<<<<< HEAD
    console.log()
    var total = 0
    for (var key in pointVals) {
       total = total + (pointVals[key] * data[key]) 
       console.log(total)
       console.log(data[key])
    }

    // Update point values
    let points = 100;
=======
    // Loop over every possible point entry, add up points
    console.log(pointvals, data)
    for (var objective in data) {
        if (data.hasOwnProperty(objective)) {
            data[objective] = form.querySelector("input[name='" + objective +"']").value
        }
    }
>>>>>>> fbfce1348b3f3dd7d090115ebf0a2e76edf48fd4

    // Set #point-total tag to show points
    document.querySelector("#point-total").textContent = points
}

function saveOnTimeout() {
    setTimeout(function () {
        saveData()
        saveOnTimeout()
    }, 1000)
}

saveOnTimeout()