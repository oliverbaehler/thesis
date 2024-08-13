import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";
export default function useProduct(slug) {
  const {
    enqueueSnackbar
  } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = useCallback(() => setIsFavorite(fav => !fav), []);
  const toggleDialog = useCallback(() => setOpenModal(open => !open), []);

  return {
    openModal,
    isFavorite,
    toggleDialog,
    toggleFavorite
  };
}