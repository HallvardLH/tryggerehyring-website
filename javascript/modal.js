function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}