// Scatters random stars behind the page. New positions on every visit.
// Stars spread out evenly-ish (no clumps) and are mostly tiny, with a few bigger sparkles.

const STAR_DENSITY = 6000;   // one star per this many square pixels. Smaller = more stars
const MIN_SIZE = 2;          // px
const MAX_SIZE = 14;         // px

const starLayer = document.createElement('div');
starLayer.className = 'stars';
starLayer.setAttribute('aria-hidden', 'true');
document.body.prepend(starLayer);

function makeStars() {
    starLayer.innerHTML = '';
    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = Math.round((w * h) / STAR_DENSITY);
    const placed = [];

    for (let i = 0; i < count; i++) {
        // Try 10 random spots and keep the one farthest from all other stars.
        // That's what stops them from clumping together.
        let best = null;
        let bestDistance = -1;

        for (let t = 0; t < 10; t++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            let closest = Infinity;
            for (const p of placed) {
                closest = Math.min(closest, (p.x - x) ** 2 + (p.y - y) ** 2);
            }
            if (closest > bestDistance) {
                bestDistance = closest;
                best = { x, y };
            }
        }
        placed.push(best);

        // Random size, but mostly small: cubing a 0..1 number pushes it toward 0
        const size = MIN_SIZE + Math.random() ** 3 * (MAX_SIZE - MIN_SIZE);

        const star = document.createElement('span');
        star.className = size > 7 ? 'star big' : 'star';
        star.style.left = (best.x / w) * 100 + '%';   // in %, so it stretches with the window
        star.style.top = (best.y / h) * 100 + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.opacity = 0.5 + Math.random() * 0.5;
        starLayer.appendChild(star);
    }
}

makeStars();

// Make a fresh sky if the window gets wider/narrower
// (only width: phones change height while scrolling, that would flicker)
let lastWidth = window.innerWidth;
let resizeTimer;
window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(makeStars, 200);
});
