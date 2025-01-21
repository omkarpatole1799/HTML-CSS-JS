const typingContainer = document.querySelector("#quote");
const paragraph =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore accusantium sequi recusandae. Nihil delectus, vel in obcaecati corrupti odit voluptatem quas, sed provident dolorum ipsa animi atque. Ab aut nobis nostrum molestiae exercitationem sapiente voluptatibus, velit modi libero quasi porro. Odit aliquid neque quibusdam nisi nihil repellendus quo corrupti tenetur!";

let html = "";

paragraph.split(" ").forEach(word => {
  html += formatWord(word);
});

function formatWord(word) {
  return `<div class="word"><span class="letter">${word
    .split("")
    .join('</span><span class="letter">')}</span> </div>`;
}

typingContainer.innerHTML = html;
