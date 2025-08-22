import ThreeCanvas from '../render/ThreeCanvas';
import Toolbar from '../ui/Toolbar';

export default function Editor() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Toolbar />
      <ThreeCanvas />
    </div>
  );
}