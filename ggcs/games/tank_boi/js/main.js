
var assets = new Image(1120,640)

assets.src = "assets/gameasstets.png";

var playerSkin = new Image(255,570)

var curskin = 'boi.png';

var logo = new Image(256,256)

logo.src = "assets/GGCSlogo.png";

playerSkin.src = "assets/skin/"+curskin

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

var upgradeBtn =
{
    x: (cw/2)+(cw/4)-125,
    y: (ch/2)+90,
    w: 250,
    h: 29,
    xpos: 0,
    ypos: 0
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

var upgrades;

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
        saveToLS("highLevel", 0)

    if(!localStorage.coins)
        saveToLS("coins", 0)

    if(!localStorage.destMet)
        saveToLS("destMet", 0)

    if(!localStorage.playSec)
        saveToLS("playSec", 0)

    if(!localStorage.deaths)
        saveToLS("deaths", 0)

    if(!localStorage.shotBul)
        saveToLS("shotBul", 0)

    if(!localStorage.playerHP)
    {
        saveToLS("playerHP", 100)
        boi.maxHp = getFromLS('playerHP');
        boi.health = getFromLS('playerHP');
    }
    else
    {
        boi.maxHp = getFromLS('playerHP');
        boi.health = getFromLS('playerHP');
    }

    if(!localStorage.bulletDamage)
    {
        saveToLS("bulletDamage", 1)
        bulletDamage = getFromLS('bulletDamage');
    }
    else
    {
        bulletDamage = getFromLS('bulletDamage');
    }

    upgrades = 
    {
        health: {cur: getFromLS('playerHP'), cost: 300},
        bullet: {cur: bulletDamage, cost: 250},
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


var sfxVol = 0.1;

var sfxPack = 'sounds/sfx'

var sfx = {
    explosion: new Howl({
        src: [sfxPack+'/explosion.mp3', sfxPack+'/explosion.ogg'],
        volume: sfxVol
    }),
    lazer: new Howl({
        src: [sfxPack+'/flaunch.mp3', sfxPack+'/flaunch.ogg'],
        volume: sfxVol
    }),
    gameover: new Howl({
        src: [sfxPack+'/gameover.mp3', sfxPack+'/gameover.ogg'],
        volume: sfxVol
    })
}



var startScreen = true;
var menuScreen = false;
var settingsScreen = false;
var creditsScreen = false;
var statsScreen = false;
var upgradeScreen = false;
var gameStarted = false;
var gamePaused = true;
var tutorial = false;
var gameoverScreen = false;

boi.y = (ch/2)-(boi.h/2);

var bullets = [];
var meteors = [];
var stars = [];
var comets = [];
var exlosions = [];
var coins = [];


setInterval(function(){
    if(!gamePaused && !boi.dead)
    saveToLS("playSec", getFromLS("playSec")+1000);
},1000)


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
    
    ctx.drawImage(playerSkin, boi.xpos, boi.ypos, 255, 190, boi.x, boi.y, 255, 190)

    if(gameStarted)
    {
        drawMeteors()
        drawComets()
        drawBullets()
        drawCoins()
        drawExpl()
    }

    if(!boi.dead)
            ctx.drawImage(playerSkin, 0, 190, 255, 190, boi.x, boi.y, 255, 190)

    if(!gamePaused)
    {
        updateMeteors()
        updateComets()
        updateBullets()
        updateCoins()
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

    txt('Coins: '+getFromLS("coins"),10,ch-40,35,'white','PressStart2PRegular',2,'start')

    if(menuScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        drawBtn(settingsBtn)
        drawBtn(creditsBtn)
        drawBtn(statsBtn)
        drawBtn(homeBtn)
        drawBtn(upgradeBtn)
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
        txt('meteors destroyed: '+getFromLS('destMet'),(cw/2)+cw/4, (ch/allStats)*2,25,'white','PressStart2PRegular',false,'center')
        txt('seconds plaied: '+getFromLS('playSec')/1000,(cw/2)+cw/4, (ch/allStats)*3,25,'white','PressStart2PRegular',false,'center')
        txt('died: '+getFromLS('deaths'),(cw/2)+cw/4, (ch/allStats)*4,25,'white','PressStart2PRegular',false,'center')
        txt('bullets shot: '+getFromLS('shotBul'),(cw/2)+cw/4, (ch/allStats)*5,25,'white','PressStart2PRegular',false,'center')
    }

    if(upgradeScreen)
    {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(cw/2, 0, cw/2, ch)
        txt('1) health: '+getFromLS('playerHP'),(cw/2)+cw/4, (ch/6), 25,'white','PressStart2PRegular',false,'center')
        txt('UPGRADE: '+upgrades.health.cost,(cw/2)+cw/4, (ch/6)*1.5, 20,'#254bbc','PressStart2PRegular',false,'center')
        txt('2) bullet strength: '+getFromLS('bulletDamage'),(cw/2)+cw/4, (ch/6)*2, 25,'white','PressStart2PRegular',false,'center')
        txt('UPGRADE: '+upgrades.bullet.cost,(cw/2)+cw/4, (ch/6)*2.5, 20,'#254bbc','PressStart2PRegular',false,'center')
        txt("press '1' to upgrade health",(cw/2)+cw/4, (ch/6)*3.5, 20,'white','PressStart2PRegular',false,'center')
        txt("press '2' to upgrade bullets",(cw/2)+cw/4, (ch/6)*4, 20,'white','PressStart2PRegular',false,'center')
        drawBtn(homeBtn)
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
            saveToLS('deaths', getFromLS('deaths')+1)
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

    if(logoTimeout > 0)
    {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,cw,ch)
        logoTimeout-=10
        txt('Gregory Game Creation Studio presents...', cw/2, (ch/2)+150, 20,'white','PressStart2PRegular',false,'center')
        ctx.drawImage(logo, (cw/2)-128, (ch/2)-128)
    }

}, 20)

var allStats = 8;
var logoTimeout = 3500;

}, false);

var updateExplosions;