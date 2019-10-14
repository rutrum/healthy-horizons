# Archive

This is some archived code to be used/referenced in the future.

## Week selection

```html
<form id="week-selection" class="skinny box" >

    <h2 style="font-family:'Times New Roman', Times, serif; font-size: 25px">
        Spring 2019
    </h2>
    <div style="text-align-last: left; padding: 15px 5px">
        <h6 style="font-family:'Times New Roman', Times, serif; font-size: 18px">
            Week of:
        </h6>
    </div>
    <select style="font-family:'Times New Roman', Times, serif; font-size: 16px">
        <option value="1">8/25/2019</option>
        <option value="2">9/1/2019</option>
        <option value="3">9/8/2019</option>
        <option value="4">9/15/2019</option>
        <option value="5">9/22/2019</option>
        <option value="6">9/29/2019</option>
        <option value="7">10/6/2019</option>
        <option value="8">10/13/2019</option>
        <option value="9">10/20/2019</option>
        <option value="10">10/27/2019</option>
        <option value="11">11/3/2019</option>
        <option value="12">11/10/2019</option>
        <option value="13">11/17/2019</option>
        <option value="14">11/24/2019</option>
        <option value="15">12/1/2019</option>
        <option value="15">12/8/2019</option>
    </select>
    <button type="submit" style="cursor:pointer">
        Show
    </button>
</form>
```

```js
// Update week
const weekForm = document.querySelector('#week-selection')
weekForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const week = weekForm.querySelector('select').value
    const weekNum = document.querySelector('#week-num')
    weekNum.textContent = week
    fillFormForWeek(week)
})

// This code sends all the information from local storage back to server

    // var conf = confirm("Are you sure that you'd like to submit all points for this semester?")
    // if(conf == true){
    //     // Make new post request and save data from form
    //     var xhr = new XMLHttpRequest()
    //     xhr.open("POST", "home.html", true)
    //     xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
    //     let obj = {jsondata: data}
    //     console.log(JSON.stringify(obj))
    //     xhr.send(JSON.stringify(obj))
    // }

// Filling out the form given the selected week
function fillFormForWeek(week) {
    for (var objective in data[week - 1]) {
        if (data[week - 1].hasOwnProperty(objective)) {
            form.querySelector("input[name='" + objective +"']").value = data[week - 1][objective]
        }
    }
}
```
## Progress bar

```html
<div id="progresstube">
    <div class="bar-step" style="left: 1%">
        <!-- <div class="label-line-silver"></div>
        <p>SILVER</p> -->
    </div>
    <div class="bar-step" style="left: 48%">
        <!-- <div class="label-line-gold"></div>
        <p>GOLD</p> -->
    </div>
    <div class="bar-step" style="left: 70%">
        <!-- <div class="label-line-platinum"></div>
        <p>PLATINUM</p> -->
    </div>
    <div id="progresswater"></div>
</div>
```

```css
#progresstube {
    background: var(--secondary-clr);
    border-radius: 13px;
    height: 20px;
    width: 100%;
    padding: 3px;
}


#progresswater {
    position:inherit;
    content: '';
    display: block;
    background: var(--main-clr);
    width: 50%; /* THIS IS THE ACTUAL PROGRESS */
    height: 100%;
    border-radius: 9px;               
}
```

## Login page

```css
#login-form {
    display: block;
    margin: auto;
    width: 300px;
    padding: 10px;
    margin-top: 200px;
}
button {
    width: 100%;
    height: 30px;
    background-color: var(--secondary-clr);
    border: solid var(--secondary-clr) 0;
    color: whitesmoke;
    border-radius: 5px;
    margin-top: 8px;
    cursor: pointer;
}
input[type=text],
input[type=password] {
    margin: 4px 0 8px 0;
    padding: 2px;
    font-size: 14pt;
    width: 100%;
}
```

```html
<div>
    <form id="login-form" class="box" method="POST">
        <img  style="width: 100%; padding: 10px 5px"  src="./resources/logo-transparent.png">
        <label for="email">Email</label>
        <input type="text" name="email" autofocus>
        
        <label for="password">Password</label>
        <input type="password" name="password">
        <div ></div>
        <button name="submit">Login</button>
    </form>
</div>
```