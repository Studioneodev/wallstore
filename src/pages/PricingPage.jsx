import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const plans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: '/mês',
    description: 'Perfeito para começar',
    features: [
      ' até 2 usuários',
      ' 50 contatos',
      ' 10 tarefas/mês',
      ' Dashboard básico',
      ' Suporte por email'
    ],
    notFeatures: [
      ' CRM completo',
      ' IA Petmax',
      ' Módulo financeiro',
      ' API access'
    ],
    cta: 'Começar Grátis',
    popular: false,
    gradient: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
    border: 'rgba(255,255,255,0.1)'
  },
  {
    name: 'Premium',
    price: 'R$ 97',
    period: '/mês',
    description: 'Para negócios em crescimento',
    features: [
      ' até 10 usuários',
      ' Contatos ilimitados',
      ' Tarefas ilimitadas',
      ' CRM completo',
      ' IA Petmax (basic)',
      ' Módulo financeiro',
      ' Relatórios avançados',
      ' Suporte prioritário'
    ],
    notFeatures: [
      ' API access'
    ],
    cta: 'Quero Ser Premium',
    popular: true,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
    border: 'rgba(99, 102, 241, 0.5)'
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    description: 'Para grandes empresas',
    features: [
      ' Usuários ilimitados',
      ' Tudo do Premium',
      ' API completa',
      ' Integrações custom',
      ' Gerente de conta',
      ' SLA garantido',
      ' Treinamento in-company',
      ' Suporte 24/7'
    ],
    notFeatures: [],
    cta: 'Falar com Consultor',
    popular: false,
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    border: 'rgba(16, 185, 129, 0.5)'
  }
]

export default function PricingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSelectPlan = async (planName) => {
    if (planName === 'Gratuito') {
      if (user) {
        navigate('/home')
      } else {
        navigate('/register')
      }
    } else if (planName === 'Premium') {
      alert('Em breve! Sistema de pagamento em desenvolvimento.')
    } else {
      alert('Entre em contato conosco para o plano Enterprise.\n\nEmail: comercial@petmax.com.br')
    }
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
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            onClick={() => navigate(user ? '/home' : '/')}
          >
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
            {user ? (
              <>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Olá, <strong style={{ color: 'white' }}>{user.email?.split('@')[0]}</strong></span>
                <button 
                  onClick={() => navigate('/home')}
                  style={{ 
                    background: 'none', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: 'rgba(255,255,255,0.7)', 
                    cursor: 'pointer', 
                    fontSize: '0.85rem',
                    padding: '8px 16px',
                    borderRadius: '8px'
                  }}>
                  Voltar
                </button>
              </>
            ) : (
              <>
                <a href="/login" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: '500' }}>Entrar</a>
                <button 
                  onClick={() => navigate('/register')}
                  style={{ 
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'
                  }}>
                  Cadastrar Grátis
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: '160px 24px 60px',
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
            <span style={{ color: '#a855f7', fontSize: '0.85rem', fontWeight: '600' }}>💎 Planos e Preços</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: '800', 
            color: 'white', 
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Escolha o plano ideal para
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              seu negócio
            </span>
          </h1>

          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255,255,255,0.6)', 
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: '1.7'
          }}>
            Comece gratis e faça upgrade quando quiser. 
            Sem cartão de crédito, sem complicação.
          </p>

          {/* Toggle */}
          <div style={{ 
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50px',
            padding: '4px',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '20px'
          }}>
            <span style={{ 
              padding: '10px 24px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Mensal
            </span>
            <span style={{ 
              padding: '10px 24px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.9rem'
            }}>
              Anual <span style={{ color: '#10b981', fontSize: '0.8rem' }}>-20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section style={{ padding: '20px 24px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
            
            {plans.map((plan, index) => (
              <div 
                key={index}
                style={{ 
                  background: plan.gradient,
                  border: `2px solid ${plan.border}`,
                  borderRadius: '24px',
                  padding: '40px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: plan.popular ? '0 20px 60px rgba(99, 102, 241, 0.4)' : '0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '-30px',
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#0f0f23',
                    padding: '6px 40px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    transform: 'rotate(45deg)'
                  }}>
                    MAIS POPULAR
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>
                    {plan.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                    {plan.description}
                  </p>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
                    <span style={{ color: 'white', fontSize: '3rem', fontWeight: '800' }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      color: 'rgba(255,255,255,0.9)',
                      marginBottom: '12px',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: 'rgba(16, 185, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                  {plan.notFeatures.map((feature, i) => (
                    <li key={`not-${i}`} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      color: 'rgba(255,255,255,0.3)',
                      marginBottom: '12px',
                      fontSize: '0.95rem',
                      textDecoration: 'line-through'
                    }}>
                      <span style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: 'rgba(239, 68, 68, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '0.7rem'
                      }}>
                        ✗
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSelectPlan(plan.name)}
                  style={{ 
                    width: '100%',
                    padding: '16px 32px',
                    background: plan.popular ? 'white' : 'rgba(255,255,255,0.1)',
                    color: plan.popular ? '#6366f1' : 'white',
                    border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '14px',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: plan.popular ? '0 4px 20px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: 'white', fontSize: '2rem', fontWeight: '700', marginBottom: '40px' }}>
            Perguntas Frequentes
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { q: 'Posso mudar de plano depois?', a: 'Sim! Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças são refletidas na próxima cobrança.' },
              { q: 'Tem período de teste?', a: 'O plano gratuito é vitalício! Você pode usar sem pagar nada. Para o Premium, temos 7 dias de teste.' },
              { q: 'Como funciona o pagamento?', a: 'Aceitamos cartão de crédito, PIX e boleto. Cobramos mensalmente ou anualmente.' },
              { q: 'Posso cancelar quando quiser?', a: 'Sim! Cancelamento a qualquer momento, sem multas ou perguntas.' }
            ].map((item, i) => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>
                  {item.q}
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ 
        padding: '80px 24px',
        background: 'linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.1))'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
            Still in doubt?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Fale com nosso time. Мы ajuda a escolher o melhor plano para seu negócio.
          </p>
          <button style={{ 
            padding: '16px 40px',
            background: 'transparent',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '14px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            Falar com Consultor
          </button>
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
