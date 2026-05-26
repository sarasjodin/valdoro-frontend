/**
 * @file navigation.js
 * @description
 * This module handles the initialization and functionality of the navigation menu.
 * @author Sara Sjödin Scolari
 */

// Handles the mobile navigation menu

export function initMenu(menuItems) {
  // Initializes the navigation menu with the provided menu items
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');

  // Stops if the menu elements are missing
  if (!menuButton || !navigation) return;

  renderMenu(menuItems, navigation); // Renders the menu items into the navigation element from the API

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

  // Toggles the mobile menu open/closed
  function toggleMenu() {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    isOpen ? closeMenu() : openMenu();
  }

  // Closes the menu after clicking a link on mobile
  function closeMenuOnMobile() {
    if (window.innerWidth < 768) {
      closeMenu();
    }
  }

  menuButton.addEventListener('click', toggleMenu);

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenuOnMobile);
  });

  // Closes the menu when clicking outside
  document.addEventListener('click', (event) => {
    const clickedOutsideMenu =
      !navigation.contains(event.target) && !menuButton.contains(event.target);

    if (clickedOutsideMenu) {
      closeMenu();
    }
  });
}

function renderMenu(menuItems, navigation) {
  // Renders the menu items into the navigation element from the API
  const currentPath = window.location.pathname; // Gets the current path to determine which menu item is active

  navigation.innerHTML = `
    <ul class="nav-list">
      ${menuItems
        .map((item) => {
          const hrefPath = item.href.replace('./', ''); // Normalizes the href to compare with the current path
          const isHome = item.href === './index.html'; // Checks if the menu item is the home page link
          const isCurrent =
            currentPath.includes(hrefPath) ||
            (isHome && currentPath.endsWith('/')); // Determines if the menu item is the current page based on the path

          return `
            <li class="nav-item">
              <a
                href="${item.href}"
                class="nav-link"
                ${isCurrent ? 'aria-current="page"' : ''}
              >
                ${item.label}
              </a>
            </li>
          `;
        })
        .join('')}
    </ul>
  `;
}
