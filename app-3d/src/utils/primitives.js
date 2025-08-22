import * as THREE from 'three'

export function createBox({ width = 1, height = 1, depth = 1, color = 0x4ade80 } = {}) {
  const geometry = new THREE.BoxGeometry(width, height, depth)
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.05, roughness: 0.9 })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function createSphere({ radius = 0.75, widthSegments = 32, heightSegments = 16, color = 0x60a5fa } = {}) {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.05, roughness: 0.9 })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function createPlane({ width = 2, height = 2, color = 0xfef08a } = {}) {
  const geometry = new THREE.PlaneGeometry(width, height)
  const material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}

export function createCylinder({ radiusTop = 0.5, radiusBottom = 0.5, height = 1.5, radialSegments = 32, color = 0xf472b6 } = {}) {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.05, roughness: 0.9 })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}