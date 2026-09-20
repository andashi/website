# DNS for andashi.org

The zone lives at deSEC, and it lives in this file. Applying it is one command:

```sh
desec import -f dns/andashi.org.json andashi.org      # add or update
desec export -f /tmp/zone.json andashi.org            # read the zone back
desec export-zone -f /tmp/andashi.org.zone andashi.org
```

`desec` is `desec-dns` (MIT, `s-hamann/desec-dns`); on Arch it is
`python-desec-dns` in the AUR, otherwise `pipx install desec-dns`. It reads the
token from `$XDG_CONFIG_HOME/desec/token`, so no secret ever sits on a command
line or in a shell history.

**Do not use `--clear` here.** It removes every record not in this file, and
this file deliberately does not contain the GitHub domain-verification TXT
record (its value comes from the organisation settings and is not ours to
invent).

| What | Why |
|---|---|
| `A` / `AAAA` at the apex | GitHub Pages. Read off a live Pages site, not from memory: `dig A github.github.io` |
| `www CNAME andashi.github.io.` | the canonical host for an organisation site |
| `MX 0 .` | a null MX: this domain receives no mail, and says so |
| `TXT v=spf1 -all` | nobody is authorised to send mail as andashi.org |
| `_dmarc TXT p=reject` | and receivers should reject attempts, strictly aligned |

TTL is 3600 because that is deSEC's documented minimum for the zone.

## Not in here yet

- **CAA.** `0 issue "letsencrypt.org"` is right for GitHub Pages, but set it
  only **after** the certificate has been issued — a CAA record in place too
  early can block the issuance and leave the site without HTTPS.
- **`_github-pages-challenge-andashi TXT`.** GitHub shows that value under the
  organisation's Pages settings; it verifies the domain and prevents someone
  else from claiming it on Pages later. Worth adding.
