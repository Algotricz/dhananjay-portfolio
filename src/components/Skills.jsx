import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    num: '01',
    title: 'Strategy & Execution',
    icon: '◇',
    skills: [
      'Translating ambiguous ideas into structured execution plans',
      'Defining product flows and user journeys',
      'Designing engagement systems (gamification, retention loops)',
      'Writing clear feature breakdowns and execution steps',
    ],
  },
  {
    num: '02',
    title: 'Business & Operations',
    icon: '△',
    skills: [
      'Cash flow understanding and basic financial projections',
      'Aligning teams towards common goals and timelines',
      'Identifying bottlenecks and improving execution flow',
      'Balancing user needs with business objectives',
    ],
  },
  {
    num: '03',
    title: 'Collaboration & Ownership',
    icon: '○',
    skills: [
      'Taking ownership beyond defined responsibilities',
      'Working closely with founders and cross-functional teams',
      'Ensuring alignment across product, tech, and business',
      'Communicating ideas clearly and practically',
    ],
  },
]

export default function Skills() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.sk-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.sk-heading', start: 'top 85%' },
        }
      )

      // Heading parallax
      gsap.to('.sk-heading', {
        y: -20,
        scrollTrigger: {
          trigger: '.sk-heading',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      // Eyebrow wipe
      gsap.fromTo('.sk-eyebrow',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.sk-eyebrow', start: 'top 90%' },
        }
      )

      // Card stagger reveal
      gsap.fromTo('.sk-card',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.sk-cards-wrap', start: 'top 85%' },
        }
      )

      // Skill items reveal per card
      document.querySelectorAll('.sk-card').forEach((card) => {
        const items = card.querySelectorAll('.sk-skill-item')
        gsap.fromTo(items,
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 75%' },
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="skills" style={{
      padding: 'var(--sp-xl) clamp(1.5rem,5vw,4rem)',
      background: 'var(--bg-2)',
    }}>
      <div className="divider" style={{ marginBottom: 'var(--sp-lg)' }} />
      <p className="eyebrow sk-eyebrow" style={{ marginBottom: '1.75rem' }}>Skills</p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 2fr',
        gap: 'var(--sp-lg)', alignItems: 'start', marginBottom: 'var(--sp-lg)',
      }} className="sk-header-grid">
        <h2 className="sk-heading" style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
          fontWeight: 100, letterSpacing: '-0.02em', textTransform: 'uppercase',
          color: 'var(--ink)', lineHeight: 1.05,
        }}>What I<br />work with.</h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'var(--text-md)', color: 'var(--ink-2)', lineHeight: 1.65,
          maxWidth: '55ch', paddingTop: '0.5rem',
        }}>
          A blend of strategic thinking, operational discipline, and collaborative execution — applied across product, business, and team challenges.
        </p>
      </div>

      <div className="sk-cards-wrap" style={{
        display: 'flex', flexDirection: 'column', gap: 0,
      }}>
        {skillGroups.map(({ num, title, icon, skills }, groupIdx) => (
          <div key={title} className="sk-card" style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(60px,6vw,80px) 1fr',
            gap: 0,
            borderTop: '1px solid var(--line)',
            padding: 'var(--sp-md) 0',
            transition: 'background 0.4s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--challenge-open)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Number column */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              paddingTop: '0.2rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
                fontWeight: 400, letterSpacing: '0.1em', color: 'var(--lilac)',
              }}>{num}</span>
              <span style={{
                fontSize: '1.4rem', color: 'var(--purple)', marginTop: '0.5rem',
                opacity: 0.6,
              }}>{icon}</span>
            </div>

            {/* Content column */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
                fontWeight: 300, letterSpacing: '0.01em', color: 'var(--lavender)',
                marginBottom: '1.5rem', lineHeight: 1.2,
              }}>{title}</h3>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem 2rem',
              }} className="sk-skills-grid">
                {skills.map((s, i) => (
                  <div key={i} className="sk-skill-item" style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    padding: '0.7rem 0',
                    borderBottom: i < skills.length - 2 ? '1px solid var(--line)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
                      fontWeight: 400, color: 'var(--purple)', paddingTop: '0.2em',
                      flexShrink: 0, opacity: 0.7,
                    }}>→</span>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                      fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.6,
                    }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--line)' }} />
      </div>
    </section>
  )
}
