function spawnbullet(bulx, buly)
{
    bullets.push(
    {
        x: bulx+160,
        y: buly+131,
        spd: Math.floor(Math.random() * 30) + 20,
        w: 78,
        h: 17,
        health: 1,
        damage: bulletDamage
    })
    saveToLS("shotBul", getFromLS("shotBul")+1);
}

var bulletDamage = 1;


//---------------------------------------------------------------------------------------------------

var metCurHP = 4;

function spawnMeteor()
{
    meteors.push(
    {
        x: cw,
        y: Math.floor(Math.random() * (ch-136))+30,
        //spd: 1,
        spd: Math.floor(Math.random() * 8) + 6,
        rot: 1,
        w: 138,
        h: 136,
        health: metCurHP,
        maxHp: metCurHP,
        damage: 5
    })
}


//---------------------------------------------------------------------------------------------------


function spawnExplosion(x,y)
{
    exlosions.push(
    {
        x: x,
        y: y,
        frameW: 140,
        curFrame: 0,
        frameRate: 20,
        fullWidth: 980
    })
}




//---------------------------------------------------------------------------------------------------


function spawnCoin(x,y) {
    coins.push(
        {
            x: x,
            y: y,
            frameW: 55,
            curFrame: 1120,
            frameRate: 20,
            fullWidth: 1505,
            spd: Math.floor(Math.random() * 8) + 6
        })
}


function updateCoins()
{
    coins.forEach(coin =>{
        if(coin.curFrame <= coin.fullWidth)
            coin.curFrame+=coin.frameW;
        else
            coin.curFrame = 1120;
        
        coin.y-=coin.spd;
        coin.x-=coin.spd/1.5;
        coins = coins.filter(coinOnscreen)
    })
}

function coinOnscreen(obj)
{
    return obj.y>=-55
}


function drawCoins()
{
    coins.forEach(coin =>{
        ctx.drawImage(assets, coin.curFrame, 585, 55, 55, coin.x, coin.y, 55, 55)
    })    
}


function spreadCoins(coins=4, x, y, w)
{
    for (let i = 0; i < coins; i++) {
        spawnCoin(x+ ((w/coins)*i) , y-50)
    }
}


//---------------------------------------------------------------------------------------------------


function spawnComet()
{
    comets.push(
    {
        x: Math.floor(Math.random() * cw)+cw/2,
        y: -211,
        spd: Math.floor(Math.random() * 20) + 15,
        w: 100,
        h: 211,
        health: 8,
        maxHp: 8,
        damage: 10
    })
}


//---------------------------------------------------------------------------------------------------


function updateComets()
{

    comets.forEach(com =>{
        com.y+=com.spd
        com.x-=com.spd*2
        if(areColiding(com,boi.body) || areColiding(com,boi.ship))
        {
            com.health-=com.maxHp
            spawnExplosion(com.x,com.y)
            playSFX("explosion")
            if(boi.health > 0)
                boi.health-=com.damage;
        }

        comets = comets.filter(notDead);
        comets = comets.filter(cometonscreen);
        drawImageRot(assets, com.x, com.y, com.w, com.h, 55, 684, 0)
    })
}

function drawComets() {
    comets.forEach(com => {
        drawImageRot(assets, com.x, com.y, com.w, com.h, 55, 684, 0)
    });
}

//---------------------------------------------------------------------------------------------------

function updateBullets()
{
    bullets.forEach(bul => {
        bullets = bullets.filter(bulonscreen);
        bullets = bullets.filter(notDead);
        bul.x+=bul.spd;
    });
}

function drawBullets() {
    bullets.forEach(bul => {
        ctx.drawImage(assets, 393, 0, 78, 17, bul.x, bul.y, 78, 17)
    });
}


//---------------------------------------------------------------------------------------------------


function spawnStar()
{
    stars.push(
    {
        x: cw,
        y: Math.floor(Math.random() * ch+32)-32,
        spd: Math.floor(Math.random() * 10) + 5,
        metChance: Math.floor(Math.random() * 200),
        planetChance: Math.floor(Math.random() * 1500),
        w: 32,
        h: 32,
    })
}

//---------------------------------------------------------------------------------------------------

function updateStars()
{
    stars.forEach(star => {
        stars = stars.filter(metonscreen);
        star.x-=star.spd;
        if(star.metChance != 1 && star.planetChance != 1)
        {
            ctx.fillStyle = 'white';
            ctx.fillRect(star.x, star.y, 7, 5);
        }
        else if(star.metChance == 1 && star.planetChance != 1)
        {
            ctx.drawImage(assets, 546, 0, 138, 136, star.x, star.y, 50, 50);
        } else if(star.planetChance == 1)
        {
            ctx.drawImage(assets, 546, 136, 117, 75, star.x, star.y, 45, 30);
        }
    });
}


//---------------------------------------------------------------------------------------------------


function deleteAll()
{
    bullets.length = 0;
    meteors.length = 0;
    comets.length = 0;
    exlosions.length = 0;
    coins.length = 0;
}


//---------------------------------------------------------------------------------------------------


