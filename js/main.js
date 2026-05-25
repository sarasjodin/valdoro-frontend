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
import { initMenu } from './navigation.js'; // Initializes the navigation menu
import { fetchCabins } from './cabins.js';
import { fetchPrices } from './prices.js';
import { fetchSections, renderSections } from './sections.js';
import { fetchMenu } from './menu.js';

async function init() {
  setCurrentYear(); // Adds the current year to the copyright section footer

  try {
    const menuItems = await fetchMenu();
    initMenu(menuItems); // Initializes the navigation menu with fetched menu items
  } catch (error) {
    console.error('Menu failed:', error);
    initMenu([]); // Initializes the navigation menu with an empty array if fetching fails
  }

  fetchCabins();
  fetchPrices();

  const currentPage = document.body.dataset.page; // Gets the current page data attribute on the body element

  if (!currentPage) return; // Stops if the page has no section data

  const sections = await fetchSections(currentPage); // Gets ACF sections from WordPress for the current page
  await renderSections(sections); // Renders sections into the page
}

init(); // Initializes the application by fetching and rendering sections for the home page
