// Modal Functionality
const readMoreButtons = document.querySelectorAll(".read-more");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");

readMoreButtons.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.textContent = button.dataset.title;
    modalText.textContent = button.dataset.content;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
