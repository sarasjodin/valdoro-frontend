/**
 * @file cabins.js
 * @description
 * Fetches cabin data from the WordPress REST API
 * and prepares cabin content for frontend rendering.
 * @author Sara Sjödin Scolari
 */

// fetchCabins();
// Fetches cabin data from the WordPress REST API.
const API_URL = 'https://wordpress.sarasjodin.se/wp-json/wp/v2/cabins?_embed';

export async function fetchCabins() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch cabins');
  }

  const cabins = await response.json();

  renderCabins(cabins);
}

// Renders cabin data into the frontend UI.
function renderCabins(cabins) {
  const container = document.querySelector('#cabins-container');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  cabins.forEach((cabin) => {
    let image = '';

    if (
      cabin._embedded &&
      cabin._embedded['wp:featuredmedia'] &&
      cabin._embedded['wp:featuredmedia'][0]
    ) {
      image = cabin._embedded['wp:featuredmedia'][0].source_url;
    }

    const card = `
      <article class="card">
        <img
          src="${image}"
          alt="${cabin.title.rendered}"
        />

        <div class="card-content">
          <h3>${cabin.title.rendered}</h3>

          <p>${cabin.acf.short_description}</p>
        </div>
      </article>
    `;

    container.innerHTML += card;
  });
}
