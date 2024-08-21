const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let score = 0;
let gameInterval;
let enemies = [];
let bullets = [];
let isGameOver = false;

document.addEventListener('keydown', movePlayer);
document.addEventListener('keydown', shootBullet);
restartButton.addEventListener('click', restartGame);

function movePlayer(event) {
    const playerLeft = player.offsetLeft;
    if (event.key === 'ArrowLeft' && playerLeft > 0) {
        player.style.left = playerLeft - 20 + 'px';
    } else if (event.key === 'ArrowRight' && playerLeft < gameContainer.clientWidth - 50) {
        player.style.left = playerLeft + 20 + 'px';
    }
}

function shootBullet(event) {
    if (event.key === ' ') {
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.left = player.offsetLeft + 20 + 'px';
        bullet.style.bottom = '60px';
        gameContainer.appendChild(bullet);
        bullets.push(bullet);
    }
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = Math.random() * (gameContainer.clientWidth - 50) + 'px';
    gameContainer.appendChild(enemy);
    enemies.push(enemy);
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.style.bottom = bullet.offsetTop + 10 + 'px';

        if (bullet.offsetTop > gameContainer.clientHeight) {
            bullet.remove();
            bullets.splice(index, 1);
        }
    });
}

function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.style.top = enemy.offsetTop + 5 + 'px';

        if (enemy.offsetTop > gameContainer.clientHeight) {
            endGame();
        }

        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.getBoundingClientRect().top < enemy.getBoundingClientRect().bottom &&
                bullet.getBoundingClientRect().left > enemy.getBoundingClientRect().left &&
                bullet.getBoundingClientRect().right < enemy.getBoundingClientRect().right) {

                enemy.remove();
                bullet.remove();
                enemies.splice(index, 1);
                bullets.splice(bulletIndex, 1);
                score++;
                scoreDisplay.textContent = score;
            }
        });
    });
}

function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    gameOverDisplay.classList.remove('hidden');
    finalScore.textContent = score;
}

function restartGame() {
    isGameOver = false;
    score = 0;
    scoreDisplay.textContent = score;
    gameOverDisplay.classList.add('hidden');
    enemies.forEach(enemy => enemy.remove());
    bullets.forEach(bullet => bullet.remove());
    enemies = [];
    bullets = [];
    startGame();
}

function startGame() {
    gameInterval = setInterval(() => {
        if (!isGameOver) {
            createEnemy();
            moveBullets();
            moveEnemies();
        }
    }, 100);
}

startGame();
