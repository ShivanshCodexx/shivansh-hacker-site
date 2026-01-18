window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.querySelector(".terminal").classList.remove("hidden");
    window.startTyping();
  }, 2500);
});
