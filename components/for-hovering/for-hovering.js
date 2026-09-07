/**
 * Component: For hovering (behavior)
 * Figma source: node 858:3092. See for-hovering.css for the visual spec.
 *
 * Vanilla JS, no dependencies, no build step — matches the rest of this static
 * project (see claude.md §7: everything else is pure CSS, this is the first
 * component that genuinely needs JS, since a live-positioned image cursor
 * can't be done with the native `cursor: url()` property alone across
 * elements with different images and hover states).
 *
 * Usage: include this script (deferred) on any page after the DOM, alongside
 * for-hovering.css. Mark any element that should swap the cursor with
 * data-hover-cursor="see-case" or data-hover-cursor="its-me" — see
 * for-hovering.html for the exact markup. One shared cursor element is created
 * and reused for every such element on the page.
 */
(function () {
  "use strict";

  var IMAGES = {
    "see-case": "images/case.png",
    "its-me": "images/me.png",
  };

  function init() {
    var targets = document.querySelectorAll("[data-hover-cursor]");
    if (!targets.length) return; // nothing on this page uses it — skip entirely

    var cursor = document.createElement("div");
    cursor.className = "for-hovering";
    cursor.setAttribute("aria-hidden", "true");

    var img = document.createElement("img");
    img.className = "for-hovering__image";
    img.alt = "";
    cursor.appendChild(img);
    document.body.appendChild(cursor);

    var visible = false;

    // Small offset so the image lands near the real cursor tip instead of the
    // whole 112.658×50px box's top-left corner sitting there.
    var OFFSET_X = -6;
    var OFFSET_Y = -6;

    function moveTo(x, y) {
      cursor.style.transform =
        "translate(" + (x + OFFSET_X) + "px, " + (y + OFFSET_Y) + "px)";
    }

    document.addEventListener("mousemove", function (event) {
      if (visible) moveTo(event.clientX, event.clientY);
    });

    targets.forEach(function (el) {
      var variant = el.getAttribute("data-hover-cursor");
      var src = IMAGES[variant];

      el.addEventListener("mouseenter", function (event) {
        if (src) img.src = src;
        cursor.classList.add("for-hovering--visible");
        el.classList.add("for-hovering-target--active");
        visible = true;
        moveTo(event.clientX, event.clientY);
      });

      el.addEventListener("mouseleave", function () {
        cursor.classList.remove("for-hovering--visible");
        el.classList.remove("for-hovering-target--active");
        visible = false;
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
