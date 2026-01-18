const text = "Access Granted... Welcome Hacker.";
let index = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 80);
  }
}

window.startTyping = typeEffect;
