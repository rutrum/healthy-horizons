// Loops through every .task HTML tag in #week-form.  Finds
// the name of each task and the value of each
// input cooresponding to that task.
//
// Returns an object of the following form:
// { vegetables: 0, water: 2, readbook: 0, pitchinforlunch: 1 }
// That is, check boxes should be read as 0 or 1.
function read_form() {
    form = document.querySelector('#week-form')
    tasktags = form.querySelectorAll('.task')
    inputbox = tasktags.querySelector('input')
    let valueDict = {}
    inputbox.forEach((box) => {
        if (box.type == 'number') {
            valueDict[box.name] = box.value
        } else if (box.type == 'checkbox') {
            if (box.checked) {
                valueDict[box.name] = 1
            } else {
                valueDict[box.name] = 0
            }
        }
    })
    return valueDict
}

// Fetches from the /api/task_points route.  Returns that JSON
// object.
function fetch_task_points() {
    fetch('/api/task_points')
        .then(task_points => {
            return JSON.parse(task_points)
        })
}

// Using read_form() and fetch_task_points() calculate
// the total number of points and display the result
// into #total-form-points
function aggregate_form_points() {
    form = read_form()
    task_points = fetch_task_points()
    let total = 0
    form.forEach((task) => {
        let task_value = form[task] * task_points[task]
        total += task_value
    })
    document.querySelector('#total-form-points').textContent = total
}

// Given input like the following:
// { vegetables: 5, water: 2, readbook: 1, pitchinforlunch: 1 }
// populate #week-form with those new values.  This
// requires checking if input box is a checkbox, and checking
// based on 0 or 1.
function write_form(input_values) {
    form = document.querySelector('#week-form')
    tasktags = form.querySelectorAll('.task')
    for (key in input_values) {
        let inputbox = tasktags.querySelector("input[name='"+key+"']").value
        if (inputbox.type == 'number') {
            inputbox.value = input_values[key]
        } else if (inputbox.type == 'checkbox') {
            if (input_values[key] == 1) {
                inputbox.checked = True
            } else {
                inputbox.checked = False
            }
        }
    }
}

// Given the week number and a user id, get all the
// usertasks for each that user on that week.
function fetch_usertasks(user_id, week_num, semester) {
    fetch('/api/usertasks/'+user_id+'/'+week_num+'/'+semester)
        .then((usertasks) => {
            return JSON.parse(usertasks)
        })
}

// Modifies the display property of #week-form
// to make visible to the user.
function unhide_form() {

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
    input_values = fetch_user_tasks(user_id, week_num, semester)
    write_form(input_values)
    aggregate_form_points()
    unhide_form()
}

// Store the value from #total-form-points into 
// #total-points-week-<week_num>
function copy_form_points(week_num) {
    week_points = document.querySelector('#total-form-points')
    document.querySelector('#total-points-week-'+week_num).value = week_points
}

// Modifies the display property of #week-form
// to make invisible to the user.
function hide_form() {

}

// Posts the data given to /api/usertasks/:user_id/:week_num
function post_form_data(user_id, week_num, data) {
    fetch("/api/usertasks/:"+user_id+"/:"+week_num, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(result => { return result })
    
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
    week_num = document.querySelector('#week-num')
    user_id = 0
    post_form_data(user_id, week_num, data)
    copy_form_points(week_num)
    hide_form()
}
