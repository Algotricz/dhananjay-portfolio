import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const items = [
  'Bringing clarity to ambiguous problems',
  'Converting ideas into structured execution plans',
  'Aligning teams and driving consistent progress',
  'Connecting product decisions with business outcomes',
  'Taking ownership beyond defined responsibilities',
]

export default function WhatIBring() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wb-heading',
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.wb-heading', start: 'top 85%' },
        }
      )

      // Parallax on heading
      gsap.to('.wb-heading', {
        y: -30,
        scrollTrigger: {
          trigger: '.wb-heading',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      // Staggered reveal with scrub
      gsap.fromTo('.wb-item',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.wb-list', start: 'top 80%' },
        }
      )

      // Eyebrow wipe
      gsap.fromTo('.wb-eyebrow',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.wb-eyebrow', start: 'top 90%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="work" style={{
      padding: 'var(--sp-xl) clamp(1.5rem,5vw,4rem)',
      background: 'var(--bg)',
    }}>
      <div className="divider" style={{ marginBottom: 'var(--sp-lg)' }} />
      <p className="eyebrow wb-eyebrow" style={{ marginBottom: '1.75rem' }}>What I Bring</p>

      <div className="wb-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--sp-lg)', alignItems: 'start' }}>
        <div>
          <h2 className="wb-heading" style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
            fontWeight: 100, lineHeight: 1.0, letterSpacing: '-0.02em',
            textTransform: 'uppercase', color: 'var(--ink)', maxWidth: '12ch',
          }}>
            Built for<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--lavender), var(--lilac))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}>unclear</span><br />terrain.
          </h2>
        </div>

        <div className="wb-list">
          {items.map((text, i) => (
            <div key={i} className="wb-item" style={{
              display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
              padding: '1.25rem 0',
              borderBottom: '1px solid var(--line)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
                fontWeight: 400, letterSpacing: '0.1em',
                color: 'var(--lilac)', flexShrink: 0, paddingTop: '0.2em',
              }}>0{i + 1}</span>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
                fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.65,
              }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
