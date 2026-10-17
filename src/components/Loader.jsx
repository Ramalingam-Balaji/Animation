import { FRAME_COUNT } from '../constants.js';

export default function Loader({ progress }) {
  return <div className={`loader-overlay ${progress >= 100 ? 'loader-hidden' : ''}`} aria-live="polite"><div className="loader-card"><div className="loader-mascot"><span className="egg-wiggle">🥚</span><span className="cap-badge">e</span></div><h2 className="loader-title">EAT PROTEIN</h2><p className="mb-6 text-sm text-white/75">Loading 180 frames of high-octane energy...</p><div className="mb-3 h-2 overflow-hidden rounded-full bg-white/15"><div className="progress-bar h-full rounded-full" style={{ width: `${progress}%` }} /></div><div className="flex justify-between text-xs font-medium text-white/65"><span>{progress}%</span><span>{Math.round((progress / 100) * FRAME_COUNT)} / {FRAME_COUNT} frames</span></div></div></div>;
}
