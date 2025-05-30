document.addEventListener("DOMContentLoaded", () => {
    let lamp = document.getElementById("lamp");
    let toggleBtn = document.getElementById("toggleBtn");
    let brightnessBtn = document.getElementById("brightnessBtn");
    let lampTypeSelect = document.getElementById("lampType");
    let isOn = false;
    let inactivityTimer;
    let maxBrightnessLevels = {
        normal: 1,
        energy: 2,
        led: 4
    };

    function resetTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            lamp.classList.remove("on");
            isOn = false;
            toggleBtn.textContent = "Включити";
        }, 3000); // 5 хвилин
    }

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    resetTimer();

    toggleBtn.addEventListener("click", function() {
        isOn = !isOn;
        lamp.classList.toggle("on", isOn);
        toggleBtn.textContent = isOn ? "Виключити" : "Включити";
        resetTimer();
    });

    brightnessBtn.addEventListener("click", function() {
        let lampType = lampTypeSelect.value;
        let maxBrightness = maxBrightnessLevels[lampType];
        if (maxBrightness === 1) {
            alert("Цей тип лампочки не підтримує зміну яскравості.");
            return;
        }
        let brightness = prompt(`Введіть рівень яскравості (0-${maxBrightness}):`);
        brightness = parseInt(brightness);
        if (!isNaN(brightness) && brightness >= 0 && brightness <= maxBrightness) {
            lamp.style.opacity = brightness / maxBrightness;
        } else {
            alert(`Введіть число від 0 до ${maxBrightness}!`);
        }
    });
});
