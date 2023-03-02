export function createModal() {
  const openModalBtn = document.getElementById("open-modal-btn");
  const modalWindow = document.getElementById("modal");
  const modalFader = document.getElementById("modal-fader");
  const sendRequest = document.getElementById("close-modal");
  const errorText = document.getElementById("error-text");
  const errorTextPhone = document.getElementById("error-text-tel");
  const nameInput = document.getElementById("name-input");
  const phoneInput = document.getElementById("input-phone");

  function checkInput() {
    let isPhoneValid = phoneInput.checkValidity();
    let isNameValid = /[а-яА-Я]/g.test(nameInput.value);

    // проверяем русские буквы
    if (!isNameValid) {
      errorText.classList.add("modal-window__error");
      nameInput.classList.add("modal-window__error-bottom");
      errorText.innerText = "ФИО должно содержать только русские буквы";
      console.log("1");
    }

    // проверяем пустое ли поле
    if (nameInput.value === "") {
      errorText.classList.add("modal-window__error");
      nameInput.classList.add("modal-window__error-bottom");
      errorText.innerText = "Поле обязательно для заполнения";
      console.log("2");
    }

    if (isNameValid && nameInput.value.length > 0) {
      errorText.classList.remove("modal-window__error");
      nameInput.classList.remove("modal-window__error-bottom");
    }

    // проверяем пустое ли поле
    if (!isPhoneValid) {
      errorTextPhone.classList.add("modal-window__error");
      phoneInput.classList.add("modal-window__error-bottom");
      console.log("21");
    } else {
      errorTextPhone.classList.remove("modal-window__error");
      phoneInput.classList.remove("modal-window__error-bottom");
      console.log("22");
    }
  }

  function toggleModal() {
    modalWindow.classList.toggle("active");
    modalFader.classList.toggle("active");
    // убрать классы ошибок
    errorTextPhone.classList.remove("modal-window__error");
    phoneInput.classList.remove("modal-window__error-bottom");
    errorText.classList.remove("modal-window__error");
    nameInput.classList.remove("modal-window__error-bottom");
    // зачистить инпуты
    phoneInput.value = "";
    nameInput.value = "";
  }

  openModalBtn.addEventListener("click", function () {
    toggleModal();
  });

  sendRequest.addEventListener("click", function () {
    checkInput();
  });

  modalFader.addEventListener("click", function () {
    toggleModal();
  });
}
