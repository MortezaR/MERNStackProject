const swipe = require ('../assets/sound/Swipe2.wav');
const spring = require('../assets/sound/spring.mp3');
const depositBeep = require('../assets/sound/beep.mp3');
const pigletPunch = require('../assets/sound/pigletimpact.wav');

const gameSoundFiles = {
    'rClick': swipe,
    'trapped': spring,
    'depositBeep': depositBeep,
    'pigletPunch': pigletPunch,
}

const delays = {
    'rClick': 1000,
    'trapped': 5500,
    'depositBeep': 750,
    'pigletPunch': 500,
}

let readyToPlay = true;

export const playSound = (key) => {
    let newAudio = new Audio(gameSoundFiles[key]);
    newAudio.volume = 0.2;
    if (readyToPlay) {
        readyToPlay = false;
        newAudio.play();
        setTimeout(() => {
            readyToPlay = true;
        }, delays[key]);
    }
}

