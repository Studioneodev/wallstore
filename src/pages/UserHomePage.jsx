import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabaseClient'

export default function UserHomePage() {
  const { user, signOut, isAdmin } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ color: 'white', fontSize: '1.2rem' }}>Carregando...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f23' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'rgba(15, 15, 35, 0.95)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 0',
        position: 'fixed',
        width: '100%',
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
              borderRadius: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🐾</span>
            </div>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Petmax</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Olá, <strong style={{ color: 'white' }}>{user?.email?.split('@')[0]}</strong></span>
            {isAdmin && (
              <a href="/admin" style={{ 
                color: '#6366f1', 
                fontWeight: '600', 
                textDecoration: 'none',
                padding: '8px 16px',
                background: 'rgba(99, 102, 241, 0.2)',
                borderRadius: '8px'
              }}>
                Painel Admin
              </a>
            )}
            <button 
              onClick={signOut} 
              style={{ 
                background: 'none', 
                border: '1px solid rgba(255,255,255,0.2)', 
                color: 'rgba(255,255,255,0.7)', 
                cursor: 'pointer', 
                fontSize: '0.85rem',
                padding: '8px 16px',
                borderRadius: '8px'
              }}>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: '160px 24px 80px',
        background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 60%)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge */}
          <div style={{ 
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '50px',
            marginBottom: '32px'
          }}>
            <span style={{ color: '#a855f7', fontSize: '0.85rem', fontWeight: '600' }}>🚀 Transforme sua empresa hoje</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: '800', 
            color: 'white', 
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            A plataforma que vai
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              revolucionar seu negócio
            </span>
          </h1>

          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255,255,255,0.6)', 
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.7'
          }}>
           ERP + CRM + Inteligência Artificial em uma única plataforma. 
            <strong style={{ color: 'white' }}>Automatize</strong>, <strong style={{ color: 'white' }}>organize</strong> e <strong style={{ color: 'white' }}>cresça</strong> como nunca antes.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ 
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 30px rgba(99, 102, 241, 0.4)',
              transition: 'transform 0.2s'
            }}>
              🚀 Quero Ser Premium
            </button>
            <button style={{ 
              padding: '16px 40px',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '14px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Ver Planos e Preços
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '48px' 
          }}>
            Por que escolher o <span style={{ color: '#6366f1' }}>Petmax</span>?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Card 1 */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}>
                📊
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                Gestão Integrada
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                Tudo em um só lugar: empresas, tarefas, calendário, documentos e muito mais. Sem planilhas bagunçadas.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}>
                👥
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                CRM Completo
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                Pipeline visual, automação de tarefas e gestão de leads. Converta mais clientes com menos esforço.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}>
                🤖
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                Inteligência Artificial
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                IA avançada que analiza dados, gera relatórios e otimiza processos automaticamente.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}>
                💰
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                Financeiro Inteligente
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                Controle total de receitas, despesas e fluxo de caixa com relatórios e previsões.
              </p>
            </div>

            {/* Card 5 */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}>
                ☁️
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                100% Online
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                Acesse de qualquer lugar, qualquer dispositivo. Sem instalação, sem complicação.
              </p>
            </div>

            {/* Card 6 */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s'
            }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}>
                🔒
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>
                Seguro e Privado
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                Seus dados protegidos com criptografia de ponta. LGPD compliant.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '40px' }}>
            Empresas que já estão <span style={{ color: '#6366f1' }}>transformando</span> seus resultados
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'white' }}>500+</div>
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>Empresas Atendidas</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'white' }}>10k+</div>
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>Usuários Ativos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'white' }}>99.9%</div>
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>Uptime</div>
            </div>
          </div>

          {/* Testimonial */}
          <div style={{ 
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '20px' }}>
              "O Petmax transformou completamente a forma como gerenciamos nossa empresa. 
              A IA nos ajuda a tomar decisões mais inteligentes e o CRM duplicou nossas conversões."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                JM
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: 'white', fontWeight: '600' }}>João Silva</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Diretor, Empresa X</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section style={{ 
        padding: '80px 24px',
        background: 'linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.1))'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>
            Pronto para transformar seu negócio?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Comece gratis hoje mesmo. Upgrade quando quiser.
          </p>
          <button style={{ 
            padding: '18px 48px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            fontSize: '1.2rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 30px rgba(99, 102, 241, 0.5)',
          }}>
            🚀 Começar Agora - Grátis
          </button>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '16px' }}>
            Sem cartão de crédito • Cancelamento a qualquer momento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: 'rgba(0,0,0,0.3)', 
        padding: '40px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.5rem' }}>🐾</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Petmax</span>
          </div>
          <p style={{ fontSize: '0.9rem' }}>© 2024 Petmax - ERP + CRM + IA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
