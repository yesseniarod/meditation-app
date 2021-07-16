var $timeSelect = document.querySelectorAll('.time-select button');
var $buttonTime = document.querySelectorAll('button[data-time]');
var $timeDisplay = document.querySelector('.time-display');


$timeSelect.forEach(option => {
  option.addEventListener('click', function () {
    const selected = this.getAttribute('data-time');
    $timeDisplay.textContent = Math.floor(selected / 60) + ':00';
  });
});
