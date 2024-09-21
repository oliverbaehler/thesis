import { useCallback, useState } from "react";

/**
 * Custom hook to manage the visibility state of a password input field.
 * Provides a `togglePasswordVisible` function to switch between showing and hiding the password.
 *
 * @returns {Object} - The current visibility state and a function to toggle the visibility.
 * @returns {boolean} visiblePassword - Boolean indicating if the password is visible.
 * @returns {Function} togglePasswordVisible - Function to toggle the password visibility.
 */
export default function usePasswordVisible() {
  const [visiblePassword, setVisiblePassword] = useState(false); // State to track if the password is visible

  /**
   * Toggles the password visibility state.
   */
  const togglePasswordVisible = useCallback(() => {
    setVisiblePassword(visible => !visible);
  }, []);

  return {
    visiblePassword,        // Boolean indicating whether the password is visible
    togglePasswordVisible   // Function to toggle the visibility state
  };
}
