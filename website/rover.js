// Rover parts: hover = peek, click = stays open (even while scrolling).
// Click the same part again or anywhere else to close it.

const rover = document.querySelector('.rover');
let hovered = null;   // part the mouse is on right now
let pinned = null;    // part that was clicked

// Turn on the outline + dialog of the part we should show, turn off the rest
function update() {
    const current = hovered || pinned;
    rover.querySelectorAll('[data-part]').forEach(el => {
        el.classList.toggle('on', el.dataset.part === current);
    });
}

rover.querySelectorAll('.part').forEach(part => {
    const name = part.dataset.part;

    part.addEventListener('pointerenter', e => {
        if (e.pointerType !== 'mouse') return;   // phones/tablets just use taps
        hovered = name;
        update();
    });

    part.addEventListener('pointerleave', () => {
        hovered = null;
        update();
    });

    part.addEventListener('click', e => {
        e.stopPropagation();                      // don't let the page click below close it
        pinned = (pinned === name) ? null : name;
        update();
    });
});

// Clicking anywhere else closes it (but clicking inside the dialog doesn't)
document.addEventListener('click', e => {
    if (e.target.closest('.bubble, .note')) return;
    pinned = null;
    update();
});
