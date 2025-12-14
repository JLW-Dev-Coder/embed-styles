(function () {
  /* ===============================
     VIEW ROUTER
     =============================== */

  function getView() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("view") || "va-agency-template").trim();
  }

  function showView(view) {
    const sections = document.querySelectorAll("[data-lx-view]");
    sections.forEach((section) => {
      if (section.getAttribute("data-lx-view") === view) {
        section.classList.add("is-active");
        section.classList.remove("is-inactive");
      } else {
        section.classList.remove("is-active");
        section.classList.add("is-inactive");
      }
    });
  }

  function setCurrentNav(view) {
    const links = document.querySelectorAll('[data-lx-nav="1"] a[data-view]');
    links.forEach((a) => {
      const isCurrent = a.getAttribute("data-view") === view;
      if (isCurrent) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  /* ===============================
     VA AGENCY TEMPLATE LOGIC
     =============================== */

  function initModels() {
    const tabs = document.querySelectorAll(".model-tab");
    const slides = document.querySelectorAll(".model-slide");
    const nextBtns = document.querySelectorAll("[data-next]");
    const backBtns = document.querySelectorAll(".model-back-btn");

    if (!tabs.length || !slides.length) return;

    function setModel(index) {
      tabs.forEach((t) => t.classList.remove("active"));
      slides.forEach((s) => s.classList.remove("active"));

      if (tabs[index]) tabs[index].classList.add("active");
      if (slides[index]) slides[index].classList.add("active");
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        setModel(parseInt(tab.dataset.step, 10));
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setModel(parseInt(btn.dataset.next, 10));
      });
    });

    backBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        showView("va-agency-template");
      });
    });
  }

  function initTemplateMap() {
    const tabs = document.querySelectorAll(".template-tab");
    const panels = document.querySelectorAll(".template-panel");
    const viewDetailsBtn = document.getElementById("templateViewDetailsBtn");

    if (!tabs.length || !panels.length) return;

    let currentIndex = 0;

    function setTab(index) {
      currentIndex = index;
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      if (tabs[index]) tabs[index].classList.add("active");
      if (panels[index]) panels[index].classList.add("active");
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        setTab(parseInt(tab.dataset.templateStep, 10));
      });
    });

    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", () => {
        if (currentIndex === 0) {
          window.location.search = "?view=business-sectors";
        } else {
          alert("Detailed view coming soon.");
        }
      });
    }
  }

  /* ===============================
     DOCUMENT GENERATORS (MG)
     =============================== */

  function initMG() {
    const root = document.getElementById("mg");
    if (!root) return;

    root.querySelectorAll('.mg__toggle[role="switch"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.getAttribute("aria-checked") !== "true";
        btn.setAttribute("aria-checked", String(next));
      });
    });
  }

  /* ===============================
     BOOT
     =============================== */

  document.addEventListener("DOMContentLoaded", () => {
    const view = getView();

    showView(view);
    setCurrentNav(view);

    initModels();
    initTemplateMap();
    initMG();
  });
})();
