
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

prayers.on('child_added', snap => { 
    let prayerText = snap.child('msg').val()
    let paragraph = document.createElement("p")
    let br = document.createElement("br")
    paragraph.innerHTML = prayerText
    document.getElementById("info").appendChild(paragraph)
})