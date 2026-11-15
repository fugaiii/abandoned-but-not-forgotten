// Figures (Moon + Mars): hover a part = peek, click = stays open (even while scrolling).
// Click the same part again or anywhere else to close it.
// When nothing is picked, the dialog with data-part="default" shows.

const figures = [...document.querySelectorAll('.figure')].map(el => ({
    el,
    hovered: null,   // part the mouse is on right now
    pinned: null,    // part that was clicked
}));

// Turn on the outline + dialog we should show in this figure, turn off the rest
function update(fig) {
    const current = fig.hovered || fig.pinned || 'default';
    fig.el.querySelectorAll('[data-part]').forEach(el => {
        el.classList.toggle('on', el.dataset.part === current);
    });
}

figures.forEach(fig => {
    fig.el.querySelectorAll('.part').forEach(part => {
        const name = part.dataset.part;

        part.addEventListener('pointerenter', e => {
            if (e.pointerType !== 'mouse') return;   // phones/tablets just use taps
            fig.el.classList.add('touched');          // fade away the "Hover over my parts" text
            fig.hovered = name;
            update(fig);
        });

        part.addEventListener('pointerleave', () => {
            fig.hovered = null;
            update(fig);
        });

        part.addEventListener('click', e => {
            e.stopPropagation();                      // don't let the page click below close it
            fig.el.classList.add('touched');
            const wasPinned = fig.pinned === name;
            figures.forEach(other => { other.pinned = null; update(other); });  // only one open at a time
            fig.pinned = wasPinned ? null : name;
            update(fig);
        });
    });

    update(fig);   // show the default dialog right away
});

// Clicking anywhere else closes it (but clicking inside a dialog doesn't)
document.addEventListener('click', e => {
    if (e.target.closest('.bubble')) return;
    figures.forEach(fig => { fig.pinned = null; update(fig); });
});
