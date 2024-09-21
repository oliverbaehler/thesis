import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook to detect when the user has scrolled past a certain point and fix the header or any element
 * at the top of the viewport. The hook monitors the vertical scroll position and compares it with the 
 * height of a referenced element.
 *
 * @param {Object} ref - A React reference to the element being monitored for scroll position.
 * @returns {Object} - An object containing `isFixedHeader`, a boolean indicating if the header should be fixed.
 */
export default function useScroller(ref) {
  const [isFixedHeader, setIsFixedHeader] = useState(false); // State to track whether the header is fixed

  /**
   * Function to check the scroll position and determine whether the header should be fixed.
   */
  const scroller = useCallback(() => {
    let postionHeight = 0;

    // Get the offset of the referenced element
    if (ref.current) {
      postionHeight = ref.current.offsetTop + ref.current.offsetHeight;
    }

    // Fix the header if the scroll position exceeds the element's position
    if (postionHeight && window.pageYOffset > postionHeight) {
      setIsFixedHeader(true);
      return;
    }

    // Unfix the header if the scroll position is above the element
    setIsFixedHeader(false);
  }, [ref]);

  useEffect(() => {
    // Add scroll event listener when the component mounts
    if (!window) return;
    window.addEventListener("scroll", scroller);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", scroller);
  }, [scroller]);

  return {
    isFixedHeader // Boolean indicating if the header is fixed
  };
}
