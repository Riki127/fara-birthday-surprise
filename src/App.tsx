import { useState } from 'react'
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

  const begin = () => {
    setStarted(true)
    const next = document.querySelector('.page:nth-of-type(2)')
    if (next) {
      (next as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    }
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
    </>
  )
}

export default App
