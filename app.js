(function () {
  // Show current window.name + account id
  var nameEl = document.getElementById("windowNameValue");
  var accountEl = document.getElementById("accountId");
  if (nameEl) {
    nameEl.textContent = JSON.stringify(window.name);
  }
  var accountId = "1260994";
  if (accountEl) {
    accountEl.textContent = accountId;
  }

  // Preserve query string on internal links
  document.querySelectorAll("a.linkUpdate").forEach(function (link) {
    var qs = window.location.search;
    if (qs && link.getAttribute("href") && !link.getAttribute("href").includes("?")) {
      link.setAttribute("href", link.getAttribute("href") + qs);
    }
  });

  // Dynamic input id on each reload
  var dynamicField = document.querySelector(".dynamicID");
  if (dynamicField) {
    dynamicField.setAttribute("id", "dynamic" + Date.now());
  }

  // Tabs
  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (t) {
        t.classList.remove("active");
      });
      document.querySelectorAll(".tab-panel").forEach(function (p) {
        p.classList.remove("active");
      });
      tab.classList.add("active");
      var map = {
        featured: "panel-featured",
        best: "panel-best",
        discount: "panel-discount",
        premium: "panel-premium",
        gift: "panel-gift"
      };
      var panel = document.getElementById(map[tab.dataset.tab]);
      if (panel) panel.classList.add("active");
    });
  });

  // Modal
  var modal = document.getElementById("mySpecials");
  document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (modal) modal.hidden = false;
    });
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (modal) modal.hidden = true;
    });
  });
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.hidden = true;
    });
  }

  // Add dynamic inputs
  var addBtn = document.getElementById("addDynamic");
  var container = document.getElementById("dynamicInputs");
  var inputCount = 0;
  if (addBtn && container) {
    addBtn.addEventListener("click", function () {
      inputCount += 1;
      var wrap = document.createElement("div");
      wrap.className = "click-cell";
      wrap.innerHTML =
        "<h4>Dynamic Input " +
        inputCount +
        '</h4><input type="text" name="myInputs[]" placeholder="Added field ' +
        inputCount +
        '">';
      container.appendChild(wrap);
    });
  }

  // Error-throwing click targets (for error-click heatmap cases)
  var errCounter = 0;
  function throwOn(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    el.addEventListener("click", function () {
      throw new Error("ERROR" + errCounter++);
    });
  }
  throwOn("#errorclicks1");
  throwOn("#rageerrorclicks1");
  throwOn("#deaderror1");
  throwOn("#deadrageerror1");

})();
