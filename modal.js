export function createModal() {
  const openModalBtn = document.getElementById("open-modal-btn");
  const modalWindow = document.getElementById("modal");
  const modalFader = document.getElementById("modal-fader");
  const closeModalBtn = document.getElementById("close-modal");

  function toggleModal() {
    modalWindow.classList.toggle("active");
    modalFader.classList.toggle("active");
  }

  openModalBtn.addEventListener("click", function () {
    toggleModal();
  });

  closeModalBtn.addEventListener("click", function () {
    toggleModal();
  });

  modalFader.addEventListener("click", function () {
    toggleModal();
  });
}
