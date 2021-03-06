var $timeSelect = document.querySelectorAll('.time-select button');
var $buttonTime = document.querySelectorAll('button[data-time]');
var $timeDisplay = document.querySelector('.time-display');
var $play = document.querySelector('.play');
var $song = document.querySelector('.song');
var $video = document.querySelector('.video-container video');
var $outline = document.querySelector('.moving-outline circle');
var $sound = document.querySelectorAll('.sound button');
var $reset = document.querySelector('.reset');

let duration = 600;

$song.ontimeupdate = function timeElapsed () {
  let outlineLength = $outline.getTotalLength();
  let currentTime = $song.currentTime;
  let elapsed = duration - currentTime;
  const seconds = Math.floor(elapsed % 60);
  const minutes = Math.floor(elapsed / 60);

  let progress = outlineLength - (currentTime / duration) * outlineLength;
  $outline.style.strokeDasharray = outlineLength;
  $outline.style.strokeDashoffset = progress;

  $timeDisplay.textContent = `${minutes}:${seconds}`;

  if (seconds < 10 && currentTime !== 0) {
    $timeDisplay.textContent = `0:0${seconds}`;
  }

  if (currentTime >= duration) {
    $song.pause();
    $song.currentTime = 0;
    $play.src = './meditation-app/svg/play.svg';
    $video.pause();
  }

  if (currentTime === 0) {
    $timeDisplay.textContent = Math.floor(duration / 60) + ':00';
  }

  $reset.addEventListener('click', () => {
    $song.currentTime = 0;
    $outline.style.strokeDashoffset = 0;
  });
}

$sound.forEach(option => {
  option.addEventListener('click', function () {
    $song.src = this.getAttribute('data-sound');
    $video.src = this.getAttribute('data-video');
    checkPlaying();
  });
});

function playSong () {
  $play.addEventListener('click', () => {
    checkPlaying();
  });
}

$timeSelect.forEach(option => {
  option.addEventListener('click', function () {
   duration = this.getAttribute('data-time');
  $timeDisplay.textContent = Math.floor(duration / 60) + ':00';
  });
});

function checkPlaying () {
  if ($song.paused) {
    $song.play();
    $video.play();
    $play.src = './meditation-app/svg/pause.svg';
  } else {
    $song.pause();
    $video.pause();
    $play.src = './meditation-app/svg/play.svg';
  }
}


playSong();
