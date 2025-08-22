import { useEditorStore } from '../core/store'
import { createBox, createSphere, createCylinder, createPlane } from '../utils/primitives'

export default function Toolbar() {
  const mode = useEditorStore(s => s.mode)
  const setMode = useEditorStore(s => s.setMode)
  const deleteSelected = useEditorStore(s => s.deleteSelected)
  const addToScene = useEditorStore(s => s.addToScene)

  const addPrimitive = (factory) => () => {
    const obj = factory()
    obj.position.set(0, 0.5, 0)
    addToScene(obj)
  }

  return (
    <div style={{ position: 'fixed', top: 12, left: 12, display: 'flex', gap: 8, background: 'rgba(17,24,39,0.6)', padding: 8, borderRadius: 8, color: '#fff', backdropFilter: 'blur(6px)', zIndex: 10 }}>
      <button onClick={() => setMode('translate')} style={{ background: mode === 'translate' ? '#2563eb' : '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Mover</button>
      <button onClick={() => setMode('rotate')} style={{ background: mode === 'rotate' ? '#2563eb' : '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Rotar</button>
      <button onClick={() => setMode('scale')} style={{ background: mode === 'scale' ? '#2563eb' : '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Escalar</button>
      <div style={{ width: 1, background: 'rgba(255,255,255,0.15)', margin: '0 6px' }} />
      <button onClick={addPrimitive(createBox)} style={{ background: '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Cubo</button>
      <button onClick={addPrimitive(createSphere)} style={{ background: '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Esfera</button>
      <button onClick={addPrimitive(createCylinder)} style={{ background: '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Cilindro</button>
      <button onClick={addPrimitive(createPlane)} style={{ background: '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Plano</button>
      <div style={{ width: 1, background: 'rgba(255,255,255,0.15)', margin: '0 6px' }} />
      <button onClick={deleteSelected} style={{ background: '#b91c1c', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Eliminar</button>
    </div>
  )
}