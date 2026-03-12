/**
 * NCCV Shared "Previous Editions" Dropdown
 *
 * Hosted at: https://thenccv.github.io/editions.js
 *
 * This script is loaded by every yearly conference site.
 * It dynamically replaces the contents of the "Previous Editions"
 * dropdown so that all sites stay in sync when a new year is added.
 *
 * HOW TO UPDATE: Just add a new entry to the `editions` array below
 * when a new conference year is created. All sites pick it up automatically.
 */
(function () {
  // ---- EDIT THIS LIST WHEN ADDING A NEW YEAR ----
  var editions = [
    { year: 2026, url: "https://thenccv.github.io/2026/" },
    { year: 2025, url: "https://thenccv.github.io/2025/" }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    // Find the dropdown whose toggle text is "Previous Editions"
    var toggles = document.querySelectorAll(".navbar .dropdown-toggle");

    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].textContent.trim() === "Previous Editions") {
        var menu = toggles[i].nextElementSibling;
        if (!menu || !menu.classList.contains("dropdown-menu")) continue;

        // Clear the static placeholder items
        menu.innerHTML = "";

        // Determine which year this site belongs to from the URL path
        var pathMatch = window.location.pathname.match(/^\/(\d{4})(\/|$)/);
        var currentYear = pathMatch ? parseInt(pathMatch[1], 10) : null;

        // Build fresh dropdown items
        editions.forEach(function (ed) {
          var a = document.createElement("a");
          a.className = "dropdown-item";

          if (ed.year === currentYear) {
            // Mark the current site's year as disabled
            a.classList.add("disabled");
            a.href = "#";
            a.textContent = ed.year + " (current)";
          } else {
            a.href = ed.url;
            a.textContent = ed.year;
          }

          menu.appendChild(a);
        });

        break; // Only one "Previous Editions" dropdown per page
      }
    }
  });
})();
