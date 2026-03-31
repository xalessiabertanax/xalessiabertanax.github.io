(() => {
  const body = document.body;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";

  const panelEl = document.getElementById("desk-panel");
  const panelBody = document.getElementById("desk-panel-body");
  const panelTitle = document.getElementById("desk-panel-title");
  const helpSheet = document.getElementById("help-sheet");
  const openHelpBtn = document.getElementById("open-help");
  const stage = document.querySelector("[data-desk-stage]");

  const titles = {
    map: "World map",
    laptop: "Laptop",
    painting: "Painting",
    camera: "Camera",
    books: "Books",
    notebook: "Notebook",
    plantHang: "Hanging plant",
    plantDesk: "Desk plant",
    plantRight: "Pilea",
    about: "Hello",
    drawers: "Drawers"
  };

  function centerInStage(el) {
    if (!stage || !el) return;
    const left = el.offsetLeft + el.offsetWidth / 2 - stage.clientWidth / 2;
    const max = Math.max(0, stage.scrollWidth - stage.clientWidth);
    stage.scrollTo({
      left: Math.min(max, Math.max(0, left)),
      behavior: reduced ? "auto" : "smooth"
    });
  }

  function openPanel(key) {
    const tpl = document.getElementById(`tpl-${key}`);
    if (!tpl || !panelEl || !panelBody || !panelTitle) return;
    panelBody.innerHTML = "";
    panelBody.appendChild(tpl.content.cloneNode(true));
    panelTitle.textContent = titles[key] || "Details";
    panelEl.hidden = false;
    const closeBtn = panelEl.querySelector(".desk-panel__close");
    if (closeBtn) closeBtn.focus();
  }

  function closePanel() {
    if (!panelEl || !panelBody) return;
    panelEl.hidden = true;
    panelBody.innerHTML = "";
  }

  function openHelp() {
    if (!helpSheet || !openHelpBtn) return;
    helpSheet.hidden = false;
    openHelpBtn.setAttribute("aria-expanded", "true");
    helpSheet.querySelector("[data-close-help]")?.focus();
  }

  function closeHelp() {
    if (!helpSheet || !openHelpBtn) return;
    helpSheet.hidden = true;
    openHelpBtn.setAttribute("aria-expanded", "false");
    openHelpBtn.focus();
  }

  function toggleTheme() {
    body.classList.toggle("theme-dim");
  }

  document.querySelectorAll("[data-panel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-panel");
      if (key) openPanel(key);
    });
  });

  document.querySelectorAll('[data-action="theme"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });

  document.querySelectorAll("[data-close-panel]").forEach((el) => {
    el.addEventListener("click", closePanel);
  });

  document.querySelectorAll("[data-close-help]").forEach((el) => {
    el.addEventListener("click", closeHelp);
  });

  openHelpBtn?.addEventListener("click", () => {
    if (helpSheet?.hidden) openHelp();
    else closeHelp();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePanel();
      closeHelp();
    }
  });

  const jumpMap = {
    map: '[data-panel="map"]',
    laptop: '[data-panel="laptop"]',
    books: '[data-panel="books"]',
    notebook: '[data-panel="notebook"]',
    lamp: '[data-action="theme"]'
  };

  document.querySelectorAll("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-jump");
      const sel = key && jumpMap[key];
      if (!sel) return;
      const target = document.querySelector(sel);
      if (!target) return;
      if (key === "lamp") {
        centerInStage(target);
        target.focus();
        toggleTheme();
        return;
      }
      centerInStage(target);
      target.focus();
    });
  });

  function initMotion() {
    if (!hasGsap || reduced) return;

    gsap.from(".desk-item", {
      opacity: 0,
      y: 26,
      duration: 0.65,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.08
    });

  }

  function initialScroll() {
    const laptop = document.querySelector('[data-panel="laptop"]');
    if (!stage || !laptop || window.innerWidth > 760) return;
    centerInStage(laptop);
  }

  window.addEventListener("load", () => {
    initialScroll();
    initMotion();
  });

  window.addEventListener("resize", () => {
    window.clearTimeout(window.__deskResize);
    window.__deskResize = window.setTimeout(initialScroll, 180);
  });
})();