function updatePlayer()
{
    if(boi.y<=0)
        lockUp = true;
    if(boi.y+boi.h>=ch)
        lockDown = true;
    if(boi.y>=0 && boi.y+boi.h<=ch)
    {
        lockDown = false;
        lockUp = false;
    }

    if(goingDown && !lockDown)
        boi.y+=boi.spd;
    if(goingUp && !lockUp)
        boi.y-=boi.spd;

    boi.body = {x: boi.x+78, y: boi.y, w: 62, h: 87}
    boi.ship = {x: boi.x, y: boi.y+104, w: 218, h: 86}
    
    if(boi.health<=0)
    { 
        boi.health = 0;
        boi.ypos = 380;
        gameStarted = false;
        death()
    }
    else
    {
        boi.dead = false;
        boi.xpos = 0;
        boi.ypos = 0;
        gameOverPlaied = false;
    }
}


function upgrade(skill)
{
    if(skill === 'health')
    {
        if(getFromLS('coins') >= upgrades.health.cost)
        {
            saveToLS('coins', getFromLS('coins')-upgrades.health.cost)
            saveToLS('playerHP', upgrades.health.cur+50);
            upgrades.health.cur = getFromLS('playerHP')
            boi.maxHp = upgrades.health.cur;
            boi.health = upgrades.health.cur;
            upgrades.health.cost+=200;
        }
    }

    if(skill === 'bullet')
    {
        if(getFromLS('coins') >= upgrades.bullet.cost)
        {
            saveToLS('coins', getFromLS('coins')-upgrades.bullet.cost)
            saveToLS('bulletDamage', upgrades.bullet.cur+1);
            upgrades.bullet.cur = getFromLS('bulletDamage')
            bulletDamage = upgrades.bullet.cur;
            upgrades.bullet.cost+=100;
        }
    }
}



//---------------------------------------------------------------------------------------------------

function specsBox(place,msg,backgroundColor='blue',textColor='white ')
{   
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(place*254, ch-35, 250, 35);
    ctx.fillStyle = textColor;
    text(msg, (place*254)+3, ch-6);
}



//---------------------------------------------------------------------------------------------------


function debuging(obj)
{
    if(obj=="met")
    {
        meteors.forEach(met => {
            ctx.fillStyle = 'blue';
            ctx.fillRect(met.x, met.y, met.w, met.h)
        })
    } 

    if(obj=="boi")
    {
            ctx.fillStyle = 'purple';
            ctx.fillRect(boi.x, boi.y, boi.w, boi.h)
    }
    
    if(obj=="bul")
    {
        bullets.forEach(bul => {
            ctx.fillStyle = 'red';
            ctx.fillRect(bul.x, bul.y, bul.w, bul.h)
        })
    }

}


//---------------------------------------------------------------------------------------------------


function updateExpl()
{
    exlosions.forEach(expl =>{
        expl.curFrame+=expl.frameW;
        exlosions = exlosions.filter(animationPlaying)
    })    
}


function drawExpl()
{
    exlosions.forEach(expl =>{
        ctx.drawImage(assets, expl.curFrame, 500, 140, 140, expl.x, expl.y, 140, 140)
        //ctx.drawImage(assets, 255, 0, 138, 136, expl.x, expl.y, 138, 136)
    })    
}


//---------------------------------------------------------------------------------------------------


function MeteorHP()
{

    meteors.forEach(met => {
        var state;
        var HPpercent = met.health/met.maxHp*100
        if(HPpercent>=10)
            state = '#FF0000';
        if(HPpercent>=20)
            state = '#FF0000';
        if(HPpercent>=30)
            state = '#FF0000';
        if(HPpercent>=40)
            state = '#FFC100';
        if(HPpercent>=50)
            state = '#FFE400';
        if(HPpercent>=60)
            state = '#E5FF00';
        if(HPpercent>=70)
            state = '#C2FF00';
        if(HPpercent>=80)
            state = '#9FFF00';
        if(HPpercent>=90)
            state = '#6AFF00';
        if(HPpercent>=100)
            state = '#00FF00';


        var hpBarLeng = 100;
        ctx.fillStyle = state;
        ctx.fillRect(met.x+(met.w/2)-(hpBarLeng/2), met.y-20, hpBarLeng, 10)
    })

}


//---------------------------------------------------------------------------------------------------

function updateMeteors()
{

    meteors.forEach(met => {
        
        bullets.forEach(bul => {
            if(areColiding(met,bul))
            {
                met.health -= bul.damage;
                if(met.health<=0)
                {
                    lvlscore+=1;
                    saveToLS("destMet", getFromLS("destMet")+1);
                    spawnExplosion(met.x,met.y)
                    playSFX("explosion")
                    if(met.maxHp === 4)
                    {
                        spreadCoins(5, met.x, met.y, met.w)
                        saveToLS("coins", getFromLS("coins")+5);
                    }

                    if(met.maxHp === 6)
                    {
                        spreadCoins(10, met.x, met.y, met.w)
                        saveToLS("coins", getFromLS("coins")+10);
                    }

                    if(met.maxHp === 8)
                    {
                        spreadCoins(20, met.x, met.y, met.w)
                        saveToLS("coins", getFromLS("coins")+20);
                    }
                }
                bul.health -= met.damage;
            }
        })

        if(areColiding(met,boi.body) || areColiding(met,boi.ship))
        {
            met.health -= met.health;
            spawnExplosion(met.x,met.y)
            playSFX("explosion")
            if(boi.health > 0)
                boi.health -= met.damage;
            
        }

        meteors = meteors.filter(metonscreen);
        meteors = meteors.filter(notDead);

        met.x-=met.spd;

    });
}



