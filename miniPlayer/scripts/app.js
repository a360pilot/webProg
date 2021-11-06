const music = document.querySelector('.music');
const play = document.querySelector('#play');
const elapsed = document.querySelector('.elapsed');
const slider = document.querySelector('.slider');
const timer = document.querySelector('.timer');

let duration = 0;
let isPlaying = false;

music.loop = false;
music.addEventListener('canplaythrough', function() {
    duration = music.duration;
    return;
});

music.addEventListener('timeupdate', timeUpdate);
play.addEventListener('click', playPause);

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

// Event listeners for keyboard shortcuts:
document.addEventListener('keyup', function(evObj) {
    key = evObj.key;

    if(key === 'k') {
        playPause();
        return;
    }
    if(key === 'm') {
        music.muted = !music.muted;
        return;
    }
});