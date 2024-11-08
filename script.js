// Step-by-step messages to display on each button click
const messages = [
  "Are you sure you want to go ahead?",
  "Seriously?",
  "OK OK, wait a sec...",
  "1",
  "2",
  "3",
  "🎉 HAPPY BIRTHDAY AAAA CCCCC!!! 🎉"
];
let clickCount = 0;

const birthdayButton = document.getElementById("birthdayButton");
const messageElement = document.getElementById("message");
const cornerImages = document.querySelectorAll(".corner-image");
const container = document.querySelector(".container");
const birthdaySong = document.getElementById("birthdaySong");
const confettiCanvas = document.getElementById("confettiCanvas");

// Handle button click logic
birthdayButton.addEventListener("click", function() {
  // Check if we are at the final message
  if (clickCount < messages.length - 1) {
    // Change the button text to the next message
    birthdayButton.textContent = messages[clickCount];
    clickCount++;
  } else {
    // On the final click, hide the button and show the birthday message
    birthdayButton.style.display = "none";
    messageElement.textContent = messages[clickCount];
    messageElement.classList.remove("hidden");

    // Reveal the corner images with blinking effect
    cornerImages.forEach(image => image.classList.remove("hidden"));

    // Play birthday song and start confetti
    birthdaySong.play();
    startConfetti();
  }
});

// Confetti effect (same as before)
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];
const confettiCount = 200;

function randomColor() {
  const colors = ["#ff69b4", "#ff1493", "#ff6347", "#87ceeb", "#ffd700", "#32cd32", "#ffa500"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti() {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 8 + 3,
      d: Math.random() * confettiCount,
      color: randomColor(),
      tilt: Math.floor(Math.random() * 20) - 10,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();
  });

  moveConfetti();
}

function moveConfetti() {
  confetti.forEach((c, i) => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);

    if (c.y > confettiCanvas.height) {
      confetti[i] = {
        x: Math.random() * confettiCanvas.width,
        y: -10,
        r: c.r,
        d: c.d,
        color: c.color,
        tilt: c.tilt,
      };
    }
  });
}

function startConfetti() {
  createConfetti();
  setInterval(drawConfetti, 20);
}
