import { useEffect, useState, useRef } from 'react'
import './App.css'
import { loveLetters } from './loveLetters'

function Surprise({ onClose }: { onClose: () => void }) {
  return (
    <div className="surprise-popup">
      <div className="surprise-content">
        <h2>🎁 Surprise! 🎁</h2>
        <p>Hope you like this little animation page 😘</p>
        <button className="surprise-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

function LoveLetter({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="love-letter-modal">
      <div className="love-letter-content">
        <button className="close-letter-btn" onClick={onClose}>✕</button>
        <p>{message}</p>
      </div>
    </div>
  )
}

function LetterConfirmation({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="love-letter-modal">
      <div className="love-letter-content">
        <h2>💌 New Love Letter 💌</h2>
        <p>You have a new love letter! Do you want to open it?</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm}>Yes, open it! 💕</button>
          <button onClick={onClose}>Not now</button>
        </div>
      </div>
    </div>
  )
}

function ImageModal({ imageSrc, onClose }: { imageSrc: string; onClose: () => void }) {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>✕</button>
        <img src={imageSrc} alt="enlarged" className="enlarged-image" />
      </div>
    </div>
  )
}

function CountersPage() {
  const [, setUpdate] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdate((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const calculateTimeDiff = (targetDate: string) => {
    const now = new Date()
    const target = new Date(targetDate)
    const diff = target.getTime() - now.getTime()
    const isFuture = diff > 0
    const absDiff = Math.abs(diff)
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((absDiff / (1000 * 60)) % 60)
    const seconds = Math.floor((absDiff / 1000) % 60)
    return { days, hours, minutes, seconds, isFuture }
  }

  const firstMet = calculateTimeDiff('2024-06-19')
  const becameCouple = calculateTimeDiff('2024-12-08')
  const proposal = calculateTimeDiff('2025-07-24')
  const lastTimeTogether = calculateTimeDiff('2026-02-16')
  const wedding = calculateTimeDiff('2026-11-21')

  return (
    <div className="counters-section">
      <h2>💕 Our Journey Together 💕</h2>
      <div className="counters-grid">
        <div className="counter-card">
          <h3>First Met</h3>
          <div className="counter-value">{firstMet.days}</div>
          <p className="counter-label">Days knowing each other</p>
          <p className="counter-date">Since 2024-06-19</p>
        </div>
        <div className="counter-card">
          <h3>Became Couple</h3>
          <div className="counter-value">{becameCouple.days}</div>
          <p className="counter-label">Days as a Couple</p>
          <p className="counter-date">Since 2024-12-08</p>
        </div>
        <div className="counter-card">
          <h3>Proposal</h3>
          <div className="counter-value">{proposal.days}</div>
          <p className="counter-label">Days Engaged</p>
          <p className="counter-date">Since 2025-07-24</p>
        </div>
        <div className="counter-card">
          <h3>Last Time Together</h3>
          <div className="counter-value">{lastTimeTogether.days}</div>
          <p className="counter-label">Days Since We Met</p>
          <p className="counter-date">2026-02-16</p>
        </div>
        <div className="counter-card wedding-countdown">
          <h3>💒 Wedding 💒</h3>
          <div className="wedding-timer">
            <div className="time-unit">
              <div className="time-value">{String(wedding.days).padStart(2, '0')}</div>
              <p className="time-label">Days</p>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <div className="time-value">{String(wedding.hours).padStart(2, '0')}</div>
              <p className="time-label">Hrs</p>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <div className="time-value">{String(wedding.minutes).padStart(2, '0')}</div>
              <p className="time-label">Min</p>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <div className="time-value">{String(wedding.seconds).padStart(2, '0')}</div>
              <p className="time-label">Sec</p>
            </div>
          </div>
          <p className="counter-label">Until Our Big Day!</p>
          <p className="counter-date">2026-11-21</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [showSurprise, setShowSurprise] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null)
  const [showLetterConfirmation, setShowLetterConfirmation] = useState(false)
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const [carouselSlide, setCarouselSlide] = useState(0)
  const [songCarouselSlide, setSongCarouselSlide] = useState(0)
  // refs for each page
  const pageRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const firstPage = document.querySelector('.page:first-of-type')
    if (!firstPage) return
    const addAnimations = () => {
      const elements = firstPage.querySelectorAll('.rotated-image, h1, p, .start-btn')
      elements.forEach((el) => {
        el.classList.remove('animate-bounce')
        void (el as HTMLElement).offsetWidth
        el.classList.add('animate-bounce')
      })
    }
    addAnimations()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) addAnimations()
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(firstPage)
    return () => observer.disconnect()
  }, [])

  const begin = () => {
    setShowSurprise(true)
    setTimeout(() => scrollToPage(1), 500)
  }

  const closeSurprise = () => {
    setShowSurprise(false)
  }

  // scroll to a page by index
  const scrollToPage = (idx: number) => {
    const ref = pageRefs[idx].current
    if (ref) {
      (ref as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* static background layer */}
      <div className="background">
        <div className="hearts">
          {Array.from({ length: 20 }).map((_, i) => {
            const drift = Math.floor(Math.random() * 300) - 150
            const duration = (Math.random() * 4 + 4).toFixed(2)
            const start = Math.floor(Math.random() * 100)
            const size = (Math.random() * 3.5 + 1.5).toFixed(2)
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
            )
          })}
        </div>
      </div>
      <div className="container">
        <section className="page" ref={pageRefs[0]}>
          <img src="/src/assets/1.jpg" alt="birthday gift" className="rotated-image" />
          <h1>Happy birthday my love! 💚</h1>
          <p>🎉 Welcome to your special surprise page 🎂</p>
          <button className="start-btn" onClick={begin}>Start the surprise!</button>
        </section>
        <section className="page" ref={pageRefs[1]}>
          <CountersPage />
          <div className="button-group">
            <button onClick={() => scrollToPage(0)}>Previous</button>
            <button onClick={() => scrollToPage(2)}>Next</button>
          </div>
        </section>
        <section className="page" ref={pageRefs[2]}>
          <h2>✨ Gallery Page ✨</h2>
          <div className="carousel-container">
            <div className="carousel-slides">
              {/* Slide 1 */}
              <div className={`carousel-slide ${carouselSlide === 0 ? 'active' : ''}`}>
                <h3>Memories Together</h3>
                <div className="polaroid-gallery">
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 1" />
                    <p>Memory 1</p>
                  </div>
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 2" />
                    <p>Memory 2</p>
                  </div>
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 3" />
                    <p>Memory 3</p>
                  </div>
                </div>
              </div>
              {/* Slide 2 */}
              <div className={`carousel-slide ${carouselSlide === 1 ? 'active' : ''}`}>
                <h3>Our Adventures</h3>
                <div className="polaroid-gallery">
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 4" />
                    <p>Memory 4</p>
                  </div>
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 5" />
                    <p>Memory 5</p>
                  </div>
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 6" />
                    <p>Memory 6</p>
                  </div>
                </div>
              </div>
              {/* Slide 3 */}
              <div className={`carousel-slide ${carouselSlide === 2 ? 'active' : ''}`}>
                <h3>Special Moments</h3>
                <div className="polaroid-gallery">
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 7" />
                    <p>Memory 7</p>
                  </div>
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 8" />
                    <p>Memory 8</p>
                  </div>
                  <div className="polaroid" onClick={() => setEnlargedImage('/src/assets/1.jpg')}>
                    <img src="/src/assets/1.jpg" alt="memory 9" />
                    <p>Memory 9</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-controls">
              <button 
                className="carousel-btn" 
                onClick={() => setCarouselSlide((carouselSlide - 1 + 3) % 3)}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <span className="carousel-indicator">
                Slide {carouselSlide + 1} of 3
              </span>
              <button 
                className="carousel-btn" 
                onClick={() => setCarouselSlide((carouselSlide + 1) % 3)}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="button-group">
            <button onClick={() => scrollToPage(1)}>Previous</button>
            <button onClick={() => scrollToPage(3)}>Next</button>
          </div>
        </section>
        <section className="page" ref={pageRefs[3]}>
          <h2>🎵 Our Special Songs 🎵</h2>
          <div className="carousel-container">
            <div className="carousel-slides">
              {/* Slide 1 */}
              <div className={`carousel-slide ${songCarouselSlide === 0 ? 'active' : ''}`}>
                <h3>First Song Shared</h3>
                <div className="songs-container">
                  <div className="song-item">
                    <div className="youtube-embed">
                      <iframe width="500" height="400" src="https://www.youtube.com/embed/" title="Love Song 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <h3>Your song</h3>
                    <p>Add some notes or description about this song here...</p>
                  </div>
                  <div className="song-item">
                    <div className="youtube-embed">
                      <iframe width="500" height="400" src="https://www.youtube.com/embed/" title="Love Song 2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <h3>My song</h3>
                    <p>Add some notes or description about this song here...</p>
                  </div>
                </div>
              </div>
              {/* Slide 2 */}
              <div className={`carousel-slide ${songCarouselSlide === 1 ? 'active' : ''}`}>
                <h3>Favorite Songs</h3>
                <div className="songs-container">
                  <div className="song-item">
                    <div className="youtube-embed">
                      <iframe width="500" height="400" src="https://www.youtube.com/embed/" title="Favorite Song 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <h3>Song one</h3>
                    <p>Add some notes or description about this song here...</p>
                  </div>
                </div>
              </div>
              {/* Slide 3 */}
              <div className={`carousel-slide ${songCarouselSlide === 2 ? 'active' : ''}`}>
                <h3>Spotify Playlists</h3>
                <div className="songs-container">
                  <div className="song-item">
                    <div className="spotify-embed">
                      <iframe data-testid="embed-iframe" style={{ borderRadius: '12px' }} src="https://open.spotify.com/embed/playlist/0MbVxCvEG7DxqMB29vVFbl?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                    <h3>Our Playlist</h3>
                    <p>Add some notes or description about this playlist here...</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-controls">
              <button 
                className="carousel-btn" 
                onClick={() => setSongCarouselSlide((songCarouselSlide - 1 + 3) % 3)}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <span className="carousel-indicator">
                Slide {songCarouselSlide + 1} of 3
              </span>
              <button 
                className="carousel-btn" 
                onClick={() => setSongCarouselSlide((songCarouselSlide + 1) % 3)}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="button-group">
            <button onClick={() => scrollToPage(2)}>Previous</button>
            <button onClick={() => scrollToPage(4)}>Next</button>
          </div>
        </section>
        <section className="page" ref={pageRefs[4]}>
          <h2>💕 Love Letters 💕</h2>
          <div className="love-letters-container">
            <div className="love-letter-card open" onClick={() => setSelectedLetter(0)}>
              <img src="/src/assets/love-letter.png" alt="love letter 1" />
              <p>First love letter</p>
            </div>
            <div className="love-letter-card open" onClick={() => setSelectedLetter(1)}>
              <img src="/src/assets/love-letter.png" alt="love letter 2" />
              <p>1 Year anniversary</p>
            </div>
            <div className="love-letter-card closed" onClick={() => setShowLetterConfirmation(true)}>
              <img src="/src/assets/love-letter-closed.png" alt="love letter 3" />
              <p>Happy birthday love letter</p>
            </div>
          </div>
          <div className="button-group">
            <button onClick={() => scrollToPage(3)}>Previous</button>
            <button onClick={() => scrollToPage(5)}>Next</button>
          </div>
        </section>
        <section className="page" ref={pageRefs[5]}>
          <h2>Future Bucket List 🎯</h2>
          <div className="bucket-list-container">
            <ul className="bucket-list">
              <li className="completed">✅ Sweden trip ✈️</li>
              <li>Having our honeymoon in Japan 🇯🇵</li>
              <li>Traveling to London 🇬🇧</li>
              <li>Excercise together 🏋️‍♂️</li>
              <li>Having a highschool musical moment together 🎭</li>
              <li>Buying a new house 🏡</li>
              <li>Having kids 👶</li>
              <li>Grow old together and still be in love 👴👵</li>
              <p>And many more adventures to come 💕</p>
            </ul>
          </div>
          <div className="button-group">
            <button onClick={() => scrollToPage(4)}>Previous</button>
            <button onClick={() => scrollToPage(6)}>Next</button>
          </div>
        </section>
        <section className="page" ref={pageRefs[6]}>
          <h2>🌟 Page 5 🌟</h2>
          <p>Another page for your birthday memories and wishes!</p>
          <div className="button-group">
            <button onClick={() => scrollToPage(5)}>Previous</button>
            <button onClick={() => scrollToPage(7)}>Next</button>
          </div>
        </section>
        <section className="page" ref={pageRefs[7]}>
          <p className="final-page-quote">I know what I want, what kind of person I need to be — for you, for us.</p>
          <img src="/src/assets/endgame.png" alt="endgame" className="endgame-image" />
          <p className="final-page-quote">Thank you choosing me sayang, and remember... <br></br>Love you more than the most 💚</p>
        </section>
      </div>
      <button className="scroll-to-top" onClick={() => scrollToPage(0)}>
        <i className="fas fa-arrow-up"></i>
      </button>
      {showSurprise && <Surprise onClose={closeSurprise} />}
      {showLetterConfirmation && (
        <LetterConfirmation
          onConfirm={() => {
            setShowLetterConfirmation(false)
            setSelectedLetter(2)
          }}
          onClose={() => setShowLetterConfirmation(false)}
        />
      )}
      {selectedLetter !== null && (
        <LoveLetter
          message={loveLetters[selectedLetter]}
          onClose={() => setSelectedLetter(null)}
        />
      )}
      {enlargedImage && (
        <ImageModal
          imageSrc={enlargedImage}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </>
  )
}

export default App
