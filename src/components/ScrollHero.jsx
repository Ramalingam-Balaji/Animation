import { useEffect, useRef } from 'react';
import { FRAME_COUNT } from '../constants.js';

export default function ScrollHero({ onProgress }) {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const playhead = useRef({ current: 0, target: 0, ready: false });
  const lastDrawnFrame = useRef(-1);

  useEffect(() => {
    let cancelled = false;
    let frameId;
    let loadedCount = 0;
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.onload = image.onerror = () => {
        if (cancelled) return;
        loadedCount += 1;
        onProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) playhead.current.ready = true;
        if (index === 0) render(0);
      };
      image.src = `/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
      return image;
    });
    imagesRef.current = images;

    function render(index) {
      const canvas = canvasRef.current;
      const image = imagesRef.current[index];
      const context = canvas?.getContext('2d');
      if (!canvas || !context || !image?.complete || !image.naturalWidth) return;
      if (lastDrawnFrame.current === index) return;
      lastDrawnFrame.current = index;
      const scale = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== Math.round(width * scale) || canvas.height !== Math.round(height * scale)) {
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.fillStyle = '#b80d24';
      context.fillRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      const fit = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * fit;
      const drawHeight = image.naturalHeight * fit;
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    }

    function readScroll() {
      const track = trackRef.current;
      if (!track) return;
      const distance = track.offsetHeight - window.innerHeight;
      playhead.current.target = distance > 0
        ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / distance)) * (FRAME_COUNT - 1)
        : 0;
    }

    function animate() {
      const state = playhead.current;
      const delta = state.target - state.current;
      state.current = Math.abs(delta) > 0.005 ? state.current + delta * 0.15 : state.target;
      if (state.ready) render(Math.round(state.current));
      frameId = requestAnimationFrame(animate);
    }

    const resize = () => {
      lastDrawnFrame.current = -1;
      render(Math.round(playhead.current.current));
    };
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', resize);
    readScroll();
    animate();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', resize);
      imagesRef.current = [];
    };
  }, [onProgress]);

  return <div id="top" ref={trackRef} className="scroll-track">
    <div className="sticky-viewport">
      <div className="ambient-glow" />
      <canvas ref={canvasRef} className="animation-canvas" aria-label="Eat Protein mascot animation" />
    </div>
  </div>;
}
