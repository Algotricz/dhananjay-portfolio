import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

import Cursor from './components/Cursor'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Hero from './components/Hero'
import WhatIBring from './components/WhatIBring'
import Skills from './components/Skills'
import Challenges from './components/Challenges'
import HowIThink from './components/HowIThink'
import Explorations from './components/Explorations'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function App() {
  useEffect(() => {
    // Small delay to let all components mount before refreshing triggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <BackToTop />
      <main>
        <Hero />
        <WhatIBring />
        <Skills />
        <Challenges />
        <HowIThink />
        <Explorations />
        <Contact />
      </main>
    </>
  )
}
