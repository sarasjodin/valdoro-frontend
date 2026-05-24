/**
 * @file main.js
 * @description
 * This is the main entry point for initializing the Valdoro frontend application.
 * It imports and executes shared setup functions for the footer and navigation menu.
 *
 * The app uses vanilla JS and does not rely on any frontend frameworks.
 * @author Sara Sjödin Scolari
 */

import { setCurrentYear } from './footer.js';
import { initMenu } from './navigation.js';
import { fetchCabins } from './cabins.js';
import { fetchPrices } from './prices.js';
import { fetchPromos } from './promos.js';

setCurrentYear(); // Adds the current year to the copyright section footer
initMenu(); // Initializes the navigation menu
fetchCabins(); // Fetches cabin data from the WordPress REST API
fetchPrices(); // Fetches cabin price data from the WordPress REST API
fetchPromos(); // Fetches promo content from the WordPress REST API
