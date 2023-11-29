console.log('script loaded')

const heroSectionObserver = new IntersectionObserver(
  (entries) => {
    const ent = entries[0]

    console.log(ent)
    if (ent.isIntersecting) {
      console.log('intersecting')
      // ent.target.classList.add('sticky-nav')
      // setTimeout(() => {}, 200)
      document.querySelector('.section-header').classList.remove('sticky-nav')
    } else {
      console.log('not intersecting')
      // ent.target.classList.remove('sticky-nav')
      // setTimeout(() => {}, 200)
      document.querySelector('.section-header').classList.add('sticky-nav')
    }
  },
  {
    root: null,
    rootMargin: '0px 0px -95px 0px',
    threshold: 0.22,
  }
)

const heroSection = document.querySelector('.section-hero')
heroSectionObserver.observe(heroSection)
