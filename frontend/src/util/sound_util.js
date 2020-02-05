const swipe = require ('../assets/sound/Swipe2.wav');

const gameSoundFiles = {
    'rClick': swipe
}

let readyToPlay = true;

export const playSound = (key) => {
    let newAudio = new Audio(gameSoundFiles[key]);
    newAudio.volume = 0.1;
    if (readyToPlay) {
        readyToPlay = false;
        newAudio.play();
        setTimeout(() => {
            readyToPlay = true;
        }, 750);
    }
}

