let timerInterval = null;
let initialSeconds = 0;
let remainingSeconds = 0;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function setTimer(minutes) {
  clearInterval(timerInterval);
  stopTick();
  initialSeconds = minutes * 60;
  remainingSeconds = initialSeconds;
  document.getElementById('timer').textContent = formatTime(remainingSeconds);
  document.getElementById('start').disabled = false; // Enable Start
}

function startTimer() {
  if (timerInterval !== null) return;
  if (remainingSeconds <= 0) return;

  document.getElementById('start').disabled = true; // Disable Start
  playTick();

  timerInterval = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds < 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      stopTick();
      document.getElementById('timer').textContent = "Time's up!";
      document.getElementById('start').disabled = true;
      playDing();
      return;
    }

    document.getElementById('timer').textContent = formatTime(remainingSeconds);
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  stopTick();
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingSeconds = 0;
  stopTick();
  document.getElementById('timer').textContent = "00:00";
  document.getElementById('start').disabled = true;
}

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

  // Start disabled initially
  document.getElementById('start').disabled = true;
});
