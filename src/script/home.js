// Update week
const weekForm = document.querySelector('#week-selection')
weekForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const week = weekForm.querySelector('select').value
    const weekNum = document.querySelector('#week-num')
    weekNum.textContent = week
    fillFormForWeek(week)
})

// Populate the form with data
let data = getLocalFormData()
const form = document.querySelector('#points')

// Submit points
const pointsForm = document.querySelector('#points')
pointsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    var conf = confirm("Are you sure that you'd like to submit all points for this semester?")
    if(conf == true){
        // Make new post request and save data from form
        var xhr = new XMLHttpRequest()
        xhr.open("POST", "home.html", true)
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
        let obj = {jsondata: data}
        console.log(JSON.stringify(obj))
        xhr.send(JSON.stringify(obj))
    }
})

function fillFormForWeek(week) {
    for (var objective in data[week - 1]) {
        if (data[week - 1].hasOwnProperty(objective)) {
            form.querySelector("input[name='" + objective +"']").value = data[week - 1][objective]
        }
    }
}

const week = document.querySelector('#week-num').textContent
fillFormForWeek(week)


function saveData() {
    let week = document.querySelector('#week-num').textContent
    console.log()
    for (var objective in data[week - 1]) {
        if (data[week - 1].hasOwnProperty(objective)) {
            data[week - 1][objective] = form.querySelector("input[name='" + objective +"']").value
        }
    }
    window.localStorage.setItem("formData", JSON.stringify(data))
}

function saveOnTimeout() {
    setTimeout(function () {
        saveData()
        saveOnTimeout()
    }, 1000)
}

saveOnTimeout()