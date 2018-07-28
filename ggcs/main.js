var gamesTab = document.getElementById('games')

var updatesTab = document.getElementById('updates')

var aboutTab = document.getElementById('about')

function openGames(){
    gamesTab.style.display = 'block';
    updatesTab.style.display = 'none';
    aboutTab.style.display = 'none';
}

function openUpdates(){
    gamesTab.style.display = 'none';
    updatesTab.style.display = 'block';
    aboutTab.style.display = 'none';
}

function openAbout(){
    gamesTab.style.display = 'none';
    updatesTab.style.display = 'none';
    aboutTab.style.display = 'block';
}