# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - date YYYY-MM-DD

- Placeholder for upcoming changes and planned features

---

## [2.1.0] – 2026-05-26

### Fixed

- Förbättrat och vidareutvecklat navigation och menyhantering i menu.js och navigation.js.
- Vidareutvecklat dynamisk rendering av sektioner via sections.js.
- Uppdaterat styling och responsiv layout i style.css.
- Skapat sitemap.xml och robots.txt för förbättrad SEO och enklare indexering av webbplatsens sidor.
- Förbättrat struktur och förberedelser för dynamisk hantering av innehåll via REST API och WordPress CMS.

---

## [2.0.5] – 2026-05-26

### Fixed

- Improved active navigation state handling for the Home page by fixing aria-current="page" detection for root path navigation

---

## [2.0.4] – 2026-05-26

### Added

- Added dynamic navigation fetching using WPGraphQL
- Added menu.js module for GraphQL menu requests
- Added dynamic rendering of WordPress menu items
- Added support for aria-current="page" in navigation
- Added new our-guests.png image asset

### Changed

- Updated navigation.js to render navigation dynamically from WordPress data
- Updated main.js to initialize navigation asynchronously
- Updated sections.js to use optimized WordPress image sizes instead of full-size media to improve image loading

### Technical

- Integrated WordPress GraphQL endpoint for menu handling
- Replaced static navigation structure with CMS-driven menu rendering
- Added path normalization for local HTML routing

---

## [2.0.3] – 2026-05-24

### Added

- Team presentation on `About` page

---

## [2.0.2] – 2026-05-24

### Changed

- Improved skip link accessibility and keyboard navigation by adding focus handling for the main content area, with tabindex="-1" on <main>

---

## [2.0.1] – 2026-05-24

### Added

- Added maximum site width for large screens
- Added improved desktop hero image positioning
- Added updated technology stack description in the footer

---

## [2.0.0] – 2026-05-24

### Added

- Added dynamic WordPress sections with ACF and REST API
- Added reusable Hero, Intro, Image and Card sections
- Added dynamic buttons, links, cards and lists from WordPress
- Added support for dynamic section images and headings
- Added improved booking form validation and accessibility
- Added Netlify spam protection for booking forms
- Added favicon support for browsers and mobile devices

### Changed

- Replaced static sections with WordPress-managed content
- Simplified section rendering and frontend logic
- Improved section structure, navigation and CTA behavior
- Improved semantic HTML for dynamic content
- Simplified JavaScript comments, naming and file structure
- Improved consistency between static HTML and WordPress content

### Removed

- Removed old promo section system
- Removed console logs

---

## [1.3.1] – 2026-05-23

### Added

- Added Netlify Forms support for booking requests
- Enabled live contact form submissions

---

## [1.3.0] – 2026-05-23

### Added

- Added Yoast SEO configuration
- Added support for dynamic cabin pricing with ACF fields

---

## [1.2.1] – 2026-05-23

### Changed

- Validated html and css andcontinued with necessary changes:
- Improved footer layout structure and responsive grid behavior
- Removed duplicated footer content and heading IDs
- Improved semantic HTML structure and accessibility
- Added missing section headings for HTML validation
- Improved cabin card spacing and content hierarchy
- Refined full-width map page layout

---

## [1.2.0] – 2025-06-23

### Added

- Dynamic cabin rendering from the WordPress REST API
- Featured cabins filtering using ACF `featured` field
- Separate rendering logic for featured cabins and all cabins
- Dynamic rendering for `stay.html`
- Reusable cabin rendering functions
- Reusable cabin card templates
- Dynamic featured image rendering using WordPress `_embedded` media data
- Fallback image handling for missing featured images
- Dynamic pricing, guest count and location information
- Special layout styling for Baita Valdoro on larger screens
- Improved cabin card layout with metadata section, visual separation and separate positioning of price

### Changed

- Replaced static featured cabin cards with dynamic WordPress content
- Replaced static stay page cabin cards with dynamic WordPress content
- Improved cabin card typography and information hierarchy
- Reused existing frontend styling with dynamic WordPress data

---

## [1.1.1] – 2025-06-23

### Added

- Render cabins dynamically from WordPress API

---

## [1.1.0] – 2025-06-23

### Added

- First WordPress REST API integration
- Added cabins API fetch module `fetchCabins();`
- Connected frontend to headless WordPress backend

---

## [0.0.5] – 2025-06-22

### Added

- Refine responsive layouts for tablet and mobile
- Update visual design and color palette
- Interactive map preview and full map page
- Adjusted page titles

---

## [0.0.4] – 2025-06-22

### Added

- Mobile navigation menu
- Keyboard navigation and focus states
- Improve semantic structure and accessibility

---

## [0.0.3] – 2025-06-22

### Added

- Responsive hero section
- Accessible responsive footer
- Valdoro branding and imagery

---

## [0.0.2] – 2025-06-22

### Added

- Semantic navigation
- Hero section
- Responsive layout foundation
- Cabin cards and content sections

---

## [0.0.1] – 2025-06-21

### Added

- Initial project setup
- Basic HTML structure

---

## Legend

- **Added**: new features or components
- **Changed**: updates to existing behavior
- **Deprecated**: soon-to-be removed features
- **Removed**: deprecated features now gone
- **Fixed**: bug fixes
- **Security**: security-related fixes or enhancements
- **Notes**: related comments, limitations, or clarifications
