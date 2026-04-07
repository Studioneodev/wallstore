import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
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
      window.location.href = '/login'
    }, 800)
  }

  return (
    <div 
      onClick={handleClick}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50vh) rotate(180deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
      `}</style>

      <div style={{
        textAlign: 'center',
        zIndex: 10,
        position: 'relative'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            backgroundColor: 'white', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            <svg style={{ width: '50px', height: '50px', color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        
        <h1 
          style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0 0 30px rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}
        >
          Petmax
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '8px',
          fontSize: '1.25rem'
        }}>
          ERP + CRM + IA
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          marginTop: '40px',
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
          background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(102,126,234,0.8) 30%, transparent 70%)',
          animation: 'flash 0.8s ease-out forwards',
          zIndex: 100
        }}>
          <style>{`
            @keyframes flash {
              0% { opacity: 1; }
              100% { opacity: 0; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}