/**
 * Object containing layout constants used throughout the application.
 * These constants define various dimensions related to the layout, such as heights for the header,
 * topbar, and navigation elements, as well as container widths and sidebar dimensions.
 * 
 * @constant
 * @type {Object}
 */
export const layoutConstant = {
  topbarHeight: 40,         // Height of the top bar in pixels
  headerHeight: 80,         // Height of the header in pixels
  mobileNavHeight: 64,      // Height of the mobile navigation in pixels
  containerWidth: 1200,     // Maximum container width in pixels
  mobileHeaderHeight: 64,   // Height of the mobile header in pixels
  grocerySidenavWidth: 280  // Width of the grocery sidebar in pixels
};

/**
 * Constant defining the user storage limit.
 * This sets a 5GB limit for user storage, represented in bytes.
 * 
 * @constant
 * @type {number}
 */
const USER_STORAGE_LIMIT = 5 * 1024 * 1024 * 1024; // 5GB in bytes
