// Small-screen menus: the three-lines button in the top bar,
// and the arrow under the Mars map.
// Each button opens/closes the element its aria-controls points to.

document.querySelectorAll('[data-toggle]').forEach(button => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));

    function setOpen(open) {
        button.setAttribute('aria-expanded', open);
        button.setAttribute('aria-label', open ? button.dataset.labelClose : button.dataset.labelOpen);
        panel.classList.toggle('open', open);
    }

    button.addEventListener('click', e => {
        e.stopPropagation();                      // don't let the page click below close it again
        setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    // The top menu also closes when you tap anywhere else, or press Esc
    if (button.classList.contains('menu-button')) {
        document.addEventListener('click', e => {
            if (!panel.contains(e.target)) setOpen(false);
        });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') setOpen(false);
            });
    }
});
