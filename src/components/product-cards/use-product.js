import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";

/**
 * Custom hook `useProduct` that manages the state and behavior of a product, such as favoriting the product 
 * and handling a modal dialog. It also provides notifications using `notistack`.
 *
 * @param {string} slug - The product slug.
 * @returns {Object} The current modal state, favorite state, and toggle functions for both.
 */
export default function useProduct(slug) {
  const { enqueueSnackbar } = useSnackbar(); // Notistack hook for showing notifications
  const [openModal, setOpenModal] = useState(false); // State to track if modal is open
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the product is favorited

  /**
   * Toggles the favorite state of the product.
   */
  const toggleFavorite = useCallback(() => setIsFavorite(fav => !fav), []);

  /**
   * Toggles the modal dialog state.
   */
  const toggleDialog = useCallback(() => setOpenModal(open => !open), []);

  return {
    openModal,
    isFavorite,
    toggleDialog,
    toggleFavorite
  };
}
