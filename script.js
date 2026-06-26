/* ===================================================================
   SCRIPT.JS - core interactions (no animation/observer logic here,
   see animations.js for scroll reveals + exit intent)
   =================================================================== */
(function(){
  "use strict";

  document.addEventListener("DOMContentLoaded", function(){

    /* ---------- Sticky header ---------- */
    var header = document.querySelector(".site-header");
    function onScrollHeader(){
      if(!header) return;
      if(window.scrollY > 40){ header.classList.add("is-scrolled"); }
      else{ header.classList.remove("is-scrolled"); }
    }
    onScrollHeader();
    window.addEventListener("scroll", onScrollHeader, { passive:true });

    /* ---------- Current page nav indicator ---------- */
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a[href]").forEach(function(link){
      var href = link.getAttribute("href");
      if(!href || href.indexOf("#") === 0 || href.indexOf("tel:") === 0 || href.indexOf("mailto:") === 0) return;
      var linkPage = href.split("/").pop() || "index.html";
      if(linkPage === currentPage){
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
    /* ---------- Mobile nav toggle ---------- */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if(toggle && nav){
      var navParent = nav.parentNode;
      var navNextSibling = nav.nextSibling;

      var closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "mobile-nav-close";
      closeButton.setAttribute("aria-label", "Close menu");
      nav.prepend(closeButton);

      if(!nav.querySelector(".mobile-nav-home")){
        var homeLink = document.createElement("a");
        homeLink.className = "mobile-nav-home";
        homeLink.href = "/";
        homeLink.textContent = "Home";
        nav.insertBefore(homeLink, nav.querySelector("a"));
      }

      function closeNav(){
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
        document.body.style.overflow = "";
        if(nav.parentNode !== navParent){
          navParent.insertBefore(nav, navNextSibling);
        }
      }

      function openNav(){
        if(window.matchMedia("(max-width: 980px)").matches && nav.parentNode !== document.body){
          document.body.appendChild(nav);
        }
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("nav-open");
        document.body.style.overflow = "hidden";
      }

      toggle.addEventListener("click", function(){
        if(nav.classList.contains("is-open")) closeNav();
        else openNav();
      });

      closeButton.addEventListener("click", closeNav);

      document.addEventListener("keydown", function(e){
        if(e.key === "Escape" && nav.classList.contains("is-open")){
          closeNav();
        }
      });

      document.addEventListener("click", function(e){
        if(!nav.classList.contains("is-open")) return;
        if(nav.contains(e.target) || toggle.contains(e.target)) return;
        closeNav();
      });

      window.addEventListener("resize", function(){
        if(!window.matchMedia("(max-width: 980px)").matches && nav.classList.contains("is-open")){
          closeNav();
        }
      });

      nav.querySelectorAll("a").forEach(function(link){
        link.addEventListener("click", closeNav);
      });
    }

    /* ---------- Back to top ---------- */
    var backToTop = document.querySelector(".back-to-top");
    if(backToTop){
      window.addEventListener("scroll", function(){
        if(window.scrollY > 600){ backToTop.classList.add("is-visible"); }
        else{ backToTop.classList.remove("is-visible"); }
      }, { passive:true });
      backToTop.addEventListener("click", function(){
        window.scrollTo({ top:0, behavior:"smooth" });
      });
    }

    /* ---------- Smooth scroll for in-page anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function(link){
      link.addEventListener("click", function(e){
        var id = link.getAttribute("href");
        if(id.length < 2) return;
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          var headerH = header ? header.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
          window.scrollTo({ top:top, behavior:"smooth" });
        }
      });
    });

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll(".faq-item").forEach(function(item){
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if(!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function(){
        var isOpen = item.classList.contains("is-open");
        // close siblings within the same list for a cleaner accordion
        var list = item.closest(".faq-list");
        if(list){
          list.querySelectorAll(".faq-item.is-open").forEach(function(openItem){
            if(openItem !== item){
              openItem.classList.remove("is-open");
              openItem.querySelector(".faq-a").style.maxHeight = null;
              openItem.querySelector(".faq-q").setAttribute("aria-expanded","false");
            }
          });
        }
        if(isOpen){
          item.classList.remove("is-open");
          a.style.maxHeight = null;
          q.setAttribute("aria-expanded","false");
        } else {
          item.classList.add("is-open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded","true");
        }
      });
    });

    /* ---------- Animated counters ---------- */
    var counters = document.querySelectorAll("[data-count]");
    if(counters.length && "IntersectionObserver" in window){
      var counterObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;
          var el = entry.target;
          var end = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var duration = 1400;
          var start = null;
          function step(ts){
            if(!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var value = (end * progress);
            el.textContent = (end % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
            if(progress < 1){ requestAnimationFrame(step); }
            else{ el.textContent = end + suffix; }
          }
          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        });
      }, { threshold:0.4 });
      counters.forEach(function(el){ counterObserver.observe(el); });
    }

    /* ---------- Floating-label form state (native fallback fields) ---------- */
    document.querySelectorAll(".field input, .field textarea").forEach(function(input){
      function sync(){
        var field = input.closest(".field");
        if(input.value && input.value.trim() !== ""){ field.classList.add("has-value"); }
        else{ field.classList.remove("has-value"); }
      }
      input.addEventListener("input", sync);
      input.addEventListener("blur", sync);
      sync();
    });

    /* ---------- GHL embed loaded-state swap ---------- */
    document.querySelectorAll('[id^="ghl-"]').forEach(function(el){
      var obs = new MutationObserver(function(){
        if(el.querySelector("iframe")){
          el.classList.add("is-loaded");
          obs.disconnect();
        }
      });
      obs.observe(el, { childList:true });
    });

  });
})();
