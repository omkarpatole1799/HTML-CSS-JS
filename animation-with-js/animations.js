console.log('animations loaded')

const rightSlideInEl = document.querySelectorAll('.right-slide-in')
const leftSlideInEl = document.querySelectorAll('.left-slide-in')

rightSlideInEl.forEach((el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateX(50px)'
  el.style.transition = 'all 0.35s ease-out'
})

leftSlideInEl.forEach((el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateX(-50px)'
  el.style.transition = 'all 0.35s ease-out'
})

const slideElObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateX(0px)'
      } else {
        if (entry.target.classList[0] === 'left-slide-in') {
          entry.target.style.opacity = '0'
          entry.target.style.transform = 'translateX(-50px)'
        } else {
          entry.target.style.opacity = '0'
          entry.target.style.transform = 'translateX(50px)'
        }
      }
    })
  },
  {
    root: null,
    threshold: 0.25,
  }
)

rightSlideInEl.forEach((el) => {
  slideElObserver.observe(el)
})

leftSlideInEl.forEach((el) => {
  slideElObserver.observe(el)
})
