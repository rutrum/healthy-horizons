// Loops through every .task HTML tag in #week-form.  Finds
// the name of each task and the value of each
// input cooresponding to that task.
//
// Returns an object of the following form:
// { vegetables: 0, water: 2, readbook: 0, pitchinforlunch: 1 }
// That is, check boxes should be read as 0 or 1.
function read_form() {
    form = document.querySelector('#week-form')
    inputs = [...form.querySelectorAll('input')]

    let data = {}
    inputs.forEach(input => {
        let id = input.getAttribute("data-id")
        if (input.type == 'number') {
            data[id] = input.value == "" ? 0 : parseInt(input.value)
        } else if (input.type == 'checkbox') {
            if (input.checked) {
                data[id] = 1
            } else {
                data[id] = 0
            }
        }
    })
    return data
}

// Using read_form() calculate
// the total number of points and display the result
// into #total-form-points
function aggregate_form_points() {
    data = read_form()
    fetch('/api/task_points')
        .then(response => { return response.json() })
        .then(task_points => {
            let total = 0
            for (let [id, freq] of Object.entries(data)) {
                total += task_points[id] * freq
            }
            document.querySelector('#total-form-points').textContent = total
        })
}

// Given input like the following:
// { vegetables: 5, water: 2, readbook: 1, pitchinforlunch: 1 }
// populate #week-form with those new values.  This
// requires checking if input box is a checkbox, and checking
// based on 0 or 1.
function write_form(usertasks, weeknum) {
    form = document.querySelector('#week-form')

    form.querySelector("#week-num").textContent = weeknum

    tasktags = [...form.querySelectorAll('.task')]
    tasktags.forEach(task => {
        let input = task.querySelector("input")
        let id = input.getAttribute("data-id")
        if (input.type == 'number') {
            input.value = usertasks[id] == "" ? 0 : usertasks[id]
        } else if (input.type == 'checkbox') {
            input.checked = (usertasks[id] == 1)
        }
    })
}

// Modifies the display property of #week-form
// to make visible to the user.
function unhide_form(week_num) {
    document.querySelector("#week-form").style.display = "flex"
    document.querySelector("#summary").style.display = "none"
}

// Given the week number and user id, perform a variety of
// tasks before unhiding #week-form from the user.  This 
// function should
// 1. Fetch usertasks data
// 2. Write the data to the form
// 3. Aggregate points from the form
// 4. Make the page visible to the user
// This should be done using the functions defined above.
function show_week_form(user_id, week_num, semester) {
    fetch('/api/user_tasks/'+user_id+'/'+week_num+'/'+semester)
        .then(response => { return response.json() })
        .then(usertasks => {
            write_form(usertasks, week_num)
            aggregate_form_points()
            unhide_form(week_num)

            let selected = document.querySelector(".week-selected")
            if (selected != undefined) selected.classList.remove("week-selected")
            document.querySelector(".week-summary[data-week=\"" + week_num + "\"]")
                .classList.add("week-selected")
        })
}

// Store the value from #total-form-points into 
// #total-points-week-<week_num>
function copy_form_points(week_num) {
    week_points = document.querySelector('#total-form-points').textContent
    document.querySelector('#total-points-week-'+week_num).textContent = week_points
}

// Modifies the display property of #week-form
// to make invisible to the user.
function hide_form() {
    document.querySelector("#week-form").style.display = "none"
    document.querySelector("#summary").style.display = "flex"
}

// This function is called when the user presses the save
// changes button on #week-form.  This function should
// 1. Read form data from page
// 2. Post form data
// 3. Update the summary page with new points total
// 4. Hide the form
// This should be done using the functions defined above.
function save_changes() {
    data = read_form()
    week_num = document.querySelector('#form-week-num').textContent
    fetch("/api/user_tasks/"+1+"/"+week_num+"/"+1, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(result => { 
        copy_form_points(week_num)
        aggregate_weekly_points()
        hide_form()

        let selected = document.querySelector(".week-selected")
        if (selected != undefined) selected.classList.remove("week-selected")
    })
}

function discard_changes() {
    hide_form()
    let selected = document.querySelector(".week-selected")
    if (selected != undefined) selected.classList.remove("week-selected")
}
