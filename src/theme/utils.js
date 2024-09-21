/**
 * Generates a set of CSS classes for margin and padding with values ranging from 1 to 10.
 * Each class controls either padding or margin for all sides, or for specific sides (top or bottom).
 * 
 * Example classes generated:
 * - `.p-1`: { padding: "1rem" }
 * - `.mt-2`: { marginTop: "2rem" }
 * - `.pb-5`: { paddingBottom: "5rem" }
 * 
 * @returns {Object} - An object where each key is a class name, and the value is a CSS style object.
 */
export const classes = () => {
  const obj = {};

  for (let i = 1; i < 11; i++) {
    // PADDING CLASSES
    obj[`.p-${i}`] = {
      padding: i + "rem"
    };
    obj[`.pt-${i}`] = {
      paddingTop: i + "rem"
    };
    obj[`.pb-${i}`] = {
      paddingBottom: i + "rem"
    };

    // MARGIN CLASSES
    obj[`.m-${i}`] = {
      margin: i + "rem"
    };
    obj[`.mt-${i}`] = {
      marginTop: i + "rem"
    };
    obj[`.mb-${i}`] = {
      marginBottom: i + "rem"
    };
  }

  return obj;
};
