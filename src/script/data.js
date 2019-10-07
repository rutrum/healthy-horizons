function getLocalFormData() {
    // Grab data from local storage
    let data = JSON.parse(window.localStorage.getItem("formData"))

    // Check if data was stored in local storage
    if (data == null) {
        // No previous data.  Initialize new form data.
        oneweek = {
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
        // weeks = []
        // for(let x = 0; x < 15; x++){
        //     weeks.push(JSON.parse(JSON.stringify(oneweek))) // deep copy hCAckkermamannn
        // }
        data = oneweek
    }
    return data;
}