const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const observerRight = new IntersectionObserver((entries) => {
  console.log(entries, 'from right')
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-right')
    } else {
      entry.target.classList.remove('show-right')
    }
  })
})

const hiddenElements = document.querySelectorAll('.hidden')

hiddenElements.forEach((el) => observer.observe(el))

const rightHidden = document.querySelector('.hidden-right')

observerRight.observe(rightHidden)

console.log('script loaded')
