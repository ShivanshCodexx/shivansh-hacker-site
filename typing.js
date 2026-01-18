const roles = ["STUDENT", "ETHICAL HACKER", "WEB DEVELOPER"];
let index = 0;
let char = 0;
const typing = document.querySelector(".typing");

function type() {
  if (char < roles[index].length) {
    typing.textContent += roles[index][char++];
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (char > 0) {
    typing.textContent = roles[index].substring(0, --char);
    setTimeout(erase, 60);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, 400);
  }
}

type();
