score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log(e.key);
    if (e.key == "ArrowLeft") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + 'px';
        console.log(dino.style.left);
    }
    if (e.key == "ArrowRight") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + 'px';
        console.log(dino.style.left);
    }
    if (e.key == "ArrowUp") {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameover = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameover.innerHTML = "Game Over, Reload again to play!";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        if(score > 0){
            score -=1;
            updateScore(score);
        }
    }
    else if (offsetX < 112 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('.animate-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = 's';
            console.log("New amnimation Duration is there and it's value is: ", newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}