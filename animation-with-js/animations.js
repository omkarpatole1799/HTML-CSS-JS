console.log('animations loaded')

const rightSlideInEl = document.querySelectorAll('.right-slide-in')
const leftSlideInEl = document.querySelectorAll('.left-slide-in')

const bottomSlideInEl = document.querySelectorAll('.bottom-slide-in')
const topSlideInEl = document.querySelectorAll('.top-slide-in')

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

bottomSlideInEl.forEach((el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(50px)'
  el.style.transition = 'all 0.5s ease-out'
})

topSlideInEl.forEach((el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(-50px)'
  el.style.transition = 'all 0.5s ease-out'
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

const bottomSlideElObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      } else {
        entry.target.style.opacity = '0'
        entry.target.style.transform = 'translateY(50px)'
      }
    })
  },
  {
    root: null,
    threshold: 0.25,
  }
)

bottomSlideInEl.forEach((el) => {
  bottomSlideElObserver.observe(el)
})

const topSlideElObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      } else {
        entry.target.style.opacity = '0'
        entry.target.style.transform = 'translateY(-50px)'
      }
    })
  },
  {
    root: null,
    threshold: 0.25,
  }
)

topSlideInEl.forEach((el) => {
  topSlideElObserver.observe(el)
})
