import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-cta',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.ct-cta', start: 'top 85%' },
        }
      )
      gsap.fromTo('.ct-link',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ct-links', start: 'top 85%' },
        }
      )

      // CTA parallax
      gsap.to('.ct-cta', {
        y: -30,
        scrollTrigger: {
          trigger: '.ct-cta',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      // Eyebrow wipe
      gsap.fromTo('.ct-eyebrow',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ct-eyebrow', start: 'top 90%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <section ref={ref} id="contact" style={{
      padding: 'var(--sp-xl) clamp(1.5rem,5vw,4rem)',
      background: 'var(--bg)',
      minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div className="divider" style={{ marginBottom: 'var(--sp-lg)' }} />
      <p className="eyebrow ct-eyebrow" style={{ marginBottom: '1.75rem' }}>Let's get in touch</p>

      <h2 className="ct-cta" style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)',
        fontWeight: 100, lineHeight: 0.95, letterSpacing: '-0.03em',
        textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 'var(--sp-lg)',
      }}>
        Let's<br />
        <span style={{
          background: 'linear-gradient(135deg, var(--lavender) 0%, var(--lilac) 50%, var(--purple) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontWeight: 600,
        }}>build</span><br />
        something.
      </h2>

      {/* Contact links */}
      <div className="ct-links ct-links-wrap" style={{
        display: 'flex', gap: 'clamp(1.5rem,3vw,3rem)', flexWrap: 'wrap',
        borderTop: '1px solid var(--line)', paddingTop: 'var(--sp-md)',
        marginBottom: 'var(--sp-lg)',
      }}>
        {[
          { label: 'Email', href: 'mailto:dhananjayprince2001@gmail.com', text: 'dhananjayprince2001@gmail.com' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhananjayprince', text: 'linkedin.com/in/dhananjayprince' },
          { label: 'Phone', href: 'tel:+919445823306', text: '+91 94458 23306' },
        ].map(({ label, href, text }) => (
          <a key={label} className="ct-link ct-link-item" href={href} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', flexDirection: 'column', gap: '0.3rem',
            paddingRight: 'clamp(1.5rem,3vw,3rem)',
            borderRight: '1px solid var(--line)',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
              fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--lilac)',
            }}>{label}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              fontWeight: 300, color: 'var(--ink-2)',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--lavender)'}
              onMouseLeave={e => e.target.style.color = 'var(--ink-2)'}
            >{text} ↗</span>
          </a>
        ))}
      </div>

      {/* Google Form CTA button */}
      <div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfH4xz--3qH_oULCl32pVu1WSbBRPNrOJouQorDMLP8fQy-Wg/viewform?usp=publish-editor"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '1rem',
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)',
            fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#fff', background: 'linear-gradient(135deg, var(--purple), var(--violet))',
            padding: '1rem 2.5rem', borderRadius: '100px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 0 30px var(--btn-shadow)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 0 50px var(--btn-shadow-hover)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 0 30px var(--btn-shadow)'
          }}
        >
          Send me a message ↗
        </a>
      </div>

      <footer className="ct-footer" style={{
        marginTop: 'var(--sp-xl)',
        paddingTop: 'var(--sp-md)',
        borderTop: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)',
        }}>© {currentYear} Dhananjay Prince R</span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)',
        }}>Designed and Developed by Algotricz</span>
      </footer>
    </section>
  )
}
