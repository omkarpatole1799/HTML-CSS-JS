const typingContainer = document.querySelector("#quote");
const paragraph =
  "lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore accusantium sequi recusandae. Nihil delectus, vel in obcaecati corrupti odit voluptatem quas, sed provident dolorum ipsa animi atque. Ab aut nobis nostrum molestiae exercitationem sapiente voluptatibus, velit modi libero quasi porro. Odit aliquid neque quibusdam nisi nihil repellendus quo corrupti tenetur!";

function addClass(el, className) {
  className.forEach(_class => {
    if (!el) return;
    el.classList.add(_class);
  });
}

function removeClass(el, className) {
  className.forEach(_class => {
    if (!el) return;
    el.classList.remove(_class);
  });
}

function formatWord(word) {
  // Add a span for each letter and a space at the end
  return `<div class="word">${formatLetter(
    word
  )}<span class="space letter"></span></div>`;
}

function formatLetter(word) {
  let html = "";
  word.split("").forEach(letter => {
    html += `<span class="letter">${letter}</span>`;
  });
  return html;
}

function newGame() {
  typingContainer.innerHTML = "";
  paragraph.split(" ").forEach(word => {
    typingContainer.innerHTML += formatWord(word);
    // typingContainer.innerHTML += " ";
  });

  addClass(document.querySelector(".word"), ["current"]);
  addClass(document.querySelector(".letter"), ["current"]);
}

document.addEventListener("keyup", function (e) {
  const key = e.key;
  const currentLetter = document.querySelector(".letter.current");
  const currentWord = document.querySelector(".word.current");

  const expectedLetter = currentLetter?.innerHTML;

  console.log(expectedLetter, "==expectedLetter==");

  const isLetter = key.length === 1 && key !== " ";
  const isSpaceKey = key === " ";
  const isBackspace = key === "Backspace";

  if (isLetter && expectedLetter) {
    if (currentLetter) {
      addClass(
        currentLetter,
        key === expectedLetter ? ["correct"] : ["incorrect"]
      );
      removeClass(currentLetter, ["current"]);
      addClass(currentLetter?.nextSibling, ["current"]);
    }
  }

  if (isSpaceKey) {
    const lettersToMarkIncorrect = [
      ...document.querySelectorAll(".word.current .letter:not(.correct)"),
    ];
    if (lettersToMarkIncorrect) {
      lettersToMarkIncorrect.forEach(letter => {
        addClass(letter, ["incorrect"]);
      });
    }

    removeClass(currentWord, ["current"]);
    removeClass(currentLetter, ["current"]);

    addClass(currentWord.nextElementSibling, ["current"]);
    addClass(currentWord.nextElementSibling.firstElementChild, ["current"]);
  }

  if (isBackspace) {
    // TODO: (Omkar) if all letters are correct for current word dont allow backspace

    const isPreviousSiblingAvailable = currentLetter?.previousElementSibling;
    console.log(isPreviousSiblingAvailable, "==isPreviousSiblingAvailable==");
    if (isPreviousSiblingAvailable) {
      removeClass(currentLetter, ["correct", "incorrect", "current"]);
      addClass(currentLetter.previousElementSibling, ["current"]);
      removeClass(currentLetter.previousElementSibling, [
        "correct",
        "incorrect",
      ]);
    } else {
      // check any incorrect words in previous word
      const previousWord = currentWord.previousElementSibling;
      if (previousWord) {
        removeClass(currentWord, ["current"]);
        removeClass(currentLetter, ["current", "correct", "incorrect"]);

        addClass(previousWord, ["current"]);
        addClass(previousWord.lastElementChild, ["current"]);
        removeClass(previousWord.lastElementChild, ["correct", "incorrect"]);
      }
    }
  }
});

newGame();
