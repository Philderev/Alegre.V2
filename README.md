# Alegre Solutions GS - Website Rebuild

A full multi-page rebuild of alegresolutionsgs.com, restructured around the original site's real
content (Las Vegas contractor marketing systems) with the production technical spec you provided:
SEO, schema, cookie consent, accessibility, legal pages, and conversion features.

## Color & Type System (pulled from your existing style.css)
- `--bg` `#000000` · `--navy` `#0e3c5c` · `--blue` `#77cbf1` · `--orange` `#e76c08`
- `--white` `#EAEAEA` · `--pure-white` `#FFFFFF` · `--muted` `#B0B0B0` · `--border` `rgba(255,255,255,.15)`
- Headings: **Bebas Neue** · Body: **Inter**
- Signature visual motif: the dashed "circuit/conduit" connector line running through the 7
  service cards on the homepage and services page - a literal nod to "Not a Menu. A System."

## What's real vs. placeholder
**Real, ready to use:** all copy on the homepage, about, services, FAQ, and the 7 individual
service pages - pulled directly from your live site's actual positioning and expanded into full
pages (benefits / process / pricing intent / FAQ / schema) per page. The logo (`logo.webp`),
hero video (`construction.mp4` / `construction.webm`), and contact icons (phone/email/address)
are your real uploaded assets, already wired into every page.

**Still templated - replace before launch:**
- `case-studies.html` uses placeholder names/metrics. The reviews page and homepage testimonials
  section are archived in `/archive/` for future use. Swap in real, attributed client reviews and case study numbers - get
  written permission before publishing client names or results.
- `/images/hero-poster.jpg` and `og-image.jpg` are still generated placeholders (a video
  frame grab works well for the poster - it's what shows before the video loads/on slow connections).
- All 7 legal pages (`privacy-policy.html`, `terms-and-conditions.html`, `cookie-policy.html`,
  `accessibility-statement.html`, `disclaimer.html`, `do-not-sell.html`, `data-request.html`)
  are real, substantive starting drafts referencing Nevada NRS 603A - but **have not been
  reviewed by an attorney**. Each page includes a visible template notice; have Nevada counsel
  review before publishing.
- GoHighLevel forms are wired as placeholders only, per your spec:
  `<div id="ghl-contact-form">` and `<div id="ghl-audit-form">` - drop in your real GHL embed
  scripts (you already have a working embed at `api.leadconnectorhq.com/widget/form/...`).
- `/blog/` includes 3 real, original sample posts (not placeholders) to demonstrate the system,
  plus `post-template.html` - duplicate that file for each new article.

**Note on file size:** `hero-video.mp4` (~19.5MB) and `hero-video.webm` (~31MB) are your real
uploaded footage as-is. That's heavier than ideal for a Lighthouse score / mobile load time -
worth compressing (e.g. via HandBrake or `ffmpeg -crf 28`) to roughly 3-6MB before going live.
Say the word if you'd like me to compress them for you.

## Structure
```
/index.html, about.html, contact.html, services.html,
  case-studies.html, blog.html, 404.html, thank-you.html
/privacy-policy.html, terms-and-conditions.html, cookie-policy.html,
  accessibility-statement.html, disclaimer.html, do-not-sell.html, data-request.html
/robots.txt, sitemap.xml, .htaccess
/style.css, /responsive.css, /forms.css, /animations.css
/script.js, /cookie-consent.js, /lazyload.js, /animations.js
/images/  (logos, hero poster, og image - see placeholders above)
/videos/  (hero video files)
/services/    7 individual service pages
/blog/        index.html, post-template.html, + 3 real sample posts
```

## Deployment to Hostinger
1. Replace the placeholder assets noted above with your real logo, video, and GHL form embed
   codes (search each HTML file for `id="ghl-`).
2. Have an attorney review the 7 legal pages and update business-specific details.
3. Upload the entire folder contents to `public_html` via Hostinger's File Manager or FTP
   (the `.htaccess` is already configured for HTTPS redirect, GZIP, caching, and security
   headers - no extra server config needed on Hostinger's Apache stack).
4. Update `sitemap.xml`'s `<lastmod>` dates after you make changes, and submit the sitemap in
   Google Search Console.
5. Swap the analytics/marketing script tags in `cookie-consent.js`'s deferred-script pattern
   (`<script type="text/plain" data-cookie-category="analytics" data-src="...">`) once you add
   GA4/Meta Pixel, so they stay blocked until a visitor accepts cookies.

## Notes
- No build step required - pure HTML/CSS/JS, opens directly in any browser or VS Code Live Server.
- Lighthouse-friendly by default: deferred scripts, lazy-loaded media via `lazyload.js`,
  `prefers-reduced-motion` support, and minimal layout shift - but real performance numbers
  depend on your final image/video file sizes once you replace the placeholders.
