const scene = document.getElementById('scene');
const leftCharacter = document.getElementById('leftCharacter');
const rightCharacter = document.getElementById('rightCharacter');
const dialogueBox = document.getElementById('dialogueBox');
const focusImage = document.createElement("img");
focusImage.id = "focusImage";
document.getElementById("scene").appendChild(focusImage);


// Neues Element für Quizantworten
const quizBox = document.createElement('div');
quizBox.id = "quizBox";
quizBox.style.position = "absolute";
quizBox.style.bottom = "30px";
quizBox.style.left = "50%";
quizBox.style.transform = "translateX(-50%)";
quizBox.style.width = "80%";
quizBox.style.display = "none";
quizBox.style.flexDirection = "column";
quizBox.style.gap = "10px";
document.body.appendChild(quizBox);

let dialog = [];
let currentId = null;
let dialogMap = {};
let activeEffectInterval = null; // für wiederholende Effekte


const dialogJson = document.getElementById("dialogData").textContent;
dialog = JSON.parse(dialogJson);

// Indexiere alle Einträge nach ihrer ID
dialog.forEach(entry => {
  if (entry.id) {
    dialogMap[entry.id] = entry;
  }
});

// Starte mit dem ersten Eintrag
currentId = dialog[0].id;
showStep(currentId);

function showStep(id) {
  const entry = dialogMap[id];
  if (!entry) return;

  // Figuren & Hintergrund
  if (entry.bg) scene.style.backgroundImage = `url('../assets/img/${entry.bg}')`;

  if (entry.left !== undefined) {
  if (entry.left) {
    leftCharacter.src = `../assets/img/${entry.left}`;
    leftCharacter.style.opacity = 1;

    // Nur wenn Animation erlaubt ist
    if (entry.leftAnimation) {
      leftCharacter.classList.remove('animate-left');
      void leftCharacter.offsetWidth;
      leftCharacter.classList.add('animate-left');
    } else {
      leftCharacter.classList.remove('animate-left');
    }

  } else {
    leftCharacter.src = "";
    leftCharacter.style.opacity = 0;
    leftCharacter.classList.remove('animate-left');
  }
}


  if (entry.right !== undefined) {
  if (entry.right) {
    rightCharacter.src = `../assets/img/${entry.right}`;
    rightCharacter.style.opacity = 1;

    if (entry.rightAnimation) {
      rightCharacter.classList.remove('animate-right');
      void rightCharacter.offsetWidth;
      rightCharacter.classList.add('animate-right');
    } else {
      rightCharacter.classList.remove('animate-right');
    }

  } else {
    rightCharacter.src = "";
    rightCharacter.style.opacity = 0;
    rightCharacter.classList.remove('animate-right');
  }
}


  if (entry.type === "dialog") {
    dialogueBox.style.display = "block";
    quizBox.style.display = "none";
    dialogueBox.innerHTML = entry.text;
    dialogueBox.onclick = () => {
      if (entry.next) {
        currentId = entry.next;
        showStep(currentId);
      }
    };

  } else if (entry.type === "quiz") {
    dialogueBox.style.display = "none";
    quizBox.innerHTML = "";
    quizBox.style.display = "flex";

    const questionEl = document.createElement("div");
    questionEl.innerHTML = entry.question;
    questionEl.style.background = "rgba(0,0,0,0.7)";
    questionEl.style.color = "#fff";
    questionEl.style.padding = "15px";
    questionEl.style.borderRadius = "10px";
    questionEl.style.textAlign = "center";
    quizBox.appendChild(questionEl);

    entry.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.style.padding = "12px";
      btn.style.fontSize = "16px";
      btn.style.cursor = "pointer";
      btn.style.borderRadius = "8px";
      btn.onclick = () => {
        quizBox.style.display = "none";
        if (choice.goto) {
          currentId = choice.goto;
          showStep(currentId);
        }
      };
      quizBox.appendChild(btn);
    });

  } else if (entry.type === "end") {
    dialogueBox.style.display = "block";
    quizBox.style.display = "none";
    dialogueBox.innerHTML = `${entry.text}<br><br><a href="${entry.button.href}" style="color: #f5c842; text-decoration: underline;">${entry.button.text}</a>`;
    dialogueBox.onclick = null;
  }
  // Effektsteuerung
if (activeEffectInterval) {
  clearInterval(activeEffectInterval);
  activeEffectInterval = null;
}

if (entry.effect) {
  const effect = entry.effect;

  function triggerEffect() {
    if (effect.type === "shake") {
      scene.classList.add("shake");
      setTimeout(() => scene.classList.remove("shake"), 300);
    }
    // Weitere Effekte hier einfügen
  }

  if (effect.repeat) {
    const interval = effect.interval || 5000;
    triggerEffect();
    activeEffectInterval = setInterval(triggerEffect, interval);
  } else {
    triggerEffect();
  }
}
// Zentrales Bild (Objekt im Fokus)
if (entry.focusImage) {
  focusImage.src = `../assets/img/${entry.focusImage}`;
  focusImage.style.display = "block";
} else {
  focusImage.style.display = "none";
}

}
