# Artistic General Dentistry Website Mockup

A standalone, presentation-ready static website built for Netlify. There is no build step or package installation.

## Preview Locally

From this folder, run:

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Deploy To Netlify

1. Create a new site in Netlify.
2. Drag this entire folder into Netlify Drop, or connect the folder to a Git repository.
3. Leave the build command empty.
4. Use `.` as the publish directory. This is already configured in `netlify.toml`.

The appointment form uses Netlify Forms and will appear in the site's Forms dashboard after a production deploy.

## Before A Public Launch

- The Netlify preview sends an `X-Robots-Tag: noindex, nofollow` header so it will not compete with the current website in search results. Remove that header from `netlify.toml` only when the approved redesign replaces the live site.
- Confirm the current office hours, service list, emergency availability, membership details, and public review rating with the client.
- Replace the monogram treatment in the doctor section with a strong, professionally lit portrait if one becomes available.
- Connect the final domain and confirm that appointment form notifications go to the correct office email address.

## Content Sources

Practice details, biography, services, phone, fax, address, hours, emergency support, and membership information were adapted from the current public practice website. The public rating and displayed review excerpts should be rechecked immediately before launch because review information can change.
