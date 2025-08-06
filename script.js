const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

function formatTime(milliseconds) {
    const hrs = Math.floor(milliseconds / 3600000);
    const mins = Math.floor((milliseconds % 3600000) / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;
    timerDisplay.textContent = '00:00:00.00';
    
    lapList.innerHTML = '<div class="empty-laps">No lap times recorded yet</div>';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item highlight';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${formatTime(elapsedTime)}</span>
        `;
        
        if (lapList.firstChild.className === 'empty-laps') {
            lapList.innerHTML = '';
        }
        lapList.prepend(lapItem);
        
        setTimeout(() => {
            lapItem.classList.remove('highlight');
        }, 1500);
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

pauseBtn.disabled = true;
resetBtn.disabled = true;
lapBtn.disabled = true;



const themeSwitch = document.getElementById('themeSwitch');


(function() {
  const savedTheme = localStorage.getItem('stopwatchTheme');
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.body.classList.add('dark');
    if (themeSwitch) themeSwitch.checked = true;
  }
})();

if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('stopwatchTheme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('stopwatchTheme', 'light');
    }
  });
}

