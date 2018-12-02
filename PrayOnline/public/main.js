autosize(document.querySelectorAll('textarea'));

var config = {
    apiKey: "AIzaSyCS9nhpP4TC_yVTnxQtOR8sUWgSwdaWD7M",
    authDomain: "godprayer64.firebaseapp.com",
    databaseURL: "https://godprayer64.firebaseio.com",
    projectId: "godprayer64",
    storageBucket: "godprayer64.appspot.com",
    messagingSenderId: "204122406377"
};
firebase.initializeApp(config);

var db = firebase.database();
var prayers = db.ref('prayers');

var curNop = 0;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yy = today.getFullYear();

function get(key) {
    return JSON.parse(localStorage.getItem(key))
}

function nextDay() {
    if(get("oldDay") < dd || get("oldMonth") < mm || get("oldYear") < yy)
    {
        return true
    }
    else
    {
        return false
    }
}

window.onload = function () {
    /*
    if(get("nop"))
    {
        console.log("yep")
        curNop = JSON.parse( localStorage.getItem("nop") )

    }
    else
    {
        console.log("nope");
        localStorage.setItem("nop", 0)
    }
    */
}

function addNop() {
    oldNop = get("nop")
    if(oldNop>=4 && nextDay())
    {
        if(!get("oldYear"))
        {
            localStorage.setItem("oldDay", dd)
            localStorage.setItem("oldMonth", mm)
            localStorage.setItem("oldYear", yy)
        }
        alert("Sorry, you are out of prayers for today!")
    }
    else
    {
        console.log("YAyyyyy");
        
        localStorage.setItem("nop", oldNop+1)
        if(oldNop > 4)
        {
            localStorage.setItem("nop", oldNop-3)
        }
    }
}

function gttpR()
{
    //sending to god over gttp reqest
    var prayerEntered = document.getElementById("prayerArea").value;
    prayers.push({
        msg: prayerEntered
    })
    document.getElementById("prayerArea").value = ''
}
