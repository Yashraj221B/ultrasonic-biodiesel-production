import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AnimatedObject() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    const width = Math.min(containerRef.current.clientWidth, 400)
    const height = width

    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 3

    // Create geometric shape (oil drop-like sphere)
    const geometry = new THREE.IcosahedronGeometry(1, 4)
    const material = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      emissive: 0x0033aa,
      shininess: 100,
      wireframe: false,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add a wireframe overlay
    const wireframe = new THREE.WireframeGeometry(geometry)
    const line = new THREE.LineSegments(
      wireframe,
      new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 })
    )
    sphere.add(line)

    // Lighting
    const light1 = new THREE.PointLight(0x0066ff, 1, 100)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00ffff, 0.5, 100)
    light2.position.set(-5, -5, 5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = Math.min(containerRef.current.clientWidth, 400)
      const newHeight = newWidth
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      sphere.rotation.x += 0.005
      sphere.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full max-w-[400px] h-[400px] mx-auto" />
}
