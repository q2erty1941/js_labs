function updateClock() {
    let nowTime = new Date();
    let hours = nowTime.getHours().toString().padStart(2, "0");
    let minutes = nowTime.getMinutes().toString().padStart(2, "0");
    let seconds = nowTime.getSeconds().toString().padStart(2, "0");

    document.getElementById("digitalClock").innerHTML = `${hours}:${minutes}:<span style="opacity: ${seconds % 2 === 0 ? 1 : 0.5}">${seconds}</span>`;
}
setInterval(updateClock, 1000);
updateClock();

function startCountdown() {
    let input = document.getElementById("countdownInput").value;
    let targetTime = new Date(input).getTime();

    if (isNaN(targetTime)) {
        alert("Enter the correct date!!!");
        return;
    }

    function updateCountdown() {
        let nowTime = new Date().getTime();
        let difference = targetTime - nowTime;

        if (difference <= 0) {
            document.getElementById("countdown").innerHTML = "Час вийшов!";
            clearInterval(countdownInterval);
            return;
        }

        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = `Залишилось: ${days} дн. ${hours} год. ${minutes} хв. ${seconds} сек.`;
    }

    updateCountdown();
    let countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCalendar() {
    let input = document.getElementById("calendarInput").value;
    let [year, month] = input.split("-");
    let date = new Date(year, month - 1);

    let options = { month: "long", year: "numeric" };
    document.getElementById("calendar").innerHTML = date.toLocaleDateString("uk-UA", options);
}

function calculateBirthday() {
    let input = document.getElementById("birthdayInput").value;
    if(!input){
        alert("Enter the correct date!!!");
        return;
    }
    let nowTime = new Date();
    let birthday = new Date(input);
    birthday.setFullYear(nowTime.getFullYear());

    if(birthday < nowTime){
        birthday.setFullYear(nowTime.getFullYear()+1);
    }

    let difference = birthday - nowTime;
    let months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor(difference / (1000 * 60 * 60 * 24) % 30);
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("birthdayCountdown").innerHTML = `До дня народження залишилось: ${months} міс. ${days} дн. ${hours} год. ${minutes} хв. ${seconds} сек.`;
}