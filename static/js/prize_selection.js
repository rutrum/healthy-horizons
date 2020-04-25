function create_prizes() {
    let userid = localStorage.getItem('userid')
    let semesterid = localStorage.getItem('semesterid')
    fetch("/api/eligible_prizes/" + userid + "/" + semesterid)
        .then(result => result.json())
        .then(tiers => {
            all = []
            tiers.forEach(tier => {
                let header = document.createElement("h3")
                header.textContent = tier.name + " (" + tier.point + " Points)"
                all.push(header)
                tier.prizes.forEach(prize => {
                    let input = document.createElement("input")
                    input.type = "radio"
                    input.name = tier.id
                    input.value = prize.id

                    let label = document.createElement("label")
                    label.textContent = prize.name
                
                    let wrap = document.createElement("div")
                    wrap.classList.add("prize")
                    wrap.appendChild(input)
                    wrap.appendChild(label)
                    
                    all.push(wrap)
                })
            })

            let list = document.querySelector("#prize-list")
            all.forEach(e => {
                list.appendChild(e)
            })
        })
        .then(load_selected_prizes)
}

function load_selected_prizes() {
    let userid = localStorage.getItem('userid')
    let semesterid = localStorage.getItem('semesterid')
    fetch("/api/submission_prizes/" + userid + "/" + semesterid)
        .then(result => result.json())
        .then(prizeids => {
            console.log(prizeids)
            prizeids.forEach(prizeid => {
                let input = document.querySelector("input[value='" + prizeid.prize_id + "']")
                if (input != null) {
                    input.checked = true
                }
            })
        })
}

document.querySelector("#prize-select").addEventListener("submit", e => {
    e.preventDefault()
    prizes = {};
    [].slice.call(document.querySelectorAll('input[type="radio"]:checked')).forEach(prize => {
        prizes[prize.name] = prize.value
    })
    
    let userid = localStorage.getItem('userid')
    let semesterid = localStorage.getItem('semesterid')
    fetch('/prize-selection/' + userid + '/' + semesterid, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prizes)
    }).then(result => {
        console.log(result)
        window.location.href = "/calendar"
    })
})

create_prizes()
