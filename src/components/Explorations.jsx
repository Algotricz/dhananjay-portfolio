import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const items = [
  { label: 'Hardware', title: 'Raspberry Pi Experiments', desc: 'Tinkering with single-board computers to bridge software ideas with physical systems.' },
  { label: 'Impact', title: 'Tactile Learning for Blind Students', desc: 'Exploring accessible education tools to make learning tangible for visually impaired students.' },
  { label: 'Growth', title: 'Marketing Experiments', desc: 'QR flyers, product pitching, and guerrilla growth tactics tested in the real world.' },
]

export default function Explorations() {
  const ref = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ex-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.ex-grid', start: 'top 85%' },
        }
      )

      // Heading parallax
      gsap.to('.ex-heading', {
        y: -20,
        scrollTrigger: {
          trigger: '.ex-heading',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      // Eyebrow wipe
      gsap.fromTo('.ex-eyebrow',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ex-eyebrow', start: 'top 90%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      padding: 'var(--sp-xl) clamp(1.5rem,5vw,4rem)',
      background: 'var(--bg-2)',
    }}>
      <div className="divider" style={{ marginBottom: 'var(--sp-lg)' }} />
      <p className="eyebrow ex-eyebrow" style={{ marginBottom: '1.75rem' }}>Things I've Explored</p>
      <h2 className="ex-heading" style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
        fontWeight: 100, letterSpacing: '-0.02em', textTransform: 'uppercase',
        color: 'var(--ink)', marginBottom: 'var(--sp-lg)', lineHeight: 1.05,
      }}>Curiosity<br />in action.</h2>

      <div className="ex-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px', background: 'var(--line)',
      }}>
        {items.map(({ label, title, desc }) => (
          <div key={title} className="ex-card" data-cursor style={{
            background: 'var(--bg-2)', padding: 'var(--sp-md)',
            transition: 'background 0.3s, transform 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--card-hover-bg)'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--bg-2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          >
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1.5rem' }}>{label}</span>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
              fontWeight: 300, letterSpacing: '-0.01em', color: 'var(--ink)',
              marginBottom: '1rem', lineHeight: 1.2,
            }}>{title}</h3>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7,
            }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
