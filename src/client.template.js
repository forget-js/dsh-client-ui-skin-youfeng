/* WorkBuddy 有风 theme — browser half (hand-written DSH ModuleLoader bundle). */
window.__ModuleLoader__.load({
  id: "dsh-client-ui-skin-workbuddy-youfeng",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    var TOKENS = __TOKENS__;
    var CSS = __CSS__;
    var CAT = __CAT__;

    var PLUGIN_ID = "dsh-client-ui-skin-workbuddy-youfeng";
    var THEME_SOURCE = "dsh-client-ui-skin-workbuddy-youfeng";
    var STYLE_KEY = "dsh-client-ui-skin-workbuddy-youfeng/theme.css";

    function apply(ctx) {
      var body = document.body;
      body.setAttribute("data-dsh-workbuddy-youfeng", "");

      var style = document.createElement("style");
      style.dataset.plugin = PLUGIN_ID;
      style.dataset.pluginCss = STYLE_KEY;
      style.textContent = CSS;
      document.head.appendChild(style);

      var theme = ctx.theme;
      if (theme === undefined && typeof ctx.get === "function") theme = ctx.get("theme");
      var disposeTokens = null;
      if (theme && typeof theme.overrideTokens === "function") {
        disposeTokens = theme.overrideTokens(THEME_SOURCE, TOKENS);
      }

      var scene = document.createElement("div");
      scene.className = "wf-scene";
      scene.setAttribute("aria-hidden", "true");

      var bg = document.createElement("div");
      bg.className = "wf-scene-bg";

      var cat = document.createElement("img");
      cat.className = "wf-scene-cat";
      cat.alt = "";
      cat.src = CAT;

      var quote = document.createElement("div");
      quote.className = "wf-scene-quote";
      quote.textContent = "窗外有风，心里有光。";

      scene.append(bg, cat, quote);
      body.appendChild(scene);

      function syncScene() {
        var slot = document.querySelector('[data-slot="main.conversation"]');
        var phaseNode = slot ? slot.querySelector("[data-phase]") : null;
        var phase = phaseNode ? phaseNode.getAttribute("data-phase") : null;
        var home = phase === "hero" || phase === "blank" || phase === "engaging";
        body.classList.toggle("wf-home", home);
      }

      syncScene();
      var sceneTimer = setInterval(syncScene, 350);

      ctx.effect(() => () => {
        clearInterval(sceneTimer);
        if (typeof disposeTokens === "function") disposeTokens();
        scene.remove();
        style.remove();
        body.classList.remove("wf-home");
        body.removeAttribute("data-dsh-workbuddy-youfeng");
      }, "ui-skin-workbuddy-youfeng: wallpaper and palette");

      if (document.readyState !== "complete") {
        window.addEventListener("load", syncScene, { once: true });
      }
    }

    exports.apply = apply;
    exports.inject = ["theme"];
    return module.exports;
  }
});
