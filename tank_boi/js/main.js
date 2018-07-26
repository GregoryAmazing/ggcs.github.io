
var assets = new Image(1120,640)

assets.src = "assets/gameasstets.png";

var boi = 
{
    h: 190,
    w: 255,
    x: 100,
    y: undefined,
    maxHp: 100,
    health: 100,
    dead: false,
    xpos: 0,
    ypos: 0,
    spd: 15,
    ship: undefined,
    body: undefined
}

var playBtn =
{
    x: (cw/2)+(cw/4)-125,
    y: ch-200,
    w: 250,
    h: 80,
    xpos: 255,
    ypos: 136
}

var menuBtn =
{
    x: cw-60,
    y: 10,
    w: 50,
    h: 50,
    xpos: 255,
    ypos: 296,
    vis: true
}

var homeBtn =
{
    x: cw/2,
    y: 10,
    w: 50,
    h: 50,
    xpos: 355,
    ypos: 296
}

var settingsBtn =
{
    x: (cw/2)+(cw/4)-125,
    y: (ch/2)-90,
    w: 250,
    h: 29,
    xpos: 255,
    ypos: 346
}

var creditsBtn =
{
    x: (cw/2)+(cw/4)-125,
    y: (ch/2)-30,
    w: 250,
    h: 25,
    xpos: 255,
    ypos: 406
}

var statsBtn =
{
    x: (cw/2)+(cw/4)-125,
    y: (ch/2)+30,
    w: 250,
    h: 25,
    xpos: 0,
    ypos: 381
}

var mainLogo =
{
    x: (cw/2)+(cw/4)-197,
    y: 100,
    w: 394,
    h: 284,
    xpos: 506,
    ypos: 216
}

var user = {}

user.settings =
{
    music: {on: true, volume: 0.1},
    sfx: {on: true, volume: 0.2}
}

window.onload = function()
{
    if(localStorage.sfxVol && localStorage.musicVol)
    {
        sfxSlider.value = getFromLS("sfxVol")*10
        musicSlider.value = getFromLS("musicVol")*10
        setAllVol()
    }
    if(!localStorage.visitTime)
    {
        saveToLS("visitTime", 1)

    }
    else
        saveToLS("visitTime", getFromLS("visitTime")+1);
    if(!localStorage.highLevel)
    {
        saveToLS("highLevel", 0)
    }
}

var musicVol = 1;

var music = {
    backMusic: new Howl({
        src: ['sounds/music/space.mp3'],
        volume: musicVol,
        loop: true,
        html5: true
    })
}

music.backMusic.on('load', function(){
    music.backMusic.play()
})
var sfxVol = 0.1;

var sfxPack = 'sfx'

var sfx = {
    explosion: new Howl({
        src: ['sounds/'+sfxPack+'/explosion.mp3'],
        volume: sfxVol
    }),
    lazer: new Howl({
        src: ['sounds/'+sfxPack+'/flaunch.mp3'],
        volume: sfxVol
    }),
    gameover: new Howl({
        src: ['sounds/'+sfxPack+'/gameover.mp3'],
        volume: sfxVol
    })
}



var startScreen = true;
var menuScreen = false;
var settingsScreen = false;
var creditsScreen = false;
var statsScreen = false;
var gameStarted = false;
var gamePaused = true;
var tutorial = false;
var gameoverScreen = false;

boi.y = (ch/2)-(boi.h/2);

var bullets = [];
var meteors = [];
var stars = [];
var comets = [];
var exlosions = []


var meteorSpawner;

var starSpawner = setInterval(spawnStar, 20);

var settingsDiv = document.getElementById('settings');

var creditsDiv = document.getElementById('credits');

var sfxSlider = document.getElementById('sfxVol');

var musicSlider = document.getElementById('musicVol');

var gameOverPlaied = false;

assets.addEventListener('load', function() {

updateExpl()

setInterval(function()
{
    /*-----------Clear Canvas---------*/ctx.clearRect(0,0,cw,ch)

    levelUpCheker();

    if(!gamePaused)
    {
        updatePlayer()
    }
    

    updateStars()
    
    ctx.drawImage(assets, boi.xpos, boi.ypos, 255, 190, boi.x, boi.y, 255, 190)

    if(gameStarted)
    {
        drawMeteors()
        drawComets()
        drawBullets();
        drawExpl()
    }

    if(!boi.dead)
            ctx.drawImage(assets, 0, 190, 255, 190, boi.x, boi.y, 255, 190)

    if(!gamePaused)
    {
        updateMeteors()
        updateComets()
        updateBullets();
    }
    

    if(gameStarted)
    {
        boiHP()
        boiScore()
        level()
    }
    if(startScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(playBtn)
        drawBtn(menuBtn)
        ctx.drawImage(assets, mainLogo.xpos, mainLogo.ypos, mainLogo.w, mainLogo.h, mainLogo.x, mainLogo.y, mainLogo.w, mainLogo.h)
    }
    if(menuScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(settingsBtn)
        drawBtn(creditsBtn)
        drawBtn(statsBtn)
        drawBtn(homeBtn)
    }
    if(settingsScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(homeBtn)
    }
    if(creditsScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(homeBtn)
        creditsDiv.style.display = 'block';
    }
    
    if(statsScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(homeBtn)
        txt('highest level: '+getFromLS('highLevel'),(cw/2)+cw/4, (ch/allStats),25,'white','PressStart2PRegular',false,'center')
        txt('meteors destroyed: '+getFromLS('highLevel'),(cw/2)+cw/4, (ch/allStats)*2,25,'white','PressStart2PRegular',false,'center')
        txt('minutes plaied: '+getFromLS('highLevel'),(cw/2)+cw/4, (ch/allStats)*3,25,'white','PressStart2PRegular',false,'center')
        txt('died: '+getFromLS('highLevel'),(cw/2)+cw/4, (ch/allStats)*4,25,'white','PressStart2PRegular',false,'center')
        txt('bullets shot: '+getFromLS('highLevel'),(cw/2)+cw/4, (ch/allStats)*5,25,'white','PressStart2PRegular',false,'center')
    }

    if(boi.dead)
    {
        gameoverScreen = true;
    }

    if(gameoverScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(homeBtn)
        txt('Game Over!', (cw/2)+cw/4, ch/3, 40,'white','PressStart2PRegular',false,'center')
        txt('highest level: '+getFromLS('highLevel'),(cw/2)+cw/4,ch/2,25,'white','PressStart2PRegular',false,'center')
        if(!gameOverPlaied)
        {
            playSFX("gameover")
            gameOverPlaied = true;
        }
        
    }

    if(gamePaused && gameStarted)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(homeBtn)
        txt('Paused', (cw/2)+cw/4, ch/3, 40,'white','PressStart2PRegular',false,'center')
        txt("press 'O' to resume",(cw/2)+cw/4,ch/2,25,'white','PressStart2PRegular',false,'center')
    }

    if(tutorial)
    {
        showTutorial()
    }
}, 20)

var allStats = 6;



}, false);

var updateExplosions;