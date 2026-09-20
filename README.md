# andashi.org

One page, static, Astro. No framework islands: the only script loads the 3D
mark, and only after a click.

```sh
npm install
npm run dev      # localhost:4321
npm run build    # -> dist/
```

Brand assets are copied from `../brand/` into `public/`. When the mark changes,
run `python3 ../brand/mark.py` and copy again — `bin/sync-brand.sh` does both.

## Decisions worth keeping

- **No JavaScript at all, and no third-party requests.** The mark is a still
  image. `model-viewer` was refused first — 933 KB of third-party code with
  hardcoded `gstatic.com` URLs for its Draco and KTX2 decoders — and the
  self-hosted turntable that replaced it went too: the orb is rotationally
  symmetric, so 24 frames only moved a highlight around (at 180 degrees, 12% of
  pixels differ, mean 4.5 of 255). A still image carries the whole mark.
- **Fonts are self-hosted** through `@fontsource-variable`, with unicode-range,
  so a browser fetches the latin subsets only (47 KB + 39 KB). Before this the
  CSS asked for a font nothing loaded.
- **`--ink-dim` is measured, not chosen:** 5.59:1 on the page background and
  5.34:1 on cards. The old value was 3.55:1, below the 4.5:1 that small text
  needs.
- First load is 141 KB including both fonts; everything else is lazy.

## Headers, and where this should be hosted

GitHub Pages cannot set response headers. That is a limitation of the host, not
of the build: putting a CDN in front of it later adds them without touching
anything here, and `public/_headers` is already written for that day.

`public/_headers` carries the full set: a CSP that allows nothing but this
origin's images, styles and fonts, `no-referrer`, `nosniff`, `frame-ancestors
'none'`, a Permissions-Policy that turns every sensor off, and HSTS. **Cloudflare
Pages reads that file; GitHub Pages cannot set headers at all.** On GitHub Pages
only the `<meta http-equiv>` CSP in `Base.astro` applies, and `frame-ancestors`,
HSTS and the Permissions-Policy are simply gone. For a project about hardening
that is the argument for Cloudflare Pages — at the price of Cloudflare seeing
the traffic. Either way a third party sees it; only one of them lets us set the
headers.

`Strict-Transport-Security` here deliberately has no `preload`. Preloading is a
separate step, it is baked into browsers and it is hard to undo.

## Well-known files

| | |
|---|---|
| `llms.txt` | the llmstxt.org convention: what andashi is, the zone model, the declared files, the stated limits, the repositories |
| `.well-known/security.txt` | RFC 9116. Reports go through GitHub's private advisory flow, so nothing has to be mailed in the clear. **`Expires` is a hard date — renew it before 2027-09-20 or the file is invalid.** |
| `robots.txt`, `sitemap.xml` | both reference `https://andashi.org` |
| `404.astro` | Astro builds no 404 by default; without it the host's generic page would show |
| `favicon.ico/.svg/-32/-16`, `apple-touch-icon.png`, `og.png` | |

Deliberately absent: a web app manifest (it would need `manifest-src` in the CSP
for almost no gain on a page you read once) and a feed (there is nothing to
feed yet).

The strict CSP earned its keep immediately: it blocked the six inline
`style` attributes that carried the zone accent colours. They are static rules
in `ZoneCard.astro` now, and the build renders with zero violations.

## Crawlers

`robots.txt` currently allows everyone, including the AI crawlers. If that should
change, this is the snippet — it is a decision nobody has made yet:

```
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: CCBot
User-agent: PerplexityBot
User-agent: Google-Extended
Disallow: /
```

## If a download ever appears here

Right now this page describes the software and distributes none of it, so the
GPL attaches nothing to it: the licence, the upstream copyright notices and the
fork statement live in `andashi/home` — its readme, its `LICENSE.txt`, the
source headers and the app's about screen. The moment an APK is offered *from
this site*, that becomes conveying, and the notices plus a source offer have to
travel with the download.

## Still missing

- **Higher-resolution screenshots.** `public/shots/` holds the real thing, one
  per zone plus the app drawers, but at 540x960 — they come out of
  `provisioning/.artifact/`, which is not checked in anywhere. Displayed at
  270px they are sharp; anything larger needs a new run at device resolution.
- DNS for andashi.org — the workflow and `public/CNAME` are ready.
- **A contact address.** The page says to watch the repositories, because I did
  not want to publish an address nobody chose. If there should be one, it goes
  in the footer and in the "follow" line.
- `andashi/provisioning` must be public before this goes live: the main call to
  action links to it.

## Deploying

GitHub Pages: `.github/workflows/pages.yml` builds with `withastro/action` and
`public/CNAME` claims the domain. What is still needed:

1. the repository `andashi/website` on GitHub, `main` as default branch
2. Pages set to "GitHub Actions" in the repository settings
3. DNS for `andashi.org` — four `A` records to GitHub's Pages addresses
   (185.199.108–111.153), and `www` as a `CNAME` to `andashi.github.io`
