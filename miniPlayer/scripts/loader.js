const musicTotal = 4;
let musicCurrent = 1;

const musicList = ['./files/music1.mp3', './files/music2.mp3', './files/music3.mp3', './files/music4.mp3'];
const coverList = ['./files/cover1.jpg', './files/cover2.jpg', './files/cover3.jpg', './files/cover4.jpg'];
const authorList = ['دیمیتری شوستاکوویچ', 'فرهات گوچر', 'آیتکین آتاش', 'سارا نائینی'];
const TitleList = ['والس شماره‌ی ۲', 'آه! ای سال‌ها', 'حسرت', 'دل‌یار'];

const author = document.querySelector('h2');
const title = document.querySelector('h4');
const forward = document.querySelector('#forward');
const backward = document.querySelector('#backward');

// Add event listeners for the next and previous buttons:
document.addEventListener('click', function(evObj) {
    let target = evObj.target;
    let className = target.className;
    let id = target.id;

    if(id === 'forward') {
        if(musicCurrent + 1 > musicTotal) {
            changeCurrent(1);
            return;
        }
        changeCurrent(musicCurrent + 1);
        return;
    }
    if(id === 'backward') {
        if(musicCurrent - 1 < 1) {
            changeCurrent(musicTotal);
            return;
        }
        changeCurrent(musicCurrent - 1);
        return;
    }

    return;
})

// If music finished playing, next track is automatically loaded:
music.addEventListener('ended', function() {
    if(musicCurrent + 1 > musicTotal) {
        changeCurrent(1);
        return;
    }
    changeCurrent(musicCurrent + 1);
    return;
});

// Changes the current track to the n-th track in the list:
function changeCurrent(n) {
    if(n > musicTotal) {
        console.error('Not that many tracks available!');
        return;
    }

    if(!music.paused || music.ended) {
        playPause();
    }

    let nextCover = '<img src="' + coverList[n - 1] + '" alt="Music Cover"></img>';
    let nextMusic = '<source src="' + musicList[n - 1] + '" type="audio/mp3">\nخطا! مرورگر شما از سرویس موسیقی پشتیبانی نمیکند.';
    let nextAuthor = authorList[n - 1];
    let nextTitle = TitleList[n - 1];

    cover.innerHTML = nextCover;
    music.innerHTML = nextMusic;
    author.innerHTML = nextAuthor;
    title.innerHTML = nextTitle;

    music.currentTime = 0;
    music.load();
    musicCurrent = n;

    if(music.paused) {
        playPause();
    }
    return;
}