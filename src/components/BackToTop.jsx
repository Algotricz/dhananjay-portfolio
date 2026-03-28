import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function BackToTop() {
  const btnRef = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > window.innerHeight * 0.8
      setVisible(show)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!btnRef.current) return
    if (visible) {
      gsap.to(btnRef.current, {
        opacity: 1, y: 0, visibility: 'visible',
        duration: 0.4, ease: 'power3.out',
      })
    } else {
      gsap.to(btnRef.current, {
        opacity: 0, y: 20, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          if (btnRef.current) btnRef.current.style.visibility = 'hidden'
        },
      })
    }
  }, [visible])

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.2,
      ease: 'power3.inOut',
    })
  }

  return (
    <button
      ref={btnRef}
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
      data-cursor
    >
      <svg viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
