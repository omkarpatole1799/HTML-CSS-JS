const typingContainer = document.querySelector("#quote");
const paragraph =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore accusantium sequi recusandae. Nihil delectus, vel in obcaecati corrupti odit voluptatem quas, sed provident dolorum ipsa animi atque. Ab aut nobis nostrum molestiae exercitationem sapiente voluptatibus, velit modi libero quasi porro. Odit aliquid neque quibusdam nisi nihil repellendus quo corrupti tenetur!";

function addClass(el, className) {
  el.classList.add(className);
}

function removeClass(el, className) {
  el.classList.remove(className);
}

function formatWord(word) {
  // Add a span for each letter and a space at the end
  return `<div class="word">${formatLetter(
    word
  )}<span class="letter space"> </span></div>`;
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

  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
}

document.addEventListener("keyup", function (e) {
  const key = e.key;
  const currentLetter = document.querySelector(".letter.current");
  const currentWord = document.querySelector(".word.current");

  // console.log(currentLetter, "==currentLetter==");
  // console.log(currentWord, "currentWord");

  const expectedLetter = currentLetter.innerHTML;

  console.log(expectedLetter, "==expectedLetter==");

  const isLetter = key.length === 1 && key !== " ";
  const isSpace = key === " ";

  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expectedLetter ? "correct" : "incorrect");
      removeClass(currentLetter, "current");
      addClass(currentLetter.nextSibling, "current");
    }
  }

  if (isSpace) {
      removeClass(currentWord, "current");
      removeClass(currentLetter, "current");
      addClass(currentWord.nextSibling, "current");
      addClass(document.querySelector(".word.current .letter"), "current");
  }
});

newGame();
