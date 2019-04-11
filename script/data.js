function getLocalFormData() {
    const data = window.localStorage.getItem("formData");
    if (data == {}) {
        // No previous data.  Initialize new form data.
        oneweek = {
            meditationClass = 0,
            fruits = 0,
            noSugaryDrinks = 0,
            fitnessClass = 0,
            homeLunch = 0,
            parkFar = 0,
            sleep = 0,
            upstairsBathroom = 0,
            seatbelt = 0,
            medications = 0,
            snackForOffice = 0,
            increasesteps = 0,
            exercise = 0,
            lunchAndLearn = 0,
            read = 0,
            healthyBlog = 0,
            annualConsult = 0,
            anualPhysical = 0
        }
        weeks = []
        for(let x = 0; x < 15; x++){
            weeks.push(oneweek)
        }
        data = weeks
    }
    return data;
}