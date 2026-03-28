import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const navRef = useRef()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuTl = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (nav) {
      gsap.fromTo(nav,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
    }
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const menuEl = document.querySelector('.mobile-menu')
    const menuLinks = document.querySelectorAll('.mobile-menu a')
    const themeBtn = document.querySelector('.theme-toggle-mobile')

    if (!menuEl) return

    if (menuOpen) {
      menuEl.style.visibility = 'visible'
      const tl = gsap.timeline()
      tl.to(menuEl, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .fromTo(menuLinks,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.1'
        )
      if (themeBtn) {
        tl.fromTo(themeBtn,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          '-=0.2'
        )
      }
      menuTl.current = tl
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to(menuEl, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          menuEl.style.visibility = 'hidden'
          // Reset link styles
          gsap.set(document.querySelectorAll('.mobile-menu a'), { opacity: 0, y: 30 })
          const tb = document.querySelector('.theme-toggle-mobile')
          if (tb) gsap.set(tb, { opacity: 0, y: 30 })
        }
      })
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'clamp(1rem,2vw,1.5rem) clamp(1.5rem,5vw,4rem)',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <a href="#" style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 'var(--text-sm)', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--lavender)',
        }}>
          Dhananjay
        </a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,3rem)', alignItems: 'center' }}>
          {links.map(item => (
            <a key={item.label} href={item.href} style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
              fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--muted)', transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--lavender)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{item.label}</a>
          ))}
          <ThemeToggle />
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(item => (
          <a key={item.label} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <div className="theme-toggle-mobile">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
