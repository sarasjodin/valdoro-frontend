/**
 * @file footer.js
 * @description
 * Updates the footer's copyright section text with the current year.
 * @author Sara Sjödin Scolari
 */

// setCurrentYear();  Updates the footer year automatically

export function setCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = `${new Date().getFullYear()}`;
  }
}
