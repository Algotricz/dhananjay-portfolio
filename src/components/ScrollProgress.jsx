import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef()

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(bar, {
          width: `${self.progress * 100}%`,
          duration: 0.1,
          ease: 'none',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === document.body) t.kill()
      })
    }
  }, [])

  return <div ref={barRef} className="scroll-progress" />
}
