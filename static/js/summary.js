// Finds #total-points-week-x for all weeks
// and sums them.  Stores the result into
// #total-points.  This also calls progress bar functionality.
function aggregate_weekly_points() {
    let week_point_spans = document.querySelectorAll(".total-points-week")
    week_point_spans = [].slice.call(week_point_spans)
    let total = week_point_spans.reduce((acc, cur) => { return acc + parseInt(cur.textContent.trim()) }, 0)
    document.querySelector("#total-points").textContent = total
}

// Adds event listeners to the following tags.
// * Every week edit button (specified to each week)
// * Save changes button
// * Discard changes button
// * Each input button to update points
function add_event_listeners() {

    // Open form with previous data on each weekly edit button
    let weeks = [...document.querySelectorAll(".week-summary")]
    weeks.forEach(week => {
        let num = week.querySelector(".week-num").textContent
        week.querySelector(".edit").addEventListener("click", () => show_week_form(1, num, 1))
    })

    // Update points on input field change
    let inputs = [...document.querySelectorAll("#popup input")]
    inputs.forEach(input => {
        input.addEventListener("change", aggregate_form_points)
    })

    // Save changes to database on submit button
    document.querySelector("#submit-form")
        .addEventListener("click", save_changes)
}
aggregate_weekly_points()
add_event_listeners()
