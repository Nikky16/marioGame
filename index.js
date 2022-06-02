console.log('Welcome to mario!!');
let gameoverSound = new Audio('music/gameover.wav');
let jumpSound = new Audio('music/jump.wav');
let gameover = document.getElementById('gameo');
let totalscore = document.getElementById('totalscore');
let score = 0;
let cross = true;

let player = document.getElementById('pilayer');
let enemy = document.getElementById('dushman');

document.addEventListener('keydown', (e) => {
    // console.log(e.keyCode);
    if (e.keyCode == 38) {
        player.classList.add('jumpclass');
        jumpSound.play();
        setTimeout(() => {
            player.classList.remove('jumpclass');
        }, 500);
    }
    let left = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    if (e.keyCode == 37) {
        player.style.left = (left - 200) + 'px';
    }
    if (e.keyCode == 39) {
        player.style.left = (left + 200) + 'px';
    }
})

function changescore() {
    score = score + 1;
    return score;
}

setInterval(() => {

    let px = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    let py = parseInt(window.getComputedStyle(player, null).getPropertyValue('bottom'));
    let ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
    let ey = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('bottom'));

    let diffX = Math.abs(px - ex);
    let diffY = Math.abs(py - ey);

    if (diffX < 50) {
        player.classList.add('marioOut');
        player.classList.remove('jumpclass');
        enemy.classList.remove('enemyAnimation');
        gameover.style.opacity = 1;
        gameoverSound.play();
        cross = false;
    }
    if (diffX < 150 && diffX > 50 && cross == true) {
        cross = false;
        score = changescore();
        totalscore.innerText = `Your Score: ${score}`;
        setTimeout(() => {
            cross = true;
        }, 1000);

        let anidur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue('animation-duration'));
        console.log(anidur);
        setTimeout(() => {
            if (anidur > 2.5 ) {
                enemy.style.animationDuration = (anidur - 0.3) + 's';
            }
        }, 1000);
    }

}, 100);