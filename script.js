let bucket4 = 0;
let bucket11 = 0;

function updateDisplay() {
  document.getElementById("bucket4").innerText = bucket4;
  document.getElementById("bucket11").innerText = bucket11;

  if (bucket4 === 7 || bucket11 === 7) {
    document.getElementById("message").innerText = "🎉 Glückwunsch! Du hast 7 Liter!";
  } else {
    document.getElementById("message").innerText = "";
  }
}

function fill(size) {
  if (size === 4) bucket4 = 4;
  if (size === 11) bucket11 = 11;
  updateDisplay();
}

function empty(size) {
  if (size === 4) bucket4 = 0;
  if (size === 11) bucket11 = 0;
  updateDisplay();
}

function pour(fromSize, toSize) {
  let from = fromSize === 4 ? bucket4 : bucket11;
  let to = toSize === 4 ? bucket4 : bucket11;
  let toMax = toSize;

  let pourAmount = Math.min(from, toMax - to);
  from -= pourAmount;
  to += pourAmount;

  if (fromSize === 4) bucket4 = from; else bucket11 = from;
  if (toSize === 4) bucket4 = to; else bucket11 = to;

  updateDisplay();
}

updateDisplay();
