const intro = document.getElementById("intro");
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  intro.classList.add("fade-out");
  const music = document.getElementById("bg-music");
  if (music.paused) music.play();
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 700);

const music = document.getElementById("bg-music");
document.addEventListener("click", () => {
  if (music.paused) music.play().catch(err => console.log("Autoplay blocked:", err));
});

const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;
if (localStorage.getItem("mode") === "sangu") {
  body.classList.add("sangu-mode");
  toggleBtn.textContent = "☀️ Gigi Mode";
}
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("sangu-mode");
  if (body.classList.contains("sangu-mode")) {
    toggleBtn.textContent = "🌙 Sangu Mode";
    localStorage.setItem("mode", "gigi");
  } else {
    toggleBtn.textContent = "☀️ Gigi Mode";
    localStorage.setItem("mode", "sangu");
  }
});

const revealBtn = document.getElementById("reveal-btn");
const message = document.getElementById("message");
revealBtn.addEventListener("click", () => {
  message.classList.remove("hidden");
  setTimeout(() => message.classList.add("show"), 100);
  revealBtn.style.display = "none";
});

// Auto Monthversary text
function updateMonthversaryDate() {
  const startDate = new Date(2025, 7, 25);
  const now = new Date();
  let monthsPassed = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth()) + 1;
  const suffix = monthsPassed % 10 === 1 && monthsPassed !== 11 ? "st" :
                 monthsPassed % 10 === 2 && monthsPassed !== 12 ? "nd" :
                 monthsPassed % 10 === 3 && monthsPassed !== 13 ? "rd" : "th";
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentMonth = months[now.getMonth()];
  const currentYear = now.getFullYear();
  document.querySelector(".subtitle").textContent = 
  `Happy ${monthsPassed}${suffix} Monthversary — 25 ${currentMonth} ${currentYear}`;
}
updateMonthversaryDate();

// Countdown animation
function updateCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  let target = new Date(currentYear, currentMonth, 25, 0, 0, 0);
  if (now > target) target = new Date(currentYear, currentMonth + 1, 25, 0, 0, 0);
  const diff = target - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const timer = document.getElementById("timer");
  let text = diff <= 0 ? "💖 It's our Monthversary today!" : `${days} days ${hours} hrs ${mins} mins ${secs} secs left 💞`;
  gsap.to(timer, {
    duration: 0.3, opacity: 0, scale: 0.95,
    onComplete: () => {
      timer.innerHTML = text;
      gsap.to(timer, { duration: 0.4, opacity: 1, scale: 1, ease: "back.out(1.7)" });
    }
  });
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Love Letter
const openLetter = document.getElementById("open-letter");
const letterBox = document.getElementById("letter");
const letterText = `My dearest Gigi 💌

Every day with you feels like a blessing.
You make even ordinary days feel special — 
and I can’t thank you enough for loving me the way you do.

I promise to keep choosing you, every single day. 💖

Forever yours, 
Sangu 💞`;
openLetter.addEventListener("click", () => {
  openLetter.style.display = "none";
  letterBox.classList.remove("hidden");
  let i = 0;
  const typeEffect = setInterval(() => {
    if (i < letterText.length) {
      letterBox.textContent += letterText.charAt(i);
      i++;
    } else clearInterval(typeEffect);
  }, 50);
});

// Music control
const playPauseBtn = document.getElementById("playPause");
let isPlaying = true;
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    music.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});
