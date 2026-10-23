// Ported verbatim from the inline "MENU FILTERING" block.
// Only imported by the index pages, where the tabs actually exist.

const tabs = document.querySelectorAll<HTMLElement>('.menu-tab');
const dishes = document.querySelectorAll<HTMLElement>('.dish');
const empty = document.getElementById('menuEmpty');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const filter = tab.dataset.filter ?? '';
    let visible = 0;
    dishes.forEach((dish) => {
      const match =
        filter === 'tutti' || (dish.dataset.category ?? '').includes(filter);
      dish.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    empty?.classList.toggle('show', visible === 0);
  });
});
