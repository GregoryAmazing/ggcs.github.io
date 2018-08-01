
document.addEventListener('keydown', function(e){
    if(e.keyCode===83 && !gamePaused)
    {
        goingUp = false;
        goingDown = true;
        tutorial = false;
    }
    
    if(e.keyCode===87 && !gamePaused)
    {
        goingUp = true;
        goingDown = false;
        tutorial = false;
    }

    if(e.keyCode === 57)
    {
        boi.health = 0;
    }

    if(e.keyCode === 48)
    {
        localStorage.clear();
        location.reload();
    }

    if(e.keyCode === 80 && !gamePaused)
    {
        gamePaused = true;
        clearInterval(updateExplosions)
        clearInterval(meteorSpawner)
        clearInterval(cometSpawner)
    } else if (e.keyCode === 79 && gamePaused)
    {
        gamePaused = false;
        updateExplosions = setInterval(updateExpl,50)
        if(curlvl >= 20)
            cometSpawner = setInterval(spawnComet,2000);

        meteorSpawner = setInterval(spawnMeteor, meteorSpeed)
    }
})

document.addEventListener('keyup', function(e) {
    if(e.keyCode==32 && gameStarted && !gamePaused)
    {
        spawnbullet(boi.x,boi.y)
        playSFX("lazer")
    }
    
    if(e.keyCode === 49 && upgradeScreen)
    {
        upgrade('health')
    }

    if(e.keyCode === 50 && upgradeScreen)
    {
        upgrade('bullet')
    }
});

document.addEventListener('keyup', function(e) {
    if(e.keyCode==83)
    {
        goingDown = false;
    }
    
    if(e.keyCode==87)
    {
        goingUp = false;
    }
})

var mouse = 
{
    x: undefined,
    y: undefined,
    w: 1,
    h: 1
}


document.addEventListener('click', function(){
    if(areColiding(playBtn, mouse) && startScreen)
    {
        spawnExplosion(mouse.x-70,mouse.y-70)
        if(!music.backMusic.playing())
            music.backMusic.play();
        startScreen = false;
        gameStarted = true;
        gamePaused = false;
        updateExplosions = setInterval(updateExpl,50)
        meteorSpawner = setInterval(spawnMeteor, meteorSpeed)
        if(getFromLS('visitTime') == 1)
        {
            tutorial = true;
            console.log('Wellcome to Tank Boi!');
        }
    }

    if(areColiding(menuBtn, mouse) && startScreen)
    {
        startScreen = false;
        menuScreen = true;
    }
    if(areColiding(settingsBtn, mouse) && menuScreen)
    {
        settingsScreen = true;
        menuScreen = false;
        settingsDiv.style.display = 'block';
    }
    if(areColiding(creditsBtn, mouse) && menuScreen)
    {
        creditsScreen = true;
        menuScreen = false;
    }
    if(areColiding(statsBtn, mouse) && menuScreen)
    {
        statsScreen = true;
        menuScreen = false;
    }

    if(areColiding(upgradeBtn, mouse) && menuScreen)
    {
        upgradeScreen = true;
        menuScreen = false;
    }

    if(areColiding(homeBtn, mouse) && !startScreen && gamePaused || areColiding(homeBtn, mouse) && !startScreen && gameoverScreen)
    {
        settingsScreen = false;
        gameStarted = false;
        upgradeScreen = false;
        gamePaused = true;
        statsScreen = false;
        menuScreen = false;
        startScreen = true;
        creditsScreen = false;
        boi.dead = false;
        gameoverScreen = false;
        creditsDiv.style.display = 'none';
        settingsDiv.style.display = 'none';
        clearInterval(updateExplosions)
        clearInterval(meteorSpawner)
        clearInterval(cometSpawner)
        deleteAll()
        boi.health = boi.maxHp
        boi.y = (ch/2)-(boi.h/2)
        boi.xpos = 0;
        boi.ypos = 0;
        metCurHP = 4;
        meteorSpeed = 2000
        curlvl = 1;
        lvlscore = 0;
        maxlvlscore = 3;
    }
})

document.addEventListener('mousemove', function(e) {
    mouse.x=e.clientX
    mouse.y=e.clientY

    if(areColiding(playBtn, mouse))
    playBtn.ypos = 216;
    else
    playBtn.ypos = 136;
    
    if(areColiding(menuBtn, mouse))
    menuBtn.xpos = 305;
    else
    menuBtn.xpos = 255;
    
    if(areColiding(settingsBtn, mouse))
    settingsBtn.ypos = 376;
    else
    settingsBtn.ypos = 346;
    
    if(areColiding(creditsBtn, mouse))
    creditsBtn.ypos = 435;
    else
    creditsBtn.ypos = 406;

    if(areColiding(statsBtn, mouse))
    statsBtn.ypos = 410;
    else
    statsBtn.ypos = 381;

    if(areColiding(upgradeBtn, mouse))
    upgradeBtn.ypos = 29;
    else
    upgradeBtn.ypos = 0;

    if(areColiding(homeBtn, mouse))
    homeBtn.xpos = 406;
    else
    homeBtn.xpos = 355;
});

var debug = false,
    showSpecs = false,
    superAct = false,
    superMode = undefined;

var
    goingUp = false,
    goingDown = false,
    lockDown = false,
    lockUp = false;
