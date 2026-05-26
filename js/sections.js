/**
 * @file sections.js
 * @description
 * This module handles the initialization and functionality of the Advanced Custom Fields (ACF) sections.
 * It provides methods to initialize, render, and manage ACF sections within the site.
 * @author Sara Sjödin Scolari
 */

// CONSTANTS
const API_URL =
  'https://wordpress.sarasjodin.se/wp-json/wp/v2/sections?per_page=100';

// PUBLIC FUNCTIONS fetch & redner
export async function fetchSections(page) {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch sections');
  }

  const sections = await response.json();

  return sections.filter((section) => section.acf.page_location === page); // Filters sections based on the ACF field: page_location
}

export async function renderSections(sections) {
  for (const section of sections) {
    const target = getSectionTarget(section.acf.section_name);

    if (!target) {
      continue;
    }

    if (target.classList.contains('booking-cta')) {
      target.innerHTML = createBookingCtaSection(section.acf);
      continue;
    }

    target.innerHTML = await createSection(section);
  }
}

// SECTION BUILDERS
// If section has an image, it uses the image section template
// If it has cards, it uses the card section template
// Otherwise, it uses the text section template.
async function createSection(section) {
  const acf = section.acf;

  if (acf.section_name === 'hero') {
    return createHeroSection(acf);
  }

  if (acf.section_image) {
    return createImageSection(acf);
  }

  if (hasCards(acf)) {
    return createCardSection(acf);
  }

  return createTextSection(acf);
}

function createHeroSection(acf) {
  return `
    <div class="hero-section-image"></div>

    <div class="hero-overlay">
      <div class="container">
        <div class="hero-content">
          ${createSectionHeader(acf)}
          ${createHeroText(acf)}
          ${createActions(acf)}
        </div>
      </div>
    </div>
  `;
}

function createTextSection(acf) {
  return `
    <div class="container narrow-container">
      ${createSectionHeader(acf)}
      ${createSectionText(acf)}
      ${createSectionList(acf)}
      ${createActions(acf)}
    </div>
  `;
}

async function createImageSection(acf) {
  const image = await fetchMediaById(acf.section_image);
  const isIntro = acf.section_name === 'intro';

  if (isIntro) {
    return `
      <div class="container narrow-container">
        ${createSectionHeader(acf)}

        <div class="intro-layout">
          <div class="intro-content">
            ${acf.section_text || ''}
            ${createSectionList(acf)}
            ${createActions(acf)}
          </div>

          ${createImageFigure(image, 'intro-image')}
        </div>
      </div>
    `;
  }

  return `
    <div class="container split-section">
      <div>
        ${createSectionHeader(acf)}
        ${createSectionText(acf)}
        ${createSectionList(acf)}
        ${createActions(acf)}
      </div>

      ${createImageFigure(image, 'section-image')}
    </div>
  `;
}

function createCardSection(acf) {
  return `
    <div class="container">
      ${createSectionHeader(acf)}
      ${createSectionText(acf)}
      ${createCards(acf.cards_json)}
      ${createActions(acf)}
    </div>
  `;
}

function createBookingCtaSection(acf) {
  return `
    <div class="container">
      <div class="cta-panel">
        ${createSectionHeader(acf)}
        ${createSectionText(acf)}
        ${createActions(acf)}
      </div>
    </div>
  `;
}

// HELPER FUNCTIONS
function createSectionHeader(acf) {
  const headingTag = acf.heading_level || 'h2';

  return `
    <header class="section-header">
      ${
        acf.section_kicker
          ? `<p class="section-kicker">${acf.section_kicker}</p>`
          : ''
      }

      <${headingTag}>${acf.section_title}</${headingTag}>
    </header>
  `;
}

function createHeroText(acf) {
  return acf.section_text
    ? `<div class="hero-text">${acf.section_text}</div>`
    : '';
}

function createSectionText(acf) {
  return acf.section_text
    ? `<div class="section-text">${acf.section_text}</div>`
    : '';
}

function createSectionList(acf) {
  if (!acf.section_list) {
    return '';
  }

  const items = acf.section_list
    .split('\n')
    .filter((item) => item.trim() !== '')
    .map((item) => `<li>${item.trim()}</li>`)
    .join('');

  return `
    <ul class="info-list practical-information-list">
      ${items}
    </ul>
  `;
}

function createActions(acf) {
  const hasActions =
    (acf.secondary_button_text && acf.secondary_button_url) ||
    (acf.primary_button_text && acf.primary_button_url) ||
    (acf.cta_text && acf.cta_url);

  // If there are no buttons or CTAs, it returns an empty string = no container is creatd
  if (!hasActions) {
    return '';
  }

  // To style the buttons correctly, they need to be wrapped in a container
  return `
    <div class="cta">
      ${
        acf.secondary_button_text && acf.secondary_button_url
          ? `<a href="${acf.secondary_button_url}" class="button-secondary">${acf.secondary_button_text}</a>`
          : ''
      }

      ${
        acf.primary_button_text && acf.primary_button_url
          ? `<a href="${acf.primary_button_url}" class="button-primary">${acf.primary_button_text}</a>`
          : ''
      }

      ${
        acf.cta_text && acf.cta_url
          ? `<a href="${acf.cta_url}" class="cta-link">${acf.cta_text}</a>`
          : ''
      }
    </div>
  `;
}

// Creates a list of cards from ACF json data
function createCards(cardsJson) {
  const cards = JSON.parse(cardsJson);

  return `
    <div class="card-grid">
      ${cards.map((card) => createCard(card)).join('')}
    </div>
  `;
}

// Creates a single card based on the card data from ACF
function createCard(card) {
  const image = card.image
    ? `<img src="${card.image}" alt="${card.alt || ''}" class="card-image" />`
    : '';

  const text = card.text ? `<p>${card.text}</p>` : '';
  const items = card.items ? createCardItems(card.items) : '';

  return `
    <article class="card">
      ${image}

      <div class="card-content">
        <h3>${card.title}</h3>
        ${text}
        ${items}
      </div>
    </article>
  `;
}

// Creates a list of items for a card based on the ACF data
function createCardItems(items) {
  return `
    <ul class="info-list practical-information-list">
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

// Creates an image figure element for a section, based on the ACF image data
function createImageFigure(image, className) {
  if (!image || !image.source_url) {
    return '';
  }

  return `
    <figure class="${className}">
      <img
        src="${image.media_details.sizes.medium?.source_url || image.source_url}" // Use medium size else original image as fallback (image optimization)
        alt="${image.alt_text || ''}"
      />
    </figure>
  `;
}

// UTILITIES
// Checks if the ACF section has card data
function hasCards(acf) {
  return acf.cards_json && acf.cards_json.trim() !== '';
}

// Fetches media by ID from the WordPress REST API
async function fetchMediaById(id) {
  if (!id) {
    return null;
  }

  const response = await fetch(
    `https://wordpress.sarasjodin.se/wp-json/wp/v2/media/${id}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

// Gets the section target element from ACF (section_name)
function getSectionTarget(sectionName) {
  const targets = {
    hero: '#hero-section',
    intro: '#intro-section',
    section_1: '#section-1',
    section_2: '#section-2',
    section_3: '#section-3',
    section_4: '#section-4',
    section_5: '#section-5'
  };

  return document.querySelector(targets[sectionName]);
}
