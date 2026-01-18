const text = [
  "Accessing secure server...",
  "Bypassing firewall...",
  "Decrypting data packets...",
  "Access Granted ✔"
];

let i = 0;
const terminalText = document.getElementById("terminal-text");

function typeLine() {
  if (i < text.length) {
    terminalText.innerHTML += text[i] + "\n";
    i++;
    setTimeout(typeLine, 700);
  }
}
typeLine();
