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

setCurrentYear(); // Adds the current year to the copyright section footer
initMenu(); // Initializes the navigation menu
