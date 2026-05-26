/**
 * @file menu.js
 * @description
 * This module handles fetching the navigation menu from the WordPress GraphQL API
 * @author Sara Sjödin Scolari
 */

const GRAPHQL_URL = 'https://wordpress.sarasjodin.se/graphql';

export async function fetchMenu() {
  // Fetches the navigation menu from the WordPress GraphQL API
  // Fetches the menu with the slug "primary-menu" and returns an array of menu items with label and href
  const query = `
    query GetMenu {
      menu(id: "primary-menu", idType: SLUG) {
        menuItems {
          nodes {
            label
            path
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query }) // Sends the GraphQL query in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }

    const result = await response.json(); // Parses the JSON response from the GraphQL API

    return result.data.menu.menuItems.nodes.map((item) => ({
      // Maps the menu items to an array of objects with label and normalized href
      label: item.label,
      href: normalizePath(item.path)
    }));
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    return []; // Returns an empty array if the request fails
  }
}

function normalizePath(path) {
  // Normalizes the menu item path to match the format used in the navigation links
  if (path === '/') {
    return './index.html';
  }

  return `.${path.replace(/\/$/, '.html')}`; // Converts paths like "/stay/" to "./stay.html" and ensures it starts with "./"
}
