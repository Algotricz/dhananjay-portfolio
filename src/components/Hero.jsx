import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useParticleField } from '../hooks/useThree'
import profileImg from '/assets/profile.jpg'

export default function Hero() {
  const canvasRef = useRef()
  const heroRef   = useRef()
  const photoRef  = useRef()

  useParticleField(canvasRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from('.h-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.h-line', { y: '108%', duration: 1.1, ease: 'power4.out', stagger: 0.1 }, '-=0.4')
        .from('.h-sub',  { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .from('.h-photo',{ scale: 0.88, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=0.9')
        .from('.h-badge',{ y: 16, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08 }, '-=0.6')
        .from('.h-scroll',{ opacity: 0, duration: 0.8 }, '-=0.3')

      // Floating badges animation
      gsap.to('.h-badge', {
        y: -4,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // 3D tilt on photo with mouse
  useEffect(() => {
    const photo = photoRef.current
    if (!photo) return
    const onMove = (e) => {
      const rect = photo.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      gsap.to(photo, {
        rotateY: dx * 12,
        rotateX: -dy * 12,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    const onLeave = () => {
      gsap.to(photo, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
    }
    window.addEventListener('mousemove', onMove)
    photo.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      photo.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const badges = ['Strategy', 'Business & Operations', 'Execution']

  return (
    <section ref={heroRef} id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem) clamp(3rem,6vw,5rem)',
      overflow: 'hidden',
    }}>
      {/* Particle canvas */}
      <div ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Purple glow blobs */}
      <div style={{
        position: 'absolute', top: '10%', right: '15%', width: '500px', height: '500px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(113,1,147,0.18) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '5%', width: '360px', height: '360px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,44,196,0.12) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Content grid */}
      <div className="hero-grid" style={{
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center',
        width: '100%',
      }}>
        {/* Left text */}
        <div>
          <p className="h-eyebrow eyebrow" style={{ marginBottom: '1.75rem' }}>
            Portfolio · 2025
          </p>

          <div style={{ overflow: 'hidden', marginBottom: '0.1em' }}>
            <h1 className="h-line" style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)',
              fontWeight: 100, lineHeight: 1, letterSpacing: '-0.025em',
              textTransform: 'uppercase', color: 'var(--ink)', display: 'block',
            }}>Dhananjay</h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '0.1em' }}>
            <h1 className="h-line" style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)',
              fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, var(--lavender) 0%, var(--lilac) 50%, var(--purple) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              display: 'block',
            }}>Prince R</h1>
          </div>

          <p className="h-sub hero-sub" style={{
            fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'var(--text-md)', color: 'var(--ink-2)',
            marginTop: '1.75rem', maxWidth: '44ch', lineHeight: 1.65,
          }}>
            Turning unclear ideas into structured execution<br />
            and real outcomes — across strategy, operations,<br />and business.
          </p>

          <div className="hero-badges" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {badges.map(b => (
              <span key={b} className="h-badge" style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
                fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '0.45rem 1.1rem',
                border: '1px solid var(--badge-border)',
                borderRadius: '100px',
                color: 'var(--lilac)',
                background: 'var(--badge-bg)',
              }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Right — photo with 3D tilt */}
        <div className="h-photo hero-photo-wrap" style={{ flexShrink: 0, perspective: '800px' }}>
          <div ref={photoRef} style={{
            position: 'relative',
            width: 'clamp(200px,22vw,300px)',
            height: 'clamp(200px,22vw,300px)',
            transformStyle: 'preserve-3d',
          }}>
            {/* Glowing ring */}
            <div style={{
              position: 'absolute', inset: '-6px', borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--violet), var(--purple), var(--lilac), var(--lavender), var(--violet))',
              animation: 'spin 6s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: '3px', borderRadius: '50%',
              background: 'var(--bg)',
              transition: 'background-color 0.5s ease',
            }} />
            <img src={profileImg} alt="Dhananjay Prince R" style={{
              position: 'absolute', inset: '6px', borderRadius: '50%',
              width: 'calc(100% - 12px)', height: 'calc(100% - 12px)',
              objectFit: 'cover', objectPosition: 'center top',
            }} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="h-scroll hero-scroll-hint" style={{
        position: 'absolute', bottom: 'clamp(1.5rem,3vw,2.5rem)',
        right: 'clamp(1.5rem,5vw,4rem)',
        display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)',
        }}>Scroll</span>
        <div style={{ width: '40px', height: '1px', background: 'var(--muted)' }} />
      </div>
    </section>
  )
}
