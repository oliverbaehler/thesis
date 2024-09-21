import { openSans } from "app/layout";

/**
 * Default font size used throughout the application.
 * 
 * @constant
 * @type {number}
 */
export const fontSize = 14;

/**
 * Typography settings for the application, including base font size, HTML font size, and font family.
 * This object defines the global typography rules that can be used consistently across the application.
 * 
 * @constant
 * @type {Object}
 */
export const typography = {
  fontSize,  // Base font size used across the application
  htmlFontSize: 16,  // Default font size for HTML elements
  fontFamily: openSans.style.fontFamily,  // Font family set to Open Sans, imported from the layout
  body1: {
    fontSize  // Font size for body1 text (e.g., paragraphs)
  },
  body2: {
    fontSize  // Font size for body2 text (e.g., smaller paragraphs or captions)
  }
};
