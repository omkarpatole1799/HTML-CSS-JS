// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     // console.log(entry)
//     if (entry.isIntersecting) {
//       entry.target.classList.add('show')
//     } else {
//       entry.target.classList.remove('show')
//     }
//   })
// })

const observerRight = new IntersectionObserver((entries) => {
  console.log(entries, 'from right')
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let el = entry.target
      el.style.transform = 'translateX(0)'
      el.style.opacity = '1'
      el.style.filter = 'blur(0)'
      el.style.backgroundColor = '#fff'
      // transform: translateX(0);
      // opacity: 1;
      // filter: blur(0);
      // background-color: #fff;

      // entry.target.classList.add('show-right')
    } else {
      // entry.target.classList.remove('show-right')
      let el = entry.target
      el.style.transform = 'translateX(100%)'
      el.style.opacity = '0'
      el.style.filter = 'blur(-10px)'
      // el.style.backgroundColor = '#fff'
    }
  })
})

// const hiddenElements = document.querySelectorAll('.hidden')

// hiddenElements.forEach((el) => observer.observe(el))

const rightHidden = document.querySelector('.hidden-right')

observerRight.observe(rightHidden)

console.log('script loaded')

function scrollUpHandler() {
  let infoPara = document.querySelector('.info-para')
  let infoParaPosition = infoPara.getBoundingClientRect().top // this gives us the positoin from top

  let screenPosition = window.innerHeight / 1.2

  if (infoParaPosition < screenPosition) {
    infoPara.classList.add('show-info-para')
  } else {
    infoPara.classList.remove('show-info-para')
  }
  // console.log(screenPosition)
  // console.log(infoParaPosition)
}

window.addEventListener('scroll', scrollUpHandler)
