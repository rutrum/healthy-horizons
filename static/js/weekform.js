// Loops through every .task HTML tag in #week-form.  Finds
// the name of each task and the value of each
// input cooresponding to that task.
//
// Returns an object of the following form:
// { vegetables: 0, water: 2, readbook: 0, pitchinforlunch: 1 }
// That is, check boxes should be read as 0 or 1.
function read_form() {

}

// Fetches from the /api/task_points route.  Returns that JSON
// object.
function fetch_task_points() {

}

// Using read_form() and fetch_task_points() calculate
// the total number of points and display the result
// into #total-form-points
function aggregate_form_points() {

}

// Given input like the following:
// { vegetables: 5, water: 2, readbook: 1, pitchinforlunch: 1 }
// populate #week-form with those new values.  This
// requires checking if input box is a checkbox, and checking
// based on 0 or 1.
function write_form(input_values) {

}

// Given the week number and a user id, get all the
// usertasks for each that user on that week.
function fetch_usertasks(user_id, week_num) {

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
function show_week_form(user_id, week_num) {

}

// Store the value from #total-form-points into 
// #total-points-week-<week_num>
function copy_form_points(week_num) {

}

// Modifies the display property of #week-form
// to make invisible to the user.
function hide_form() {

}

// Posts the data given to /api/usertasks/:user_id/:week_num
function post_form_data(userid, week_num, data) {

}

// This function is called when the user presses the save
// changes button on #week-form.  This function should
// 1. Read form data from page
// 2. Post form data
// 3. Update the summary page with new points total
// 4. Hide the form
// This should be done using the functions defined above.
function save_changes() {

}
