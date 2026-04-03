import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    containerRef.current.appendChild(renderer.domElement)
    camera.position.z = 600

    const COUNT = 120
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)
    const velocities = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 0.4,
      y: (Math.random() - 0.5) * 0.4,
      z: (Math.random() - 0.5) * 0.2,
    }))

    const palette = [
      [0.0, 0.67, 1.0],   // blue
      [0.0, 0.83, 1.0],   // cyan
      [0.54, 0.0, 1.0],   // violet
      [0.0, 1.0, 0.53],   // green
    ]

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 1400
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1400
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
      sizes[i] = 1.5 + Math.random() * 3
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Subtle connection lines between nearby particles (atom bonds)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.06 })
    const lineGeo = new THREE.BufferGeometry()
    const linePositions: number[] = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i*3] - positions[j*3]
        const dy = positions[i*3+1] - positions[j*3+1]
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 180) {
          linePositions.push(positions[i*3], positions[i*3+1], positions[i*3+2])
          linePositions.push(positions[j*3], positions[j*3+1], positions[j*3+2])
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
    scene.add(new THREE.LineSegments(lineGeo, lineMat))

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    let id: number
    const pos = geo.attributes.position.array as Float32Array
    const animate = () => {
      id = requestAnimationFrame(animate)
      for (let i = 0; i < COUNT; i++) {
        pos[i*3]     += velocities[i].x
        pos[i*3 + 1] += velocities[i].y
        pos[i*3 + 2] += velocities[i].z
        if (pos[i*3]     >  700) pos[i*3]     = -700
        if (pos[i*3]     < -700) pos[i*3]     =  700
        if (pos[i*3 + 1] >  700) pos[i*3 + 1] = -700
        if (pos[i*3 + 1] < -700) pos[i*3 + 1] =  700
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.y += 0.00015
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(id)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      lineMat.dispose()
      lineGeo.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}
