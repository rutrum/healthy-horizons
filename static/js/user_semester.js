function save_user() {
    let userid = document.querySelector("#current-user").value
    localStorage.setItem('userid', userid)
    location.reload();
}

function load_user() {
    let userid = localStorage.getItem('userid')
    document.querySelector('#current-user').value = userid
}

load_user()
document.querySelector('#current-user').addEventListener("change", save_user)

function save_semester() {
    let semesterid = document.querySelector("#current-semester").value
    localStorage.setItem('semesterid', semesterid)
    location.reload();
}

function load_semester() {
    let semesterid = localStorage.getItem('semesterid')
    document.querySelector('#current-semester').value = semesterid
}

load_semester()
document.querySelector('#current-semester').addEventListener("change", save_semester)