function drawMeteors() {
    meteors.forEach(met => {

        MeteorHP()

        var rotate;

        rotate = met.rot+=met.spd;
        if(met.maxHp === 4)
            drawImageRot(assets, met.x, met.y, 138, 135.5, rotate, 255, 0)
        if(met.maxHp === 6)
            drawImageRot(assets, met.x, met.y, 138, 135.5, rotate, 1510, 0)
        if(met.maxHp === 8)
            drawImageRot(assets, met.x, met.y, 138, 135.5, rotate, 1510, 136)
        //ctx.drawImage(assets, 255, 0, 138, 136, met.x, met.y, 138, 136)
    });
}


//---------------------------------------------------------------------------------------------------


function boiHP()
{
    txt('Health', 26, 10, 30,"white", "PressStart2PRegular", 2, "start")
    ctx.fillStyle = "#0a3272"
    ctx.fillRect(20, 40, 306, 26)
    ctx.fillStyle = "#2f78ed"
    ctx.fillRect(23, 43, boi.health*(300/boi.maxHp), 20)
    txt(boi.health+"/"+boi.maxHp, 26, 80, 25,"white", "PressStart2PRegular", 2, "start")
}


//---------------------------------------------------------------------------------------------------

function boiScore()
{
    txt('Score', cw-26, 10, 30,"white", "PressStart2PRegular", 2, "end")
    ctx.fillStyle = "#720a0a"
    ctx.fillRect(cw-326, 40, 306, 26)
    ctx.fillStyle = "#ed2f2f"
    ctx.fillRect(cw-323, 43, lvlscore*(300/maxlvlscore), 20)
    txt(lvlscore+"/"+maxlvlscore, cw-26, 80, 25,"white", "PressStart2PRegular", 2, "end")
}


//---------------------------------------------------------------------------------------------------

function level()
{
    //text('Level '+curlvl, cw/2, 10, TextColor, 45, 'PressStart2PRegular', 'center')
    txt('Level '+curlvl, cw/2, 10, 40, "white", "PressStart2PRegular", 2, "center")
}

//---------------------------------------------------------------------------------------------------

function bulonscreen(obj)
{
    return obj.x<=cw;
}

function cometonscreen(com)
{
    return com.y<=ch;
}

function metonscreen(obj)
{
    return obj.x>=-138
}

function notDead(obj)
{
    return obj.health >= 1;
}

function animationPlaying(obj)
{
    return obj.curFrame <= obj.fullWidth;
}


//---------------------------------------------------------------------------------------------------


var lvlscore = 0;
var maxlvlscore = 3;
var curlvl = 1;
var shots = 3;
var meteorSpeed = 2000;



//---------------------------------------------------------------------------------------------------

var cometSpawner;

function levelUpCheker(freepass=false) {
    if(curlvl > getFromLS('highLevel'))
    {
        saveToLS('highLevel', getFromLS('highLevel')+1)
    }
    if(lvlscore >= maxlvlscore || freepass)
    {
        curlvl += 1;
        lvlscore = 0;
        maxlvlscore += 1;
        if(curlvl<=20)
        {
            clearInterval(meteorSpawner)
            meteorSpeed -= 90;
            meteorSpawner = setInterval(spawnMeteor,meteorSpeed)
        }
        if(curlvl===10)
        {
            metCurHP = 6
        }
        if(curlvl===20)
        {
            cometSpawner = setInterval(spawnComet,2000)
        }
        if(curlvl===25)
        {
            metCurHP = 8
        }

    }
}


//---------------------------------------------------------------------------------------------------

function death() {
    deleteAll()
    boi.dead = true
    boi.y = (ch/2)-(boi.h/2)
    clearInterval(meteorSpawner)
    clearInterval(cometSpawner)
    metCurHP = 4;
    meteorSpeed = 2000
    curlvl = 1;
    lvlscore = 0;
    maxlvlscore = 3;
}


//---------------------------------------------------------------------------------------------------


function saveVolSettings()
{
    saveToLS("sfxVol", sfxSlider.value/10)
    saveToLS("musicVol", musicSlider.value/10)
    setAllVol()
}

function setAllVol()
{
    sfx.lazer.volume(getFromLS("sfxVol"))
    sfx.gameover.volume(getFromLS("sfxVol"))
    sfx.explosion.volume(getFromLS("sfxVol"))
    music.backMusic.volume(getFromLS("musicVol"));
}


function showTutorial()
{
    ctx.drawImage(assets, 900, 0, 610, 360, (cw/2)-305, (ch/2)-180, 610, 360)
}
