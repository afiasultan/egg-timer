let timerInterval = null;
let initialSeconds = 0;    // total seconds when a preset is chosen
let remainingSeconds = 0;  // updated each tick

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// Call whenever a preset is clicked
function setTimer(minutes) {
  clearInterval(timerInterval);
  initialSeconds = minutes * 60;
  remainingSeconds = initialSeconds;
  document.getElementById('timer').textContent = formatTime(remainingSeconds);
}

// Begin countdown (or resume if paused)
function startTimer() {
  if (timerInterval !== null) return; // already running
  timerInterval = setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds < 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById('timer').textContent = "Time's up!";
      return;
    }
    document.getElementById('timer').textContent = formatTime(remainingSeconds);
  }, 1000);
}

// Pause without resetting remainingSeconds
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Stop entirely and zero out
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingSeconds = 0;
  document.getElementById('timer').textContent = "00:00";
}

// Wire up buttons once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Preset minutes
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
