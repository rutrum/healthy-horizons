// Update week
const weekForm = document.querySelector('#week-selection')
// weekForm.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const week = weekForm.querySelector('select').value
//     const weekNum = document.querySelector('#week-num')
//     weekNum.textContent = week
//     fillFormForWeek(week)
// })

// Populate the form with data
let data = getLocalFormData()
const form = document.querySelector('#points')

// Submit points
const pointsForm = document.querySelector('#points')
pointsForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // Sends user to final page
    window.location.href = "./final.html"
    // var conf = confirm("Are you sure that you'd like to submit all points for this semester?")
    // if(conf == true){
    //     // Make new post request and save data from form
    //     var xhr = new XMLHttpRequest()
    //     xhr.open("POST", "home.html", true)
    //     xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
    //     let obj = {jsondata: data}
    //     console.log(JSON.stringify(obj))
    //     xhr.send(JSON.stringify(obj))
    // }
})

function fillFormForWeek(week) {
    for (var objective in data[week - 1]) {
        if (data[week - 1].hasOwnProperty(objective)) {
            form.querySelector("input[name='" + objective +"']").value = data[week - 1][objective]
        }
    }
}

function saveData() {
    console.log()
    for (var objective in data) {
        if (data.hasOwnProperty(objective)) {
            data[objective] = form.querySelector("input[name='" + objective +"']").value
        }
    }
    window.localStorage.setItem("formData", JSON.stringify(data))

    let pointvals = {
        meditationClass: 1,
        fruits: 1,
        noSugaryDrinks: 1,
        fitnessClass: 1,
        homeLunch: 1,
        parkFar: 1,
        sleep: 1,
        upstairsBathroom: 1,
        seatbelt: 0,
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
    
    console.log(pointvals, data)
    for (var objective in data) {
        if (data.hasOwnProperty(objective)) {
            data[objective] = form.querySelector("input[name='" + objective +"']").value
        }
    }
    // Update point values
    let points = 100;

    document.querySelector("#point-total").textContent = points

}

function saveOnTimeout() {
    setTimeout(function () {
        saveData()
        saveOnTimeout()
    }, 1000)
}

saveOnTimeout()