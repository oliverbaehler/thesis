import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";

/**
 * Custom hook to manage product interactions such as toggling favorite status and opening a modal dialog.
 * Also integrates with the `notistack` library to display notifications.
 *
 * @param {string} slug - The slug or identifier for the product.
 * @returns {Object} - Contains the modal state, favorite state, and functions to toggle these states.
 * @returns {boolean} openModal - Boolean indicating if the modal is open or closed.
 * @returns {boolean} isFavorite - Boolean indicating if the product is marked as favorite.
 * @returns {Function} toggleDialog - Function to toggle the modal's visibility.
 * @returns {Function} toggleFavorite - Function to toggle the favorite status of the product.
 */
export default function useProduct(slug) {
  const { enqueueSnackbar } = useSnackbar(); // Notification function from notistack
  const [openModal, setOpenModal] = useState(false); // State to track if the modal is open
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the product is favorited

  /**
   * Toggles the favorite status of the product.
   */
  const toggleFavorite = useCallback(() => setIsFavorite(fav => !fav), []);

  /**
   * Toggles the visibility of the modal dialog.
   */
  const toggleDialog = useCallback(() => setOpenModal(open => !open), []);

  return {
    openModal,         // Whether the modal is open or not
    isFavorite,        // Whether the product is marked as favorite
    toggleDialog,      // Function to toggle modal visibility
    toggleFavorite     // Function to toggle favorite status
  };
}
