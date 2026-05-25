/**
 * @file menus.js
 * @description
 * This module handles fetching the navigation menu from the WordPress GraphQL API
 * @author Sara Sjödin Scolari
 */

const GRAPHQL_URL = 'https://wordpress.sarasjodin.se/graphql';

export async function fetchMenu() {
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
      body: JSON.stringify({ query })
    });

    const result = await response.json();

    console.log(result);

    return result.data.menu.menuItems.nodes.map((item) => ({
      label: item.label,
      href: normalizePath(item.path)
    }));
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    return [];
  }
}

function normalizePath(path) {
  if (path === '/') {
    return './index.html';
  }

  return `.${path.replace(/\/$/, '.html')}`;
}
