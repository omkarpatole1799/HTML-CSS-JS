let els = document.querySelectorAll('.el')

let right = document.querySelector('.right')
let left = document.querySelector('.left')

els.forEach((el)=>{
	el.addEventListener('dragstart',(e)=>{
		console.log('dragStart')
		let selected = e.target;

		right.addEventListener('dragover',(e)=>{
			e.preventDefault()
		})

		right.addEventListener('drop',(e)=>{
			right.appendChild(selected)
			selected = null
		})

		left.addEventListener('dragover',e=>{
			e.preventDefault()
		})

		left.addEventListener('drop',e=>{
			left.appendChild(selected)
			selected=null
		})
	})
})