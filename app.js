const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

// Sec default score
let result = 0;
// Last Position of mouse click (whacking a mole)
let hitPosition = 0;
// Countdown timer
let currentTime = 60;
let currentTimerId;

let reset = false;

function resetGame(){
    location.reload();
}

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime == 0){
        clearInterval(countDownTimerId);
        alert('GAME OVER! Your final score is ' + result);
        reset = !reset;
    }
}

function randomSquare(){
    if(reset == false){
        // Remove any mole currently on a square
        squares.forEach(square => {
            square.classList.remove('mole');
            square.classList.remove('splat');
        });

        // Pick a new random square for a new mole to appear
        let randomSquare = squares[Math.floor(Math.random() * 9)];

        // Add mole to the random square
        randomSquare.classList.add('mole');

        // Save last hit position
        hitPosition = randomSquare.id;
    }
}

function moveMole(milliSeconds){
    let timerId = null;
    timerId = setInterval(randomSquare, milliSeconds);
}

function main(){
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if(square.id == hitPosition){
                result++;
                console.log(result);
                score.textContent = result;
                hitPosition = null;
                square.classList.remove('mole');
                square.classList.add('splat');
            }
        });
    });

    countDownTimerId = setInterval(countDown, 1000);
    moveMole(1000);
}

main()