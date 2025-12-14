(function () {
  function getView() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("view") || "va-agency-template").trim();
  }

  function setCurrentNav(view) {
    const links = document.querySelectorAll('[data-lx-nav="1"] a[data-view]');
    links.forEach((a) => {
      const isCurrent = a.getAttribute("data-view") === view;
      if (isCurrent) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const view = getView();
    setCurrentNav(view);
  });
})();
