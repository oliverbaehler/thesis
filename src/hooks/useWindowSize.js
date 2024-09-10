"use client";

import { useEffect, useState } from "react";
import debounce from "@mui/material/utils/debounce";

/**
 * Custom hook that returns the current window width and updates the width on window resize events.
 * The hook uses a debounced listener to optimize performance by limiting how often the resize handler is called.
 *
 * @returns {number} - The current width of the window.
 */
export default function useWindowSize() {
  const [width, setWidth] = useState(0); // State to store the window width

  /**
   * Debounced event listener to update the width state based on the window's current width.
   * Debouncing ensures the listener is not called excessively during resizing.
   */
  const windowListener = debounce(() => {
    setWidth(window.innerWidth);
  }, 50);

  useEffect(() => {
    // Ensure the window object exists and set initial width
    if (!window) return;
    setWidth(window.innerWidth);

    // Add the resize event listener to track window size changes
    window.addEventListener("resize", windowListener);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", windowListener);
    };
  }, [windowListener]);

  return width; // Return the current window width
}
