# Personal Website — Ziao Wang

A lightweight static site ready for GitHub Pages + custom domain.

## 1) Create the repository
- If you want a **user site**, name it: `{your-username}.github.io`.
- Otherwise create any repo name (e.g. `personal-site`) and enable Pages.
- Put **all files** from this folder at the repository root (or set Pages to the `/` root).

## 2) Enable GitHub Pages
- On GitHub: **Settings → Pages → Build and deployment**.
- **Source**: Deploy from a branch → `main` (or your default) → `/ (root)`.

## 3) Add your custom domain (optional, you already own one)
- In **Settings → Pages**, type your domain (e.g. `example.com`) and save.
- This will verify DNS later and request HTTPS automatically once DNS is correct.

## 4) DNS records (for apex and www)
Choose **one** approach for the apex (root) domain:

- **A records** (apex): point to GitHub Pages IPs **(as of 2025-10-26)**  
  `185.199.108.153`  
  `185.199.109.153`  
  `185.199.110.153`  
  `185.199.111.153`

- Or use an **ALIAS/ANAME** (if your DNS provider supports it) pointing to your GitHub Pages default domain.

For the **www** subdomain, add a **CNAME** record to your Pages default domain (e.g. `{username}.github.io`).

> See: GitHub Docs — Managing a custom domain for GitHub Pages.

After DNS propagates, return to **Settings → Pages** and ensure **Enforce HTTPS** is enabled.

## 5) CNAME file (in this repo)
Edit the `CNAME` file in this repository to exactly your domain (e.g. `example.com`).  
> Note: when deploying *from a branch*, GitHub uses the `CNAME` file. If you publish via a custom Actions workflow, `CNAME` is ignored — configure the custom domain in repo settings.

## 6) Local edits
Open `index.html` and `assets/style.css` to customize content and styles. Replace/translate text as you like. Your uploaded PDF was placed at `assets/CV_Ziao_Wang.pdf`.

---

**Tips**
- Keep an `index.html` at the publishing root, otherwise Pages may 404.
- `.nojekyll` avoids Jekyll processing (handy for folders starting with `_`).

Good luck! ✨
