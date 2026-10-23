```javascript
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("gameSearch");
  const grid = document.getElementById("gameGrid");
  const noResults = document.getElementById("noResults");
  const filters = document.getElementById("filters");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (!search || !grid || !filters) return;

  let category = "all";

  function filterGames() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    grid.querySelectorAll(".game-card").forEach(card => {
      const text = card.textContent.toLowerCase();
      const matchesSearch = text.includes(query);
      const matchesCategory =
        category === "all" ||
        card.dataset.category === category;

      const show = matchesSearch && matchesCategory;
      card.hidden = !show;

      if (show) visible++;
    });

    if (noResults) {
      noResults.hidden = visible !== 0;
    }
  }

  search.addEventListener("input", filterGames);

  filters.addEventListener("click", event => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;

    category = button.dataset.category;

    filters.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    filterGames();
  });

  filterGames();
});
```
