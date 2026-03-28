import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const environments = [
  'Problems are not clearly defined.',
  'Execution speed matters.',
  'Ownership is expected, not assigned.',
]
const approach = [
  { step: 'First',  desc: 'Understand the problem deeply.' },
  { step: 'Then',   desc: 'Break it into actionable steps.' },
  { step: 'Always', desc: 'Execute quickly while adapting on feedback.' },
]
const lookingFor = [
  'Breaking down business problems and identifying practical solutions',
  'Working closely with founders or small teams on key decisions',
  'Translating strategy into structured execution plans',
  'Improving systems, processes, and overall team efficiency',
]

export default function HowIThink() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ht-heading',
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.ht-heading', start: 'top 85%' },
        }
      )

      // Heading parallax
      gsap.to('.ht-heading', {
        y: -25,
        scrollTrigger: {
          trigger: '.ht-heading',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      gsap.fromTo('.ht-env',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ht-env-list', start: 'top 80%' },
        }
      )
      gsap.fromTo('.ht-step',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.ht-steps', start: 'top 80%' },
        }
      )

      gsap.fromTo('.ht-lf',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ht-lf-items', start: 'top 85%' },
        }
      )

      // Eyebrow wipes
      gsap.fromTo('.ht-eyebrow-main',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ht-eyebrow-main', start: 'top 90%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      padding: 'var(--sp-xl) clamp(1.5rem,5vw,4rem)',
      background: 'var(--surface)',
    }}>
      <div className="divider" style={{ marginBottom: 'var(--sp-lg)' }} />
      <p className="eyebrow ht-eyebrow-main" style={{ marginBottom: '1.75rem' }}>How I Think & Work</p>

      <div className="ht-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-lg)', marginBottom: 'var(--sp-lg)' }}>
        {/* Environments */}
        <div>
          <h2 className="ht-heading" style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
            fontWeight: 100, lineHeight: 1.05, letterSpacing: '-0.02em',
            textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 'var(--sp-md)',
          }}>Prefer<br />working<br />where—</h2>

          <div className="ht-env-list" style={{ borderTop: '1px solid var(--line)' }}>
            {environments.map((e, i) => (
              <p key={i} className="ht-env" style={{
                fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 300,
                fontSize: 'var(--text-md)', color: 'var(--ink-2)',
                padding: '1.1rem 0', borderBottom: '1px solid var(--line)', lineHeight: 1.5,
              }}>{e}</p>
            ))}
          </div>
        </div>

        {/* Approach */}
        <div className="ht-approach-col" style={{ paddingTop: '4.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>My Approach</p>
          <div className="ht-steps" style={{ borderTop: '1px solid var(--line)' }}>
            {approach.map(({ step, desc }, i) => (
              <div key={i} className="ht-step" style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
                  fontWeight: 100, color: 'var(--lavender)', display: 'block', marginBottom: '0.4rem',
                }}>{step}</span>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
                  fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.65,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What I'm looking for */}
      <div style={{ marginTop: 'var(--sp-lg)', paddingTop: 'var(--sp-lg)', borderTop: '1px solid var(--line)' }}>
        <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>What I'm Looking For</p>
        <div className="ht-lf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--sp-lg)', alignItems: 'start' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'var(--text-md)', color: 'var(--ink-2)', lineHeight: 1.65,
          }}>
            Roles where strategy meets execution — decisions not just made, but actually implemented.
          </p>
          <div className="ht-lf-items" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line)',
          }}>
            {lookingFor.map((item, i) => (
              <div key={i} className="ht-lf" style={{
                background: 'var(--surface)', padding: '1.25rem',
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                transition: 'background-color 0.5s ease',
              }}>
                <span style={{ color: 'var(--purple)', fontSize: '0.55rem', paddingTop: '0.45em', flexShrink: 0 }}>◆</span>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                  fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.65,
                }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
