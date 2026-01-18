document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal");
  const loader = document.getElementById("loader");
  const main = document.getElementById("main");

  terminal.style.display = "block";
  loader.style.display = "none";
  main.style.display = "none";

  setTimeout(() => {
    terminal.style.display = "none";
    loader.style.display = "flex";
  }, 3000);

  setTimeout(() => {
    loader.style.display = "none";
    main.style.display = "block";
  }, 5500);
});
