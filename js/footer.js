/**
 * @file footer.js
 * @description
 * Updates the footer's copyright section text with the current year.
 * @author Sara Sjödin Scolari
 */

// setCurrentYear(); Adds the current year to the copyright section footer

/**
 * Creates a year variable that updates automatically for the footer copyright text.
 * @function
 * @returns {void}
 */
export function setCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = `${new Date().getFullYear()}`;
  }
}
