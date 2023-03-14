export function createSlider() {
  // -- //
  const windowWIdth = window.innerWidth;
  // sliderWindow - расстояние от левой части элемента до левой части экрана
  const sliderWindowDist = document
    .getElementById("slider-window")
    .getBoundingClientRect().left;
  const SliderVisiblePart = windowWIdth - sliderWindowDist;
  // -- //

  let texts = document.querySelectorAll(".info__slide-text-group");

  let progressBar = document.getElementById("black-light");

  let prevItem;
  let itemNum = 1;

  let smallImg = document.getElementById("img-2").getBoundingClientRect().width;
  const slider = document.getElementById("slider");
  const left = document.getElementById("left");
  const right = document.getElementById("right");
  const gap = 20;

  let imgWidth = smallImg + gap;
  let position = 0;

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
    imgWidth = smallImg + gap;
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

  function prev() {
    if (position >= 0) {
      return;
    }

    prevItem = itemNum;
    itemNum -= 1;
    changeImageSize();
    position += imgWidth;
    slider.style.transform = `translate3d(${position}px, 0px, 0px)`;
    progressBar.style.setProperty("--currentSlide", itemNum - 1);
  }

  function next() {
    if (position <= -imgWidth * 4) {
      return;
    }

    prevItem = itemNum;
    itemNum += 1;
    changeImageSize();
    position -= imgWidth;
    slider.style.transform = `translate3d(${position}px, 0px, 0px)`;
    progressBar.style.setProperty("--currentSlide", itemNum - 1);
  }

  left.addEventListener("click", () => {
    prev();
  });

  right.addEventListener("click", () => {
    next();
  });

  // Свайпер
  let isTouchDown = false;
  let getPositionWorking = false;
  let positions = [];

  function getMousePosition(event) {
    positions.push(`${event.changedTouches[0].clientX}`);
    getPositionWorking = false;
  }

  slider.addEventListener("touchmove", function (e) {
    if (isTouchDown) {
      getMousePosition(e);
    }
  });

  slider.addEventListener("touchstart", function () {
    isTouchDown = true;
  });

  slider.addEventListener("touchend", function () {
    isTouchDown = false;
    let positionsDifference = positions[0] - positions[positions.length - 1];
    if (positionsDifference < -imgWidth / 4) {
      prev();
    }
    if (positionsDifference > imgWidth / 4) {
      next();
    }
    positions = [];
  });

  // -- //

  // Добавляем скейл
  texts.forEach(function (elem) {
    elem.addEventListener("mouseover", function () {
      elem.previousElementSibling.classList.add("info__scale");
    });
  });

  texts.forEach(function (elem) {
    elem.addEventListener("mouseleave", function () {
      elem.previousElementSibling.classList.remove("info__scale");
    });
  });

  // -- //
}
