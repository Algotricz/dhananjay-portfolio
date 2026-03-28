import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef  = useRef()
  const ringRef = useRef()

  useEffect(() => {
    const onMove = (e) => {
      gsap.to(dotRef.current,  { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.4,  ease: 'power2.out' })
    }
    const onEnter = () => {
      gsap.to(ringRef.current, { scale: 2.2, opacity: 0.25, duration: 0.3 })
      gsap.to(dotRef.current,  { scale: 0, duration: 0.3 })
    }
    const onLeave = () => {
      gsap.to(ringRef.current, { scale: 1, opacity: 0.5, duration: 0.3 })
      gsap.to(dotRef.current,  { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => {
      window.removeEventListener('mousemove', onMove)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
