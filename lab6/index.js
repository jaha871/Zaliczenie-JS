document.addEventListener("DOMContentLoaded", () => {
  const balls = document.querySelectorAll(".ball");
  const timerSpan = document.querySelector("#time");

  let timer = 0;
  let score = 0;
  let holes = [];

  window.addEventListener("deviceorientation", handleOrientation);

  function handleOrientation(event) {
    balls.forEach((ball, index) => {
      const beta = event.beta * 2;
      const gamma = event.gamma * 2;

      const newX = (gamma / 90) * 150;
      const newY = (beta / 90) * 150;

      ball.style.transform = `translate(-50%, -50%) translate(${newX}px, ${newY}px)`;

      checkCollision(ball, index);
    });
  }

  function checkCollision(ball, index) {
    const ballRect = ball.getBoundingClientRect();

    holes.forEach((hole, holeIndex) => {
      const holeRect = hole.getBoundingClientRect();

      if (
        ballRect.top >= holeRect.top &&
        ballRect.bottom <= holeRect.bottom &&
        ballRect.left >= holeRect.left &&
        ballRect.right <= holeRect.right
      ) {
        score++;
        resetGame(index, holeIndex);
      }
    });
  }

  function resetGame(ballIndex, holeIndex) {
    placeHoleRandomly(holeIndex);

    document.querySelector("#points").innerText = score;

    // balls.forEach((ball, index) => {
    //   if (index === ballIndex) {
    //     ball.style.transform = "translate(-50%, -50%) translate(0, 0)";
    //   }
    // });
  }

  function placeHoleRandomly(index) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const holeSize = 50;
    const maxX = windowWidth - holeSize;
    const maxY = windowHeight - holeSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    holes[index].style.left = `${randomX}px`;
    holes[index].style.top = `${randomY}px`;
  }

  function generateRandomHoles() {
    const minHoles = 3; // Adjust as needed
    const maxHoles = 8; // Adjust as needed

    const numHoles =
      Math.floor(Math.random() * (maxHoles - minHoles + 1)) + minHoles;

    for (let i = 0; i < numHoles; i++) {
      const hole = document.createElement("div");
      hole.className = "hole";
      document.body.appendChild(hole);
      holes.push(hole);
    }
  }

  function initializeGame() {
    generateRandomHoles();

    setInterval(() => {
      timer++;
      timerSpan.innerText = `${timer}s`;

      if (score === holes.length) {
        alert(`You passed through all the holes! Your time is ${timer}s`);
        timer = 0;
        score = 0;
        resetGame();
      }
    }, 1000);

    holes.forEach((hole, index) => {
      placeHoleRandomly(index);
    });
  }

  initializeGame();
});
