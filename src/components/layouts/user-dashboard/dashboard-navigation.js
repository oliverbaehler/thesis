import duotone from "icons/duotone";
import FavoriteIcon from '@mui/icons-material/Favorite';

/**
 * Navigation configuration for the dashboard sidebar.
 * Defines the structure, labels, icons, and paths for different sections and items.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} type - The type of the navigation item (e.g., "label" for section headers).
 * @property {string} label - The label for section headers.
 * @property {string} name - The name of the navigation item.
 * @property {Object} icon - The icon component used for the navigation item.
 * @property {Array<Object>} children - Sub-items for nested navigation.
 * @property {string} path - The path that the navigation item links to.
 */
export const navigation = [{
  type: "label",
  label: "Creator"
}, {
  name: "Products",
  icon: duotone.Products,
  children: [{
    name: "Manage",
    path: "/dashboard/products"
  }, {
    name: "Create",
    path: "/dashboard/products/create"
  }]
}, {
  name: "Collections",
  icon: duotone.Apps,
  children: [{
    name: "Manage",
    path: "/dashboard/collections"
  }, {
    name: "Create",
    path: "/dashboard/collections/create"
  }]
}, {
  type: "label",
  label: "User"
}, {
  name: "Liked",
  icon: FavoriteIcon,
  path: "/dashboard"
}, {
  name: "Account Settings",
  icon: duotone.AccountSetting,
  path: "/dashboard/account-settings"
}, {
  name: "Logout",
  icon: duotone.Session,
  path: "/logout"
}];
