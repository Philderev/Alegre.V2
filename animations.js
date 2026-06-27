/* ===================================================================
   ANIMATIONS.JS - scroll-triggered reveals
   =================================================================== */
(function(){
  "use strict";

  document.addEventListener("DOMContentLoaded", function(){

    /* ---------- Scroll reveal ---------- */
    var reveals = document.querySelectorAll(".reveal");
    if(reveals.length && "IntersectionObserver" in window){
      var revealObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold:0.15, rootMargin:"0px 0px -60px 0px" });
      reveals.forEach(function(el, i){
        el.style.setProperty("--i", i % 6);
        revealObserver.observe(el);
      });
    } else {
      reveals.forEach(function(el){ el.classList.add("is-visible"); });
    }

  });
})();
