var $timeSelect = document.querySelectorAll('.time-select button');
var $buttonTime = document.querySelectorAll('button[data-time]');
var $timeDisplay = document.querySelector('.time-display');
var $play = document.querySelector('.play');
var $song = document.querySelector('.song');
var $video = document.querySelector('.video-container video');
var $outline = document.querySelector('.moving-outline circle');
var $sound = document.querySelectorAll('.sound button');


  $timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      const selected = this.getAttribute('data-time');
      $timeDisplay.textContent = Math.floor(selected / 60) + ':00';
    });
  });

$song.ontimeupdate = function timeElapsed () {
  const outlineLength = $outline.getTotalLength();
  const fakeDuration = 600;
  const currentTime = $song.currentTime;
  const elapsed = fakeDuration - currentTime;
  const seconds = Math.floor(elapsed % 60);
  const minutes = Math.floor(elapsed / 60);

  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  $outline.style.strokeDasharray = outlineLength;
  $outline.style.strokeDashoffset = progress;
}

function playSong () {
  $play.addEventListener('click', () => {
    checkPlaying();
  });
}

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
// timeElapsed();
