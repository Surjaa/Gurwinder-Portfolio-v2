# Gurwinder Parhar | Portfolio

React + Vite portfolio (Bootstrap 5, Motion). Content lives in `src/data.js`.

## Put it on GitHub (one time)

1. Create a new repository on GitHub, for example `portfolio`.
2. Unzip this folder and open Command Prompt in it.
3. Run:

```bat
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

4. On GitHub: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` builds and publishes the site. The live address is shown under **Settings → Pages**, usually `https://YOUR-USERNAME.github.io/portfolio/`.

## Make changes later

- Edit text, projects and links in `src/data.js`.
- Colours and fonts: `src/theme.js` and `src/index.css`.
- Photos and screenshots: `public/images/` (WebP).
- Resume: `public/Gurwinder_CV.pdf`.
- Commit and push. The site rebuilds automatically.

To preview locally (Command Prompt):

```bat
npm install
npm run dev
```

Then open http://localhost:5173.

## Search engine setup (SEO)

Already built in: title and description, Open Graph and Twitter cards, canonical link, JSON-LD (Person, ProfilePage, WebSite), `robots.txt`, `sitemap.xml`, a 1200×630 share image (`public/images/og-cover.jpg`), a no-JavaScript fallback in `index.html`, and a `404.html` page.

Before the first deploy, change these if your repository name is not `portfolio`:
- `https://surjaa.github.io/portfolio/` appears in `index.html`, `public/robots.txt`, `public/sitemap.xml` and `public/404.html`. Replace it with your real Pages address.

After the site is live (one time):
1. Go to https://search.google.com/search-console, add the property, and choose the URL-prefix option with your Pages address.
2. Copy the verification token into the commented `google-site-verification` line in `index.html`, then commit and push.
3. In Search Console, open **Sitemaps** and submit `sitemap.xml`. Then use **URL Inspection** on the homepage and click **Request indexing**.
4. Repeat steps 1 and 3 in Bing Webmaster Tools (https://www.bing.com/webmasters).

Keep the content current: update `src/data.js` when projects or roles change, and change `lastmod` in `public/sitemap.xml`.
