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

    if (!isNameValid) {
      errorText.classList.add("modal-window__error");
      nameInput.classList.add("modal-window__error-bottom");
    } else {
      errorText.classList.remove("modal-window__error");
      nameInput.classList.remove("modal-window__error-bottom");
    }

    if (!isPhoneValid) {
      errorTextPhone.classList.add("modal-window__error");
      phoneInput.classList.add("modal-window__error-bottom");
    } else {
      errorTextPhone.classList.remove("modal-window__error");
      phoneInput.classList.remove("modal-window__error-bottom");
    }
  }

  function toggleModal() {
    modalWindow.classList.toggle("active");
    modalFader.classList.toggle("active");
    errorTextPhone.classList.remove("modal-window__error");
    phoneInput.classList.remove("modal-window__error-bottom");
    errorText.classList.remove("modal-window__error");
    nameInput.classList.remove("modal-window__error-bottom");
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
