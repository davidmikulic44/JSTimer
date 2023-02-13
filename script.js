const timeElement = document.querySelector('.watch .time');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const checkbox = document.getElementById('checkbox');
const timeText = document.getElementById('time');
const timeInput = document.getElementById('time-input');
const label = document.getElementById('label');
const ball = document.getElementById('ball');

let seconds=5400;
let interval=null;
let wasPaused=false;
let audio=new Audio('1 od.wav');

startButton.addEventListener('click',startTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);
checkbox.addEventListener('change',checkboxChange);

function checkboxChange(){
    document.body.classList.toggle('light');
    timeText.classList.toggle('light');
    document.getElementById('circle').classList.toggle('light');
    timeInput.classList.toggle('light');
    label.classList.toggle('light');
    ball.classList.toggle('light');
    document.getElementById('pause-icon').classList.toggle('light');
    document.getElementById('play-icon').classList.toggle('light');
    document.getElementById('reset-icon').classList.toggle('light');
}

function mins(seconds){
    let mins = Math.floor((seconds-(hrs(seconds)*3600)) / 60);
    if(mins<10){
        mins='0'+mins;
    }
    return mins;
}

function hrs(seconds){
    let hrs = Math.floor(seconds/3600);
    
    if(hrs<10){
        hrs='0'+hrs;
    }
    return hrs;
}

function secs(seconds){
    let secs = seconds % 60;
    if(secs<10)
        secs='0'+secs;
    return secs;
}

function saveSeconds(){
    if(document.getElementById('time-input').value>6000){
        document.getElementById('time-input').value='90';
        timeElement.innerText=`${hrs(seconds)}:${mins(seconds)}:${secs(seconds)}`;
        return;
    }

    if(!interval){
        let secondsInput=document.getElementById('time-input').value;
        secondsInput*=60;

        if(secondsInput==0)
            seconds=5400;
        else
            seconds=secondsInput;
        pauseTimer();
        timeElement.innerText=`${hrs(seconds)}:${mins(seconds)}:${secs(seconds)}`;
    }
    
}

function timer(){
    if(seconds>0){
        seconds--;
    }
    
    timeElement.innerText=`${hrs(seconds)}:${mins(seconds)}:${secs(seconds)}`;
    if(seconds==0){
        pauseTimer();
        audio.play();
        alert("Timer alert");
    }
}

function startTimer(){
    if(interval){
        return;
    }
    audio.pause();
    audio.currentTime=0;

    if(seconds==0){
        seconds=5400;
    }
    
    interval = setInterval(timer, 1000);
}


function pauseTimer(){
    clearInterval(interval);
    interval=null;
    wasPaused=true;
    audio.pause();
    audio.currentTime=0;
}

function resetTimer(){
    seconds=document.getElementById('time-input').value*60;
    document.getElementById('time-input').value='';
    if(seconds==0)
        seconds=5400;
    pauseTimer();
    audio.pause();
    audio.currentTime=0;
    timeElement.innerText=`${hrs(seconds)}:${mins(seconds)}:${secs(seconds)}`;
}