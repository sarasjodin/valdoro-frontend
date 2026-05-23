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

async function fetchCabins() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch cabins');
  }

  const cabins = await response.json();
  console.log(cabins);
}

fetchCabins();
