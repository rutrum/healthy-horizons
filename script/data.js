function getLocalFormData() {
    const data = window.localStorage.getItem("formData");
    if (data == {}) {
        // No previous data.  Initialize new form data.
        oneweek = {
            meditationClass = 0

        }
    }
    return data;
}