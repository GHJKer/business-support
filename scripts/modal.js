export function createModal() {
  const openModalBtn = document.getElementById("open-modal-btn");
  const modalWindow = document.getElementById("modal");
  const modalFader = document.getElementById("modal-fader");
  const sendRequest = document.getElementById("close-modal");
  const errorText = document.getElementById("error-text");
  const errorTextPhone = document.getElementById("error-text-tel");
  const nameInput = document.getElementById("name-input");
  const phoneInput = document.getElementById("input-phone");
  const closeButton = document.getElementById("modal-close");

  const errorStatuses = {
    errorClass: "modal-window__error",
    errorClassBottom: "modal-window__error-bottom",
  };

  function checkInput() {
    let isPhoneValid = phoneInput.checkValidity();
    let isNameValid = /[а-яА-Я]/g.test(nameInput.value);

    // проверяем русские буквы
    if (!isNameValid) {
      errorText.classList.add(errorStatuses.errorClass);
      nameInput.classList.add(errorStatuses.errorClassBottom);
      errorText.innerText = "ФИО должно содержать только русские буквы";
    }

    // проверяем пустое ли поле
    if (nameInput.value === "") {
      errorText.classList.add(errorStatuses.errorClass);
      nameInput.classList.add(errorStatuses.errorClassBottom);
      errorText.innerText = "Поле обязательно для заполнения";
    }

    if (isNameValid && nameInput.value.length > 0) {
      errorText.classList.remove(errorStatuses.errorClass);
      nameInput.classList.remove(errorStatuses.errorClassBottom);
    }

    // проверяем пустое ли поле
    if (!isPhoneValid) {
      errorTextPhone.classList.add(errorStatuses.errorClass);
      phoneInput.classList.add(errorStatuses.errorClassBottom);
    } else {
      errorTextPhone.classList.remove(errorStatuses.errorClass);
      phoneInput.classList.remove(errorStatuses.errorClassBottom);
    }
  }

  function toggleModal() {
    modalWindow.classList.toggle("active");
    modalFader.classList.toggle("active");
    // убрать классы ошибок
    errorTextPhone.classList.remove(errorStatuses.errorClass);
    phoneInput.classList.remove(errorStatuses.errorClassBottom);
    errorText.classList.remove(errorStatuses.errorClass);
    nameInput.classList.remove(errorStatuses.errorClassBottom);
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

  closeButton.addEventListener("click", function () {
    toggleModal();
  });
}
