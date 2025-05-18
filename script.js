let timerInterval = null;
let initialSeconds = 0;
let remainingSeconds = 0;

// Format time into mm:ss
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// Set the timer when a preset is chosen
function setTimer(minutes) {
  clearInterval(timerInterval);
  stopTick();
  initialSeconds = minutes * 60;
  remainingSeconds = initialSeconds;
  document.getElementById('timer').textContent = formatTime(remainingSeconds);
}

// Start or resume the countdown
function startTimer() {
  if (timerInterval !== null) return; // already running
  playTick();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds < 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      stopTick();
      document.getElementById('timer').textContent = "Time's up!";
      playDing();
      return;
    }
    document.getElementById('timer').textContent = formatTime(remainingSeconds);
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  stopTick();
}

// Reset everything
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingSeconds = 0;
  stopTick();
  document.getElementById('timer').textContent = "00:00";
}

// Tick and ding helpers
function playTick() {
  const tick = document.getElementById('tickSound');
  if (tick) {
    tick.currentTime = 0;
    tick.play();
  }
}

function stopTick() {
  const tick = document.getElementById('tickSound');
  if (tick) {
    tick.pause();
    tick.currentTime = 0;
  }
}

function playDing() {
  const ding = document.getElementById('dingSound');
  if (ding) {
    ding.currentTime = 0;
    ding.play();
  }
}

// Hook up buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button[data-minutes]').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimer(parseInt(btn.dataset.minutes, 10));
    });
  });

  document.getElementById('start').addEventListener('click', startTimer);
  document.getElementById('pause').addEventListener('click', pauseTimer);
  document.getElementById('resume').addEventListener('click', startTimer);
  document.getElementById('reset').addEventListener('click', resetTimer);
});
