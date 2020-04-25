// Finds #total-points-week-x for all weeks
// and sums them.  Stores the result into
// #total-points.  This also calls progress bar functionality.
// Also shows/hides the select prizes button based on points.
function aggregate_weekly_points() {
    let week_point_spans = document.querySelectorAll(".total-points-week")
    week_point_spans = [].slice.call(week_point_spans)
    let total = week_point_spans.reduce((acc, cur) => { return acc + parseInt(cur.textContent.trim()) }, 0)
    document.querySelector("#total-points").textContent = total
    
    update_progress_bar()

    fetch("/api/select_prizes_lower_bound")
        .then(result => result.json())
        .then(lower => {
            if (total > lower[0].points) {
                document.querySelector("#prize-selection").style.display = "block"
            } else {
                document.querySelector("#prize-selection").style.display = "none"
            }
        })
}

// Adds event listeners to the following tags.
// * Every week edit button (specified to each week)
// * Save changes button
// * Discard changes button
// * Each input button to update points
function add_event_listeners() {

    // Open form with previous data on each weekly edit button
    let weeks = [...document.querySelectorAll(".week-summary")]
    let userid = document.querySelector('#current-user').value
    let semesterid = document.querySelector('#current-semester').value
    weeks.forEach(week => {
        let num = week.querySelector(".week-num").textContent
        week.addEventListener("click", () => show_week_form(userid, num, semesterid))
    })

    // Update points on input field change
    let inputs = [...document.querySelectorAll("#week-form input")]
    inputs.forEach(input => {
        input.addEventListener("change", aggregate_form_points)
    })

    // Save changes to database on submit button
    document.querySelector("#save-changes")
        .addEventListener("click", save_changes)

    document.querySelector("#discard-changes")
        .addEventListener("click", discard_changes)
}

function populate_weekly_points() {
    let userid = document.querySelector('#current-user').value
    let semesterid = document.querySelector('#current-semester').value
    fetch("/api/weekpoints/" + userid + "/" + semesterid)
        .then(results => results.json())
        .then(results => {
            results.forEach(result => {
                console.log(result)
                document.querySelector("#total-points-week-" + result.week).textContent = result.points
            })
            aggregate_weekly_points()
        })
}

populate_weekly_points()
add_event_listeners()
