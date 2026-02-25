import { useState, useEffect } from 'react'
import './App.css'

function Surprise() {
  return (
    <div className="surprise">
      <h2>🎁 Surprise! 🎁</h2>
      <p>Hope you like this little animation page 😘</p>
    </div>
  )
}

function App() {
  // keep state if you need it later, but not required for scrolling
  const [started, setStarted] = useState(false)

  // use effect to set up intersection observer for animation replay
  useEffect(() => {
    const firstPage = document.querySelector('.page:first-of-type')
    if (!firstPage) return

    const addAnimations = () => {
      const elements = firstPage.querySelectorAll('.rotated-image, h1, p, .start-btn')
      elements.forEach((el) => {
        el.classList.remove('animate-bounce')
        // trigger reflow to force animation restart
        void (el as HTMLElement).offsetWidth
        el.classList.add('animate-bounce')
      })
    }

    // add animations on initial mount
    addAnimations()

    // also set up intersection observer to replay when page comes back into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addAnimations()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(firstPage)
    return () => observer.disconnect()
  }, [])

  const begin = () => {
    setStarted(true)
    const next = document.querySelector('.page:nth-of-type(2)')
    if (next) {
      (next as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    // try multiple scroll targets for maximum compatibility
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* static background layer */}
      <div className="background">
        <div className="hearts">
          {Array.from({ length: 20 }).map((_, i) => {
            const drift = Math.floor(Math.random() * 300) - 150; // horizontal shift
            const duration = (Math.random() * 4 + 4).toFixed(2); // 4–8s
            const start = Math.floor(Math.random() * 100); // start % across width
            const size = (Math.random() * 3.5 + 1.5).toFixed(2); // 1.5–5rem
            return (
              <span
                key={i}
                className="heart"
                style={{
                  '--drift': `${drift}px`,
                  '--duration': `${duration}s`,
                  '--size': `${size}rem`,
                  left: `${start}%`
                } as any}
              />
            );
          })}
        </div>
      </div>

      {/* content layer uses natural page scrolling */}
      <div className="container">
        {/* first section: initial greeting */}
        <section className="page">
          <img src="/src/assets/1.jpg" alt="birthday gift" className="rotated-image" />
          <h1>Happy birthday my love! 💚</h1>
          <p>🎉 Welcome to your special surprise page 🎂</p>
          <button className="start-btn" onClick={begin}>
            Start
          </button>
        </section>

        {/* second section: surprise content */}
        <section className="page">
          <Surprise />
        </section>
      </div>

      {/* scroll to top button */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  )
}

export default App
