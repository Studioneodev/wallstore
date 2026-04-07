import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function WelcomePage() {
  const navigate = useNavigate()
  const [showFlash, setShowFlash] = useState(false)
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      opacity: Math.random() * 0.3 + 0.1
    }))
    setBubbles(newBubbles)
  }, [])

  const handleClick = () => {
    setShowFlash(true)
    setTimeout(() => {
      navigate('/login')
    }, 800)
  }

  return (
    <div 
      onClick={handleClick}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f3d5c 0%, #1a5f8a 50%, #0d2b42 100%)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          style={{
            position: 'absolute',
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(100,180,255,0.1))',
            left: `${bubble.left}%`,
            bottom: '-100px',
            opacity: bubble.opacity,
            animation: `floatUp ${bubble.duration}s linear infinite`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: '0 0 20px rgba(100,180,255,0.2), inset 0 0 20px rgba(255,255,255,0.1)'
          }}
        />
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-50vh) rotate(180deg);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
          }
        }
      `}</style>

      <div style={{
        textAlign: 'center',
        zIndex: 10,
        position: 'relative'
      }}>
        <h1 
          className="welcome-text"
          style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0 0 30px rgba(100,180,255,0.5), 0 0 60px rgba(100,180,255,0.3)',
            letterSpacing: '0.1em',
            transition: 'all 0.3s ease'
          }}
        >
          Seja bem-vindo
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          marginTop: '20px',
          fontSize: '1rem',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          Clique para continuar
        </p>
      </div>

      {showFlash && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(100,180,255,0.8) 30%, transparent 70%)',
          animation: 'flash 0.8s ease-out forwards',
          zIndex: 100
        }}>
          <style>{`
            @keyframes flash {
              0% { opacity: 1; }
              100% { opacity: 0; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}

export default WelcomePage