var date_diff = function(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}


var strike = 0;
var last_relapse;
var curr_day = new Date();


function lcSet(name, val) {
    name = JSON.stringify(name);
    val = JSON.stringify(val);
    localStorage.setItem(name, val);
}

function lcGet(name) {
    name = JSON.stringify(name);
    let val = localStorage.getItem(name);
    return JSON.parse(val);
}

function relapse()
{
    var r = confirm("Your strike will be reset. Confirm?");
    if (r == true)
    {
        strike = 0;
        lcSet("lastRelapse", new Date());
        last_relapse = new Date();
        update();
    }
    
}

window.onload = function (){
    if (!lcGet("lastRelapse"))
        lcSet("lastRelapse", new Date());

    last_relapse = new Date(lcGet("lastRelapse"));
    update()
}

var strikeHtml = document.querySelector("#strikeHtml");

function update() {
    var curr_day = new Date();

    strike = date_diff(last_relapse, curr_day)

    if (strike == 1)
        daygrammar = " day"
    else    
        daygrammar = " days"

    strikeHtml.innerHTML = "Your strike is " + strike + daygrammar;

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Last relapse: "+last_relapse);
    console.log("Current day: "+curr_day);
    console.log("Strike: "+strike);
}

var relapeBtn = document.querySelector("#relapseBtn");

relapeBtn.addEventListener("mouseover", function() {
    strikeHtml.innerHTML = "Your strike is 0 days";
    strikeHtml.style = "text-shadow: 2px 2px 0px #CE1010;";
})

relapeBtn.addEventListener("mouseout", function() {
    update();
    strikeHtml.style = "text-shadow: none;";
})