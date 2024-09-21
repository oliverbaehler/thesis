import { useState } from "react";

/**
 * Custom hook `useHeader` that manages the state for dialog, sidenav, and search bar visibility.
 * It provides functions to toggle each of these states.
 *
 * @returns {Object} An object containing the following states and toggle functions:
 * - `dialogOpen` {boolean}: State to determine if the dialog is open.
 * - `sidenavOpen` {boolean}: State to determine if the sidenav is open.
 * - `searchBarOpen` {boolean}: State to determine if the search bar is open.
 * - `toggleDialog` {Function}: Function to toggle the `dialogOpen` state.
 * - `toggleSidenav` {Function}: Function to toggle the `sidenavOpen` state.
 * - `toggleSearchBar` {Function}: Function to toggle the `searchBarOpen` state.
 */
export default function useHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  /**
   * Toggles the `dialogOpen` state.
   */
  const toggleDialog = () => setDialogOpen(state => !state);

  /**
   * Toggles the `sidenavOpen` state.
   */
  const toggleSidenav = () => setSidenavOpen(state => !state);

  /**
   * Toggles the `searchBarOpen` state.
   */
  const toggleSearchBar = () => setSearchBarOpen(state => !state);

  return {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSidenav,
    toggleSearchBar
  };
}
