window.addEventListener("DOMContentLoaded", () => {
  let boldBtn = document.querySelector("#bold-btn")
  let editor = document.querySelector(".editor")
  let text = ""

  let selectionStart
  let selectionEnd

  editor.addEventListener("keyup", function () {
    text = editor.innerHTML
    renderText(text)
  })

  boldBtn.addEventListener("click", function (event) {
    let selection = window.getSelection()
    selectionStart = selection.anchorOffset
    selectionEnd = selection.focusOffset
    makeSelectionBold(selectionStart, selectionEnd)
  })

  function makeSelectionBold(start, end) {
    text =
      text.slice(0, start) +
      `<strong>` +
      text.slice(start, end) +
      "</strong>" +
      text.slice(end)

    renderText(text)
  }

  function renderText(text) {
    text = "<p>" + text + "</p>"
    console.log(text)
  }
})
