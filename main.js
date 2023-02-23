import "./styles/style.scss";

// -- //
const windowWIdth = window.innerWidth;
// sliderWindow - расстояние от левой части элемента до левой части экрана
const sliderWindow = document
  .getElementById("slider-window")
  .getBoundingClientRect().left;
const SliderVisiblePart = windowWIdth - sliderWindow;
// -- //

let progressBar = document.getElementById("progress-bar");

let prevItem;
let itemNum = 1;

const smallImg = document.getElementById("img-2").getBoundingClientRect().width;
const bigImg = document.getElementById("img-1").getBoundingClientRect().width;
const slider = document.getElementById("slider");
const left = document.getElementById("left");
const right = document.getElementById("right");
const gap = 20;

let imgWidth = smallImg + gap;
let position = 0;
const sliderButLastSlide =
  slider.getBoundingClientRect().width - imgWidth + gap;

function changeImageSize() {
  let PrevImgLocal = document.getElementById(`img-${prevItem}`);
  let currentImgLocal = document.getElementById(`img-${itemNum}`);

  PrevImgLocal.classList.toggle("info__img-big");
  currentImgLocal.classList.toggle("info__img-big");
}

left.onclick = function prev() {
  if (position >= 0) {
    return;
  } else {
    prevItem = itemNum;
    itemNum -= 1;
    changeImageSize();
    position += imgWidth;
    slider.style.transform = `translate3d(${position}px, 0px, 0px)`;
    progressBar.style.setProperty("--currentSlide", itemNum - 1);
  }
};

right.onclick = function next() {
  if (position <= -sliderButLastSlide + bigImg - smallImg) {
    return;
  } else {
    prevItem = itemNum;
    itemNum += 1;
    changeImageSize();
    position -= imgWidth;
    slider.style.transform = `translate3d(${position}px, 0px, 0px)`;
    progressBar.style.setProperty("--currentSlide", itemNum - 1);
  }
};
