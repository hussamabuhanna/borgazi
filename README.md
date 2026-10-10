# Borgazi ART

A static artist website for [borgazi.art](https://borgazi.art), modelled on the structure of a long-scroll painter’s site: dark ground, script wordmark, wrapping navigation, hero portrait, italic tagline, vertical gallery with captions, and inner pages for shop, originals, media, courses, events, about, FAQ, contact, and links.

This is an original template. It does not copy proprietary Squarespace CSS, the reference artist’s paintings, or their writing.

## Files
- `index.html` — gallery home
- `about.html`, `shop.html`, `originals.html`, `media.html`, `courses.html`, `events.html`, `faq.html`, `contact.html`, `links.html`
- `styles.css` — layout
- `site.js` — header, mobile menu, newsletter
- `gallery.js` — artwork list and lightbox (prev / next)

## Run
Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8080
```

Google Fonts and Unsplash placeholders need a network connection.

## Customize
Replace the name, emails, biography, FAQ, and images with the artist’s own material. Edit `ARTWORKS` in `gallery.js` for the gallery. Point shop cards at a real store when ready.
