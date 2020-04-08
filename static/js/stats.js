// Fetches tier data from /api/tiers
// and returns the data.
function fetch_tiers() {
    fetch('/api/tiers')
        .then((tiers) => {
            return JSON.parse(tiers)
        })
}

// Given a number of points and tier data that looks
// like the following
// [ { name: "bronze", points: 250 },
//   { name: "silver", points, 350 },
//   ... ]
// Calculates a message describing the status of the user's points.
function display_msg(total_points, tiers) {
    msg = ""
    next_tier = next_tier(total_points, tiers)
    if (next_tier == null) {

    } else {
        points_left = get_dist_from_next(total_points, tiers)
        msg = "You have " + points_left + "left until " + next_tier + "!"
    }
    document.querySelector("#progress-bar-msg").textContent = msg
}

// Gets the range the user lies between
// Fails when total_points is greater than every tier
function get_range(total_points, tiers) {
    upperbound = null;
    lowerbound = 0;
    tiers.forEach((tier) => {
        if (total_points < tier.points) {
            upperbound = tier.points
            break
        }
    })
    tiers.reverse().forEach((tier) => {
        if (total_points > tier.points) {
            lowerbound = tier.points
            break
        }
    })
    return upperbound - lowerbound
}
//Getting Lowerbound individually
function get_lowerbound(total_points, tiers) {
    lowerbound = 0
    tiers.reverse().forEach((tier) => {
        if (total_points > tier.points) {
            lowerbound = tier.points
            break
        }
    })
    return lowerbound
}

// Gets the range the user lies between
// Returns null if past last tier
function get_dist_from_next(total_points, tiers) {
    tiers.forEach((tier) => {
        if (total_points < tier.points) {
            return tier.points - total_points
        }
    })
    return null
}

// Gets the next tier the user needs to achieve
// Returns null if past last tier
function next_tier(total_points, tiers) {
    tiers.forEach((tier) => {
        if (total_points < tier.points) {
            return tier.name
        }
    })
    return null
}

// Dynamically calculates progress bar percentage
// based on tier data from database.  Then
// displays a message to the user describing the status.
function update_progress_bar() {
    let tiers = fetch_tiers()
    let lowerbound = get_lowerbound(total_points, tiers)
    let Range = get_range(total_points, tiers)
    let percent = ((total_points - lowerbound) / Range * 100)
    let percent_string = "" + percent + "%" 
    progressbar.style.width = percent_string 
}
