// Grabs data about tasks from local storage about user.
// If it does not exist, it creates it.
function getTaskData() {
    
    let tasks = JSON.parse(window.localStorage.getItem("taskTally"))

    if (tasks == null) {
        // No previous data.  Initialize new form data.
        tasks = {
            meditationClass: 0,
            fruits: 0,
            noSugaryDrinks: 0,
            fitnessClass: 0,
            homeLunch: 0,
            parkFar: 0,
            sleep: 0,
            upstairsBathroom: 0,
            seatbelt: 0,
            medications: 0,
            snackForOffice: 0,
            increaseSteps: 0,
            exercise: 0,
            lunchAndLearn: 0,
            read: 0,
            healthyBlog: 0,
            annualConsult: 0,
            annualPhysical: 0
        }
    }

    return tasks;
}

// Save task form into local storage
function saveTaskData(tasks) {
    let asStr = JSON.stringify(tasks)
    window.localStorage.setItem("taskTally", asStr)
}

// Returns points from local storage
function getPoints() {
    return window.localStorage.getItem("totalPoints")
}

// Saves points to local storage
function savePoints(points) {
    window.localStorage.setItem("totalPoints", points)
}
