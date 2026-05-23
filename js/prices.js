/**
 * @file prices.js
 * @description
 * Fetches cabin price data from the WordPress REST API
 * and renders the pricing table.
 * @author Sara Sjödin Scolari
 */

const API_URL = 'https://wordpress.sarasjodin.se/wp-json/wp/v2/cabins?_embed';

export async function fetchPrices() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch prices');
  }

  const cabins = await response.json();

  renderPriceTable(cabins);
}

function renderPriceTable(cabins) {
  const tableBody = document.querySelector('#price-table-body');

  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = '';

  cabins.forEach((cabin) => {
    tableBody.innerHTML += `
      <tr>
        <th scope="row">${cabin.title.rendered}</th>
        <td>${cabin.acf.guest_count}</td>
        <td>€${cabin.acf.low_season_price} / night</td>
        <td>€${cabin.acf.high_season_price} / night</td>
      </tr>
    `;
  });
}
