const words = [
  "UI / UX Design",
  "Digital Marketing",
  "Content Strategy",
  "Product Thinking"
];

let i = 0;
const el = document.getElementById("rotating-text");

setInterval(() => {
  i = (i + 1) % words.length;
  el.style.opacity = 0;

  setTimeout(() => {
    el.textContent = words[i];
    el.style.opacity = 1;
  }, 200);

}, 3000);