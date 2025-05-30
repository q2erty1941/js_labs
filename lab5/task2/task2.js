let lights = document.querySelectorAll(".light");
let statusText = document.querySelector(".status");
let nextBtn = document.getElementById("nextBtn");

let userRedTime = parseInt(prompt("Введіть час для червоного світла:")) * 1000 || 5000;
let userYellowTime = parseInt(prompt("Введіть час для жовтого світла:")) * 1000 || 3000;
let userGreenTime = parseInt(prompt("Введіть час для зеленого світла:")) * 1000 || 7000;

let blinkCount = 0;
let currentIndex = 0;
let interval;
let manualMode = false;

let times = [userRedTime, userYellowTime, userGreenTime, 500];

function changeLight() {
    if (manualMode) return;

    lights.forEach(light => light.classList.remove("active", "blink"));

    if (currentIndex === 3) {
        if (blinkCount < 6) {
            if (blinkCount % 2 === 0) {
                lights[1].classList.add("active");
            }
            blinkCount++;
            setTimeout(changeLight, times[3]); // Миготіння кожні 0.5 сек
            return;
        } else {
            blinkCount = 0;
            currentIndex = 0;
        }
    }

    lights[currentIndex].classList.add("active");

    statusText.textContent = ["Червоний", "Жовтий", "Зелений", "Миготливий жовтий"][currentIndex];

    let delay = times[currentIndex];

    currentIndex = (currentIndex + 1) % 4;

    interval = setTimeout(changeLight, delay);
}

function manualSwitch() {
    clearTimeout(interval);
    manualMode = true;

    lights.forEach(light => light.classList.remove("active", "blink"));

    if (currentIndex === 3) {
        blinkCount = 0;
        currentIndex = 0;
    }

    lights[currentIndex].classList.add("active");
    statusText.textContent = ["Червоний", "Жовтий", "Зелений"][currentIndex];

    currentIndex = (currentIndex + 1) % lights.length;
}

nextBtn.addEventListener("click", manualSwitch);
changeLight();
