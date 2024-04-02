window.addEventListener('DOMContentLoaded',()=>{
	let boldBtn = document.querySelector('#bold-btn')
	let editor = document.querySelector('.editor')
	let text ='' 

	let selectionStart
	let selectionEnd

	editor.addEventListener('keyup', function(){
		text = editor.innerHTML
		if (text.length == 1) {
			text = `<p>${text}</p>`
		} else {
			text = text
		}
		
		console.log(text)
		renderText(text)
	})

	boldBtn.addEventListener('click', function(event){
		let selection = window.getSelection()
		selectionStart = selection.anchorOffset
		selectionEnd = selection.focusOffset
		console.log(selection)
		console.log(selectionStart)
		console.log(selectionEnd)

		insertString(selectionStart,selectionEnd)
	})

	function insertString(start, end){
		text = text.slice(0, start) + `<strong>`+ text.slice(end) 
		text = text.slice(0, end) + `</strong>` + text.slice(end)

		renderText(text)
	}

	function renderText(text) {
		editor.innerHTML = text
		// editor.insertAdjacentElement("beforeend",text)
	}

})