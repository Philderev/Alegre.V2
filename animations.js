/* ===================================================================
   ANIMATIONS.JS - scroll-triggered reveals + exit-intent popup
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

    /* ---------- Exit-intent popup ----------
       Fires once per session, only on desktop pointer leaving toward
       the top of the viewport, and never if the user already converted
       or dismissed it this session. */
    var popup = document.querySelector("[data-exit-popup]");
    if(popup){
      var SESSION_KEY = "alegre_exit_popup_shown";
      var shown = sessionStorage.getItem(SESSION_KEY);
      var isDesktop = window.matchMedia("(min-width: 900px)").matches;

      function openPopup(){
        if(sessionStorage.getItem(SESSION_KEY)) return;
        popup.classList.add("is-open");
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "hidden";
      }
      function closePopup(){
        popup.classList.remove("is-open");
        document.body.style.overflow = "";
      }
      popup.querySelectorAll("[data-popup-close]").forEach(function(btn){
        btn.addEventListener("click", closePopup);
      });
      popup.addEventListener("click", function(e){
        if(e.target === popup) closePopup();
      });
      document.addEventListener("keydown", function(e){
        if(e.key === "Escape") closePopup();
      });

      if(isDesktop && !shown){
        document.addEventListener("mouseout", function(e){
          if(e.clientY < 60 && !e.relatedTarget){
            openPopup();
          }
        });
      }
      // Mobile fallback: trigger on scroll-depth instead of mouseout
      if(!isDesktop && !shown){
        window.addEventListener("scroll", function(){
          var scrolled = (window.scrollY) / (document.body.scrollHeight - window.innerHeight);
          if(scrolled > 0.6){ openPopup(); }
        }, { passive:true });
      }
    }

  });
})();
