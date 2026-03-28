import { useEffect } from 'react'
import * as THREE from 'three'

export function useParticleField(mountRef) {
  useEffect(() => {
    if (!mountRef.current) return
    const el = mountRef.current
    const w = el.clientWidth
    const h = el.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const count = 2200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)

    // Check theme and pick palette
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light'

    const darkPalette = [
      [0.714, 0.373, 0.812],  // lilac
      [0.890, 0.624, 0.965],  // lavender
      [0.639, 0.173, 0.769],  // purple
      [0.443, 0.004, 0.576],  // violet
    ]
    const lightPalette = [
      [0.608, 0.271, 0.710],  // deeper lilac
      [0.541, 0.239, 0.639],  // muted lavender
      [0.545, 0.122, 0.690],  // purple
      [0.416, 0.000, 0.502],  // violet
    ]
    const palette = isDark ? darkPalette : lightPalette

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22
      const y = (Math.random() - 0.5) * 22
      const z = (Math.random() - 0.5) * 10

      positions[i * 3]     = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3]     = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.028,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
      vertexColors: true,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let mouseX = 0, mouseY = 0
    let mouseWorldX = 0, mouseWorldY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.2
      mouseWorldX = (e.clientX / window.innerWidth - 0.5) * 22
      mouseWorldY = -(e.clientY / window.innerHeight - 0.5) * 22
    }
    window.addEventListener('mousemove', onMouse)

    let time = 0
    let frame
    const animate = () => {
      frame = requestAnimationFrame(animate)
      time += 0.008

      // Subtle wave motion + mouse displacement
      const posAttr = geometry.getAttribute('position')
      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        const oz = originalPositions[i * 3 + 2]

        // Wave
        const waveX = Math.sin(time + oy * 0.3) * 0.15
        const waveY = Math.cos(time + ox * 0.3) * 0.12

        // Mouse repulsion
        const dx = ox - mouseWorldX
        const dy = oy - mouseWorldY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repulse = Math.max(0, 1 - dist / 4)
        const repulseX = dx * repulse * 0.6
        const repulseY = dy * repulse * 0.6

        posAttr.array[i * 3]     = ox + waveX + repulseX
        posAttr.array[i * 3 + 1] = oy + waveY + repulseY
        posAttr.array[i * 3 + 2] = oz
      }
      posAttr.needsUpdate = true

      points.rotation.y += 0.00025
      points.rotation.x += 0.00008
      camera.position.x += (mouseX - camera.position.x) * 0.025
      camera.position.y += (-mouseY - camera.position.y) * 0.025
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])
}
