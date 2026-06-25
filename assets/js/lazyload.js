/* ===================================================================
   LAZYLOAD.JS - defers offscreen media; native loading="lazy" is set
   directly in markup as the primary mechanism, this is the fallback /
   enhancement layer for background-image elements and older browsers.
   =================================================================== */
(function(){
  "use strict";

  document.addEventListener("DOMContentLoaded", function(){

    var lazyEls = document.querySelectorAll("[data-bg], img[loading='lazy'][data-src], video[data-src]");

    function load(el){
      if(el.dataset.bg){
        el.style.backgroundImage = "url('" + el.dataset.bg + "')";
        el.removeAttribute("data-bg");
      }
      if(el.dataset.src){
        if(el.tagName === "VIDEO"){
          var source = document.createElement("source");
          source.src = el.dataset.src;
          el.appendChild(source);
          el.load();
        } else {
          el.src = el.dataset.src;
        }
        el.removeAttribute("data-src");
      }
      el.classList.add("is-loaded");
    }

    if("IntersectionObserver" in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            load(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "200px 0px" });
      lazyEls.forEach(function(el){ io.observe(el); });
    } else {
      lazyEls.forEach(load);
    }

  });
})();
