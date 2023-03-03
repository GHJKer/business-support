export function createSlider() {
  // -- //
  const windowWIdth = window.innerWidth;
  // sliderWindow - расстояние от левой части элемента до левой части экрана
  const sliderWindowDist = document
    .getElementById("slider-window")
    .getBoundingClientRect().left;
  const SliderVisiblePart = windowWIdth - sliderWindowDist;
  // -- //

  let progressBar = document.getElementById("black-light");

  let prevItem;
  let itemNum = 1;

  let smallImg = document.getElementById("img-2").getBoundingClientRect().width;
  let bigImg = document.getElementById("img-1").getBoundingClientRect().width;
  const slider = document.getElementById("slider");
  const left = document.getElementById("left");
  const right = document.getElementById("right");
  const gap = 20;

  let imgWidth = smallImg + gap;
  let position = 0;
  let sliderButLastSlide =
    slider.getBoundingClientRect().width - imgWidth + gap;

  function changeImageSize() {
    let PrevImgLocal = document.getElementById(`img-${prevItem}`);
    let currentImgLocal = document.getElementById(`img-${itemNum}`);

    PrevImgLocal.classList.toggle("info__img-big");
    currentImgLocal.classList.toggle("info__img-big");
    PrevImgLocal.classList.toggle("info__img");
    currentImgLocal.classList.toggle("info__img");
  }

  // Обновляем размер изображенией в переменных
  function imageVarsControl() {
    smallImg = document.getElementById("img-2").getBoundingClientRect().width;
    bigImg = document.getElementById("img-1").getBoundingClientRect().width;
    imgWidth = smallImg + gap;
    sliderButLastSlide = slider.getBoundingClientRect().width - imgWidth + gap;
  }
  //

  // Контролируем положение слайдера относительно левого края браузера

  function setSliderPosition() {
    imageVarsControl();
    const textBlockDist = document
      .getElementById("text-block")
      .getBoundingClientRect().left;

    const textBlockWidth = document
      .getElementById("text-block")
      .getBoundingClientRect().width;

    document.getElementById("slider-window").style.left = `${
      textBlockDist + textBlockWidth + 20
    }px`;
  }

  window.addEventListener("resize", setSliderPosition);

  // -- //

  setSliderPosition();

  left.onclick = function prev() {
    if (position >= 0) {
      return;
    }

    prevItem = itemNum;
    itemNum -= 1;
    changeImageSize();
    position += imgWidth;
    slider.style.transform = `translate3d(${position}px, 0px, 0px)`;
    progressBar.style.setProperty("--currentSlide", itemNum - 1);
  };

  right.onclick = function next() {
    if (position <= -imgWidth * 4) {
      return;
    }

    prevItem = itemNum;
    itemNum += 1;
    changeImageSize();
    position -= imgWidth;
    slider.style.transform = `translate3d(${position}px, 0px, 0px)`;
    progressBar.style.setProperty("--currentSlide", itemNum - 1);
  };

  // let isMouseDown = false;

  // function getMousePosition(event) {
  //   setTimeout(() => {
  //     console.log(`mouse location = X: ${event.x}`);
  //   }, 1000);
  // }

  // onmousemove = function (e) {
  //   if (isMouseDown) {
  //     // console.log(`mouse location = X: ${e.x}`);
  //     getMousePosition(e);
  //   }
  // };

  // onmouseup = function () {
  //   isMouseDown = false;
  // };

  // slider.addEventListener("mousedown", function () {
  //   isMouseDown = true;
  //   console.log("down");
  // });

  // slider.addEventListener("mouseup", function () {
  //   isMouseDown = false;
  //   console.log("up");
  // });
}
