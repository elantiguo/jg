import { create } from 'zustand'

export const useEditorStore = create((set, get) => ({
  scene: null,
  camera: null,
  renderer: null,
  orbitControls: null,
  transformControls: null,
  selectedId: null,
  mode: 'translate',

  setThreeRefs: ({ scene, camera, renderer, orbitControls, transformControls }) => set({ scene, camera, renderer, orbitControls, transformControls }),

  setMode: (mode) => {
    const tc = get().transformControls
    if (tc) tc.setMode(mode)
    set({ mode })
  },

  selectObject: (object3d) => {
    set({ selectedId: object3d ? object3d.uuid : null })
  },

  deleteSelected: () => {
    const { scene, selectedId, transformControls } = get()
    if (!scene || !selectedId) return
    const obj = scene.getObjectByProperty('uuid', selectedId)
    if (obj) {
      if (transformControls && transformControls.object === obj) {
        transformControls.detach()
      }
      scene.remove(obj)
    }
    set({ selectedId: null })
  },

  addToScene: (object3d) => {
    const { scene } = get()
    if (scene) scene.add(object3d)
  },
}))