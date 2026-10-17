/**
 * eat protein — Interactive Scroll Animation Experience
 * Pure 180-frame canvas scroll scrubbing with physics lerp
 */

const TOTAL_FRAMES = 180;
const images = [];
let loadedCount = 0;
let isLoaded = false;

// Physics & Frame State
let currentFrame = 0;
let targetFrame = 0;
const lerpFactor = 0.15;
const fitMode = 'cover';

// DOM Elements
const canvas = document.getElementById('animation-canvas');
const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
const scrollTrack = document.getElementById('scroll-track');
const loader = document.getElementById('loader');
const progressBar = document.getElementById('progress-bar');
const loaderPct = document.getElementById('loader-percentage');
const loaderCount = document.getElementById('loader-count');

/**
 * Generate image filename for frame index (0 to 179)
 * Format: ezgif-frame-001.jpg -> ezgif-frame-180.jpg
 */
function getFrameSrc(index) {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `./ezgif-frame-${frameNumber}.jpg`;
}

/**
 * Preload all 180 images
 */
function preloadFrames() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFrameSrc(i);

    img.onload = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (loaderPct) loaderPct.textContent = `${progress}%`;
      if (loaderCount) loaderCount.textContent = `${loadedCount} / ${TOTAL_FRAMES} frames`;

      // Render initial frame as soon as frame 0 is ready
      if (i === 0 && !isLoaded) {
        renderFrame(0);
      }

      if (loadedCount === TOTAL_FRAMES) {
        onAllFramesLoaded();
      }
    };

    img.onerror = () => {
      console.warn(`Failed loading frame ${i + 1}`);
      loadedCount++;
      if (loadedCount === TOTAL_FRAMES) {
        onAllFramesLoaded();
      }
    };

    images.push(img);
  }
}

function onAllFramesLoaded() {
  isLoaded = true;
  setTimeout(() => {
    if (loader) {
      loader.classList.add('hidden');
    }
    renderFrame(Math.round(currentFrame));
  }, 350);
}

/**
 * Resize Canvas with devicePixelRatio for ultra-sharp Retina rendering
 */
function resizeCanvas() {
  if (!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(dpr, dpr);
  renderFrame(Math.round(currentFrame));
}

window.addEventListener('resize', resizeCanvas);

/**
 * Render a single frame with responsive Aspect Ratio handling
 */
let lastRenderedFrame = -1;
function renderFrame(index) {
  if (!canvas || !ctx) return;
  if (index < 0 || index >= TOTAL_FRAMES) return;
  const img = images[index];
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const canvasW = window.innerWidth;
  const canvasH = window.innerHeight;

  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const imgRatio = imgW / imgH;
  const screenRatio = canvasW / canvasH;

  let drawW, drawH, drawX, drawY;

  if (screenRatio > imgRatio) {
    drawW = canvasW;
    drawH = canvasW / imgRatio;
  } else {
    drawH = canvasH;
    drawW = canvasH * imgRatio;
  }

  drawX = (canvasW - drawW) / 2;
  drawY = (canvasH - drawH) / 2;

  // Background clear with the exact matching brand red
  ctx.fillStyle = '#b80d24';
  ctx.fillRect(0, 0, canvasW, canvasH);

  // High quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
  lastRenderedFrame = index;
}

/**
 * Calculate target frame from page scroll position
 */
function updateScrollTarget() {
  if (!scrollTrack) return;

  const rect = scrollTrack.getBoundingClientRect();
  const trackHeight = scrollTrack.offsetHeight - window.innerHeight;
  const scrollY = -rect.top;

  let fraction = scrollY / trackHeight;
  fraction = Math.max(0, Math.min(1, fraction));

  targetFrame = fraction * (TOTAL_FRAMES - 1);
}

window.addEventListener('scroll', updateScrollTarget, { passive: true });

/**
 * Physics Lerp Loop (runs on every animation frame)
 */
function animationLoop() {
  const diff = targetFrame - currentFrame;
  if (Math.abs(diff) > 0.005) {
    currentFrame += diff * lerpFactor;
  } else {
    currentFrame = targetFrame;
  }

  const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
  if (frameIdx !== lastRenderedFrame) {
    renderFrame(frameIdx);
  }

  requestAnimationFrame(animationLoop);
}

/**
 * Toast Notification Helper
 */
export function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0px)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2500);
}

window.showToast = showToast;

/**
 * Global BMI Calculator Function
 */
window.calculateBMI = function() {
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const ageInput = document.getElementById('age');
  const activityInput = document.getElementById('activity');

  if (!heightInput || !weightInput || !ageInput) return;

  const height = parseFloat(heightInput.value) / 100;
  const weight = parseFloat(weightInput.value);
  const age = parseInt(ageInput.value, 10);
  const activity = parseFloat(activityInput.value) || 1.55;

  if (!height || !weight || !age || height <= 0 || weight <= 0) {
    showToast('Please enter valid height, weight, and age.');
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  const proteinBase = weight * 2.0; // 2g per kg for active individuals
  const proteinGoal = Math.round(proteinBase * activity);

  const bmiScore = document.getElementById('bmi-score');
  const proteinGoalEl = document.getElementById('protein-goal');
  const resultDiv = document.getElementById('bmi-result');

  if (bmiScore) bmiScore.innerText = bmi;
  if (proteinGoalEl) proteinGoalEl.innerText = `${proteinGoal}g / day`;
  if (resultDiv) resultDiv.classList.remove('hidden');

  showToast(`BMI: ${bmi} | Recommended Goal: ${proteinGoal}g protein/day 🎯`);
};

/**
 * Initialize Interactivity on DOM Loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  // Menu Category Filter
  const filterButtons = document.querySelectorAll('[data-category-filter]');
  const menuCards = document.querySelectorAll('[data-menu-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category-filter');

      // Update button styles
      filterButtons.forEach(b => {
        b.className = 'px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface text-label-lg font-medium transition-all';
      });
      btn.className = 'px-4 py-2 rounded-lg bg-primary text-on-primary text-label-lg font-medium transition-all';

      // Filter cards
      menuCards.forEach(card => {
        const itemCategory = card.getAttribute('data-menu-category');
        if (category === 'all' || itemCategory === category) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Order Now Buttons
  document.querySelectorAll('.order-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemName = btn.getAttribute('data-item') || 'High Protein Fuel';
      showToast(`Added ${itemName} to your order bag! 🥤`);
    });
  });

  // Franchise Form Submit
  const franchiseForm = document.getElementById('franchise-form');
  if (franchiseForm) {
    franchiseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for your franchise inquiry! Our team will contact you shortly. 🚀');
      franchiseForm.reset();
    });
  }
});

// Initialize setup
resizeCanvas();
preloadFrames();
animationLoop();
