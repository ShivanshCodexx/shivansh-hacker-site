const terminalText = document.getElementById("terminal-text");
const terminal = document.getElementById("terminal");

const lines = [
  "Initializing system...",
  "Connecting to server...",
  "Bypassing firewall...",
  "Accessing data stream...",
  "Verifying identity...",
  "ACCESS GRANTED ✔"
];

let line = 0;

function typeLine() {
  if (line < lines.length) {
    terminalText.innerHTML += lines[line] + "\n";
    line++;
    setTimeout(typeLine, 700);
  } else {
    setTimeout(() => {
      terminal.style.display = "none";
      document.getElementById("loader").style.display = "flex";
    }, 1000);
  }
}

typeLine();
