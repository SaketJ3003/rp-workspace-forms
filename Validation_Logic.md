# Validation and QA

## Input rules

| Control | Rule |
| --- | --- |
| Full name | Trim outer whitespace. Accept 2–80 Unicode code points, including spaces and punctuation. |
| Email | Trim outer whitespace, require an address of at most 254 characters, use HTML email validity and require a dot in the domain. |
| Login password | Require a nonblank value of at most 128 Unicode code points. |
| Registration password | Require 15–128 Unicode code points and at least one non-whitespace character. Spaces remain part of the password. |
| Confirmation | Require the field, then compare its complete value to the registration password. |
| Privacy acknowledgment | Require the native checkbox to be checked. |

## Submission and feedback

Before the first submit, users can type without seeing errors. A submit attempt validates every field in document order. Each invalid control receives its specified inline message and `aria-invalid="true"`. Its `aria-describedby` points to the error, and focus moves to the first invalid input. After a submit attempt, editing a field reruns its rule. Editing the registration password also rechecks confirmation.

Once every field passes, the form's `role="status"` region announces “Login details passed validation.” or “Registration details passed validation.” Any edit clears that message.

Both forms intercept submission. The controls omit serializable names, the fieldsets start disabled until the handlers are ready, and the page's Content Security Policy blocks form actions and scripted network connections. The application keeps entered values in the page controls and uses no storage, analytics, credential lists or authentication service.

## QA results · 24 November 2026

Chrome 158.0.8127.37 and Firefox 159.0 each ran the form lifecycle at **375, 768 and 1440 CSS px**. Additional layout checks used 320 CSS px. The zoom check used Chrome's 200% page-zoom preference and Firefox's 2× layout scale. The QA evidence includes full-page desktop and mobile captures of the initial and invalid states.

| Case | Check | Actual outcome |
| --- | --- | --- |
| 01 | Empty submit | Both forms showed an error for every empty required control. Focus moved to Email or Full name. |
| 02 | Whitespace only | Blank email and password values produced their respective required messages. Success stayed empty. |
| 03 | Name boundaries | One-character and 81-character names each triggered the 2–80 character error. |
| 04 | International names | Registration accepted 李 明 and O’Neil, including outer padding on the first name. |
| 05 | Malformed email | An incomplete address, a dotless domain, an empty domain label and a trailing dot each triggered the specified email error. |
| 06 | Plus alias and subdomain | Both forms accepted a plus-addressed email at a subdomain, with surrounding spaces. |
| 07 | Long email | Both forms rejected an address longer than 254 characters. |
| 08 | Password boundaries | Registration rejected lengths 14 and 129 and accepted 15 and 128. Login also rejected 129. |
| 09 | Password spaces | A password containing leading, internal and trailing spaces passed with exact confirmation. Its value retained the spaces. |
| 10 | Confirmation | A different confirmation showed the mismatch message. An empty confirmation showed the required message. |
| 11 | Privacy checkbox | Otherwise-valid registration stopped at the unchecked box and displayed the privacy acknowledgment error. |
| 12 | Valid login | The supplied sample produced “Login details passed validation.” The URL stayed on the form. |
| 13 | Valid registration | The supplied sample and checked box produced “Registration details passed validation.” |
| 14 | Edit after error | Correcting a field cleared its message and invalid state. A subsequent submit rechecked the entire form. |
| 15 | Keyboard and accessibility | Tab and Shift+Tab followed source order, focus indicators were visible, Space toggled consent and Enter submitted. Accessible labels and error descriptions were inspected. Audible screen-reader output was not tested. |
| 16 | Responsive layout | Both forms stayed within the viewport at 320, 375, 768 and 1440 CSS px. Inputs and buttons met 48 px minimum height. All three pages also reflowed at 200% in Chrome and 2× scaling in Firefox. |
| 17 | Navigation | Login, registration and privacy links opened their expected pages. Both privacy return links worked. |
| 18 | Data handling | The final runs recorded zero submit-time requests, console messages, URL changes, cookies or entries in local/session storage. |
| 19 | Two engines | Both form lifecycles ran in Chrome 158.0.8127.37 and Firefox 159.0 at 375, 768 and 1440 CSS px. |
| 20 | Source and markup | Nu HTML Checker found no HTML errors across three pages. The CSS checker and JavaScript syntax check passed. Source review confirmed semantic landmarks, Grid/Flexbox, local assets and dependency-free validation. |
