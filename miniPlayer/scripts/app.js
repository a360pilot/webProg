const music = document.querySelector('.music');
const cover = document.querySelector('.cover');
const play = document.querySelector('#play');
const elapsed = document.querySelector('.elapsed');
const slider = document.querySelector('.slider');
const timer = document.querySelector('.timer');
const vol = document.querySelector('#vol-slider');

const volUp = document.querySelector('#vol-up');
const volDown = document.querySelector('#vol-down');

let duration = 0;
let isPlaying = false;
music.volume = vol.value;
music.loop = false;

// Check if music is loaded correctly:
music.addEventListener('canplaythrough', function() {
    duration = music.duration;
    return;
});

// Progressively update music information:
music.addEventListener('timeupdate', timeUpdate);

// Update volume bar width:
vol.addEventListener('input', function() {
    vol.style.backgroundSize = `${vol.value * 100}% 100%`;
})

// Combine all 'click' event listeners in one function:
document.addEventListener('click', function(evObj) {
    let target = evObj.target;
    let className = target.className;
    let id = target.id;

    if(id === 'play') {
        playPause();
    }
    if(id === 'vol-up') {
        changeVolume(0.1);
    }
    if(id === 'vol-down') {
        changeVolume(-0.1);
    }
    if(className === 'slider' || className === 'elapsed') {
        let clickTime = (slider.offsetWidth - (evObj.layerX - slider.offsetLeft)) / slider.offsetWidth * duration;
        music.currentTime = clickTime;
    }
    return;
})

// Combine all 'wheel' event listeners in one function:
vol.addEventListener('wheel', function(evObj) {
    if(evObj.wheelDeltaY > 0) {
        changeVolume(0.1);
    } else {
        changeVolume(-0.1);
    }
    return;
}, {passive: true});

// Event listeners for keyboard shortcuts:
document.addEventListener('keydown', function(evObj) {
    key = evObj.key;

    if(key === 'k') {
        playPause();
        return;
    }
    if(key === 'm') {
        music.muted = !music.muted;
        return;
    }
    if(key === 'ArrowUp') {
        changeVolume(0.1);
        return;
    }
    if(key === 'ArrowDown') {
        changeVolume(-0.1);
        return;
    }
    if(key === 'ArrowRight') {
        let currentTime = music.currentTime;
        if(currentTime - 5 < 0) {
            music.currentTime = 0;
            return;
        }
        music.currentTime = currentTime - 5;
        return;
    }
    if(key === 'ArrowLeft') {
        let currentTime = music.currentTime;
        if(currentTime + 5 >= duration) {
            music.currentTime = duration;
            return;
        }
        music.currentTime = currentTime + 5;
        return;
    }
});



// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************
//                                        Other Functions Used in Listener Calls
// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************

function timeUpdate() {
    let playPercent = slider.offsetWidth * (music.currentTime / duration);
    // Sets the elapsed pink bar to a currect position.
    elapsed.style.width = playPercent.toString() + "px";
    // Sets the timer correctly: subtract the minutes and get the raw seconds.
    let minutes = Math.floor(music.currentTime / 60);
    let seconds = Math.floor(music.currentTime - (60 * minutes));

    if(seconds <= 9) {
        timer.innerHTML = toFarsiNumber(minutes) + ":۰" + toFarsiNumber(seconds);
    } else {
        timer.innerHTML = toFarsiNumber(minutes) + ":" + toFarsiNumber(seconds);
    }

    // Check also for volume changes:
    music.volume = vol.value;

    return;
}

function toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return n
      .toString()
      .split('')
      .map(x => farsiDigits[x])
      .join('');
}

function playPause() {
    if(!isPlaying) {
        music.play();
        play.className = "fas fa-pause fa-1x";
        isPlaying = true;
        return;
    }
    if(isPlaying) {
        music.pause();
        play.className = "fas fa-play fa-1x";
        isPlaying = false;
        return;
    }
    return;
}

function changeVolume(value) {
    // Check overflows:
    if((value + music.volume > 1)
                ||
       (value + music.volume < 0)) {
           music.volume = (value > 0) ? 1 : 0;
           vol.value = music.volume;
           vol.style.backgroundSize = `${vol.value * 100}% 100%`
           return;
    }

    music.volume = music.volume + value;
    vol.value = music.volume;
    vol.style.backgroundSize = `${vol.value * 100}% 100%`
    return;
}

// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************
//                                        Commented Discrete Event Listeners
// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************

// play.addEventListener('click', playPause);

// volUp.addEventListener('click', function() {
//     changeVolume(0.1);
// });
// volDown.addEventListener('click', function() {
//     changeVolume(-0.1);
// });

// slider.addEventListener('click', function(evObj) {
//     let clickTime = (slider.offsetWidth - (evObj.layerX - slider.offsetLeft)) / slider.offsetWidth * duration;
//     music.currentTime = clickTime;
// })