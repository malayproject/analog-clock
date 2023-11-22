const secondHandEl = document.querySelector(".secondHand");
const minuteHandEl = document.querySelector(".minuteHand");
const hourHandEl = document.querySelector(".hourHand");
const sliderEl = document.querySelector(".slider");
const sliderKnobEl = document.querySelector(".sliderKnob");
const appContainerEl = document.querySelector(".appContainer");
const clockFrameImgEl = document.querySelector("#clockFrameImg");

sliderEl.addEventListener("click", (e) => {
  sliderKnobEl.classList.toggle("dark");
  sliderEl.classList.toggle("dark");
  appContainerEl.classList.toggle("dark");
  clockFrameImgEl.classList.toggle("dark");
  minuteHandEl.classList.toggle("dark");
  hourHandEl.classList.toggle("dark");
});

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

function getClockFaceSetter() {
  // let currFaceIndex = 0;
  let currFaceIndex = Number(localStorage.getItem("preferredClockFace")) || 0;
  const themeSelectEl = document.querySelector(".themeSelect");
  themeSelectEl.innerText = clockFaces[currFaceIndex].name;
  clockFrameImgEl.setAttribute("src", clockFaces[currFaceIndex].imageUrl);
  return function (next = false) {
    if (next) {
      if (currFaceIndex === clockFaces.length - 1) currFaceIndex = 0;
      else currFaceIndex += 1;
    } else {
      if (currFaceIndex === 0) currFaceIndex = clockFaces.length - 1;
      else currFaceIndex -= 1;
    }
    localStorage.setItem("preferredClockFace", currFaceIndex);
    themeSelectEl.innerText = clockFaces[currFaceIndex].name;
    clockFrameImgEl.setAttribute("src", clockFaces[currFaceIndex].imageUrl);
    console.log(clockFrameImgEl);
  };
}

let clockFaces;

function init() {
  fetch("../clockFaceConfig.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      clockFaces = data.clockFaces;
      console.log(clockFaces);
      const setClockFace = getClockFaceSetter();
      document
        .querySelector("#leftArrow")
        .addEventListener("click", setClockFace);
      document
        .querySelector("#rightArrow")
        .addEventListener("click", () => setClockFace(true));
    });
}

init();
