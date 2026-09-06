# Nuclei Vulnerability Scanning for EyeNova Qatar

This directory contains custom [Nuclei](https://github.com/projectdiscovery/nuclei) vulnerability scanning templates designed specifically to audit EyeNova's payment endpoints, security headers, and authorization barriers.

---

## 1. Installation

### Windows (Recommended via Scoop or Direct Binary)
* **Using Scoop**:
  ```powershell
  scoop install nuclei
  ```
* **Using Go**:
  ```powershell
  go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
  ```
* **Direct Download**:
  Download the latest precompiled Windows binary (`nuclei_x.x.x_windows_amd64.zip`) directly from [GitHub Releases](https://github.com/projectdiscovery/nuclei/releases) and place `nuclei.exe` in your `PATH`.

### macOS / Linux
```bash
brew install nuclei
```

---

## 2. Running EyeNova Security Verification Scans

Start your local server:
```bash
npm run dev
# or
npm start
```

### Scan with Custom EyeNova Templates
Run all tailored tests in this directory against your local or staging server:
```bash
nuclei -target http://localhost:3000 -t nuclei/
```

### Run Community OWASP Top 10 Scans
Scan your staging or production domain against community vulnerability templates (XSS, SSRF, misconfigurations, CVEs):
```bash
# Update community templates
nuclei -update-templates

# Run non-destructive OWASP scans
nuclei -target https://staging.eyenova.qa -tags misconfig,cors,exposure,xss -severity low,medium,high,critical
```

---

## 3. Included Templates in `nuclei/`
* `headers-misconfiguration.yaml`: Verifies that CSP, HSTS, X-Content-Type-Options, and X-Frame-Options are strictly enforced.
* `admin-auth-bypass.yaml`: Confirms `/api/invoices` and `/api/orders` reject unauthenticated requests with `401 Unauthorized`.
* `webhook-signature-bypass.yaml`: Confirms `/api/webhooks/tap` and `/api/webhooks/skipcash` reject forged or tampered HMAC signatures with `401 Unauthorized`.
