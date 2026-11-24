# RP Workspace forms

[Open the live preview](https://saketj3003.github.io/rp-workspace-forms/)

Use the login and registration pages to check example inputs locally in the browser. Each form gives field-specific feedback and announces when all entries pass validation. The privacy page explains how the preview handles entered values.

## Run locally

From the repository directory, run the following command with Python 3. Open `http://127.0.0.1:8787/` in a browser. On Windows, `py -3` also works in place of `python`.

```sh
python -m http.server 8787 --bind 127.0.0.1
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Login form and registration link |
| `register.html` | Registration form and privacy acknowledgment |
| `privacy.html` | Privacy note and return links |
| `styles.css` | Shared palette, responsive layout, focus, errors and status styling |
| `app.js` | Field rules, submission handling, error recovery and focus management |
| `assets/` | Supplied RP wordmark, icon and decorative illustration |
| `Validation_Logic.md` | Validation triggers, feedback and test results for the 20 requested cases |

## Deployment

GitHub Pages serves the root directory of the `main` branch. All page and asset links are relative so the preview also works beneath a project subpath. There is no build or package installation step.

## Verification

The forms were exercised in Chrome 158.0.8127.37 and Firefox 159.0 at mobile, tablet and desktop widths. The submission folder includes the original wireframes and initial/error-state screenshots from the implemented pages.
