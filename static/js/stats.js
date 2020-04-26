// Given a number of points and tier data that looks
// like the following
// [ { name: "bronze", points: 250 },
//   { name: "silver", points, 350 },
//   ... ]
// Calculates a message describing the status of the user's points.
function display_msg(total_points, upper, lower) {
    msg = ""
    if (upper == null) {
        msg = "You've surpassed the " + lower.name + " tier!"
    } else {
        let points_left = upper.points - total_points
        msg = "You have " + points_left + " points left until " + upper.name + " tier!"
    }
    document.querySelector("#progress-bar-msg").textContent = msg
}

// Dynamically calculates progress bar percentage
// based on tier data from database.  Then
// displays a message to the user describing the status.
function update_progress_bar() {
    let total_points = document.querySelector("#total-points").textContent
    total_points = parseInt(total_points)
    fetch('/api/tiers')
        .then(response => response.json())
        .then((tiers) => {
            let upper = tiers.find(tier => tier.points > total_points)
            let rev = tiers.slice(0).reverse()
            let lower = rev.find(tier => tier.points <= total_points)

            let percent = 0
            if (lower == null) {
                percent = total_points / upper.points * 100;
            } else if (upper == null) {
                percent = 100
            } else {
                percent = (total_points - lower.points) / (upper.points - lower.points) * 100;
            }

            document.querySelector("#progress-bar").style.width = "" + percent + "%"
            display_msg(total_points, upper, lower)
        })
}
