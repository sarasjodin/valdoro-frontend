/**
 * @file main.js
 * @description
 * This is the main entry point for initializing the Valdoro frontend application.
 * Starts shared functionality for all pages.
 *
 * The app uses vanilla JS and does not rely on any frontend frameworks.
 * @author Sara Sjödin Scolari
 */

import { setCurrentYear } from './footer.js';
import { initMenu } from './navigation.js';
import { fetchCabins } from './cabins.js';
import { fetchPrices } from './prices.js';
import { fetchSections, renderSections } from './sections.js';

setCurrentYear(); // Adds the current year to the copyright section footer
initMenu(); // Initializes the navigation menu
fetchCabins(); // Fetches cabin data from the WordPress REST API
fetchPrices(); // Fetches cabin price data from the WordPress REST API

async function init() {
  const currentPage = document.body.dataset.page; // Gets the current page

  if (!currentPage) return; // Stops if the page has no section data

  const sections = await fetchSections(currentPage); // Gets sections from WordPress
  await renderSections(sections); // Renders sections into the page
}

init(); // Initializes the application by fetching and rendering sections for the home page
