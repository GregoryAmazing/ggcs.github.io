
'use strict'

console.log('js running!');

var term1,term2,ans,ecount,ecElem,cat;

term1 = document.getElementById('term1');
term2 = document.getElementById('term2');
ecElem = document.getElementById('ecount');
ans = document.getElementById('input');
cat = document.getElementById('cat');
ecount = 0;

window.onload = function(){
    term1.innerHTML =  Math.floor(Math.random() * 10)+1;
    term2.innerHTML =  Math.floor(Math.random() * 10)+1;  
}

function rans(){
    return JSON.parse(term1.innerHTML)+JSON.parse(term2.innerHTML)
}

function next(){
    term1.innerHTML =  Math.floor(Math.random() * 10)+1;
    term2.innerHTML =  Math.floor(Math.random() * 10)+1;
}

document.addEventListener('keyup', e=>{
    
    if(e.keyCode === 13){
        //console.log(ans.value);
        if(rans() == ans.value)
        {
            cat.src = 'happy.jpg'
            ecount++
            ecElem.innerHTML=ecount;
            ans.value = ''
            ans.style.background = '#35ff23'
            console.log('YES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            setTimeout(() => {
                next()
                ans.style.background = 'white'
                cat.src = 'wait.jpg'
            }, 1000);
        }
        else
        {
            cat.src = 'angry.jpg'
            ans.style.background = '#ff1e1e'
            ans.value = ''
            console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!');
            setTimeout(() => {
                ans.style.background = 'white'
                cat.src = 'wait.jpg'
            }, 1000);
        }
    }


    if(e.keyCode === 39){
        cat.src = 'cheat.jpg'
        ans.value = ''
        ans.style.background = '#35ff23'
        console.log('YES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        setTimeout(() => {
            next()
            ans.style.background = 'white'
            cat.src = 'wait.jpg'
            
        }, 1000);
    }

})
