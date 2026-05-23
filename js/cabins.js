/**
 * @file cabins.js
 * @description
 * fetchCabins() fetches cabin data from the WordPress REST API
 * and gets cabin content from WP before renering it for ui.
 * One renderFeaturedCabins(cabins) - Shown on the index.html page
 * Another one renderAllCabins(cabins) - Shown on the stay.html page.
 * @author Sara Sjödin Scolari
 */

// fetchCabins();
// Fetches cabin data from the WordPress REST API.
const API_URL = 'https://wordpress.sarasjodin.se/wp-json/wp/v2/cabins?_embed';

// fetchCabins() gets cabin data from WordPress
// It then sends the same data to the featured section and the all cabins section
export async function fetchCabins() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch cabins');
  }

  const cabins = await response.json();

  renderFeaturedCabins(cabins);
  renderAllCabins(cabins);
}

// Finds cabins marked as featured in WordPress
// These are shown on the home page
function renderFeaturedCabins(cabins) {
  const featuredCabins = cabins.filter((cabin) => {
    return cabin.acf.featured;
  });

  renderCabinList(
    featuredCabins,
    createFeaturedCabinCard,
    '#featured-cabins-container'
  );
}

// Shows all cabins on the stay page
function renderAllCabins(cabins) {
  renderCabinList(cabins, createCabinCard, '#all-cabins-container');
}

// Finds the right container on the page.
// If the container exists, it adds cabin cards to it
function renderCabinList(cabins, createCard, containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    return;
  }

  container.innerHTML = '';

  cabins.forEach((cabin) => {
    container.innerHTML += createCard(cabin);
  });
}

// Creates a small cabin card for the home page featured section
function createFeaturedCabinCard(cabin) {
  return `
    <article class="card">
      <img src="${getCabinImage(cabin)}" alt="${cabin.title.rendered}" />

      <div class="card-content">
        <h3>${cabin.title.rendered}</h3>
        <p>${cabin.acf.short_description}</p>
      </div>
    </article>
  `;
}

// Creates a larger cabin card for the stay page, showing all cabins and all data
function createCabinCard(cabin) {
  return `
    <article class="${getCabinCardClass(cabin)}">
      <img src="${getCabinImage(cabin)}" alt="${cabin.title.rendered}" />

      <div class="card-content">
        <h3>${cabin.title.rendered}</h3>
        <p>${cabin.acf.short_description}</p>
          <hr />

        <p>${cabin.acf.guest_count} guests</p>
        <p>${cabin.acf.location_info}</p>
        <p class="price">
  From <span>€${cabin.acf.price}</span> / night
</p>
      </div>
    </article>
  `;
}

// getCabinImage() retrieves the cabin image URL from the embedded media data
// Uses a fallback image, if there are no images in WP
// https://developer.wordpress.org/rest-api/using-the-rest-api/linking-and-embedding
// https://dalenguyen.medium.com/how-to-get-featured-image-from-wordpress-rest-api-5e023b9896c6
function getCabinImage(cabin) {
  if (
    cabin._embedded &&
    cabin._embedded['wp:featuredmedia'] &&
    cabin._embedded['wp:featuredmedia'][0] &&
    cabin._embedded['wp:featuredmedia'][0].source_url
    // to avoid undefined, missing image and broken rendering
  ) {
    return cabin._embedded['wp:featuredmedia'][0].source_url;
  }

  return 'assets/images/placeholder.png'; // Fallback image
  // TODO: Add a more suitable placeholder image...
}

// Makes Baita Valdoro larger on the stay page
function getCabinCardClass(cabin) {
  if (cabin.slug === 'baita-valdoro') {
    return 'card card--large';
  }

  return 'card';
}
