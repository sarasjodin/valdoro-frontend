/**
 * @file navigation.js
 * @description
 * This module handles the initialization and functionality of the navigation menu.
 * @author Sara Sjödin Scolari
 */

// initMenu(); Initializes the navigation menu on page load

export function initMenu() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');

  if (!menuButton || !navigation) return;

  function openMenu() {
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');
    navigation.classList.add('is-open');
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('is-open');
  }

  function toggleMenu() {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    isOpen ? closeMenu() : openMenu();
  }

  menuButton.addEventListener('click', toggleMenu);

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', (event) => {
    const clickedOutsideMenu =
      !navigation.contains(event.target) && !menuButton.contains(event.target);

    if (clickedOutsideMenu) {
      closeMenu();
    }
  });
}
