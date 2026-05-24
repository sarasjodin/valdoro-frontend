/**
 * @file promos.js
 * @description
 * Fetches promo content from the WordPress REST API
 * and renders promo cards on the home page.
 * @author Sara Sjödin Scolari
 */

const API_URL = 'https://wordpress.sarasjodin.se/wp-json/wp/v2/promos';

export async function fetchPromos() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch promos');
  }

  const promos = await response.json();

  renderPromos(promos);
}

function renderPromos(promos) {
  const container = document.querySelector('#promos-container');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  promos.forEach((promo) => {
    container.innerHTML += createPromoCard(promo);
  });
}

function createPromoCard(promo) {
  return `
    <article class="card">
      <div class="card-content">
        <h3>${promo.title.rendered}</h3>
        ${promo.content.rendered}
      </div>
    </article>
  `;
}
