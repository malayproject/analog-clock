const secondHandEl = document.querySelector(".secondHand");
const minuteHandEl = document.querySelector(".minuteHand");
const hourHandEl = document.querySelector(".hourHand");

function getTime() {
  const currTime = new Date();
  secondHandEl.style.transform = `rotate(${
    (currTime.getSeconds() - 15) * 6
  }deg)`;
  minuteHandEl.style.transform = `rotate(${
    (currTime.getMinutes() - 15) * 6 + currTime.getSeconds() / 10
  }deg)`;
  hourHandEl.style.transform = `rotate(${
    ((currTime.getHours() % 12) - 3) * 30 + (currTime.getMinutes() / 12) * 6
  }deg)`;
  setTimeout(getTime, 1000);
}

setTimeout(getTime, 1000);
