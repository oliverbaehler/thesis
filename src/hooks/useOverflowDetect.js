import { useRef, useState, useEffect } from "react";

/**
 * Custom hook to detect if an element overflows horizontally to the left or right side of the viewport.
 * This hook is useful for responsive layouts or detecting when content is outside the visible area.
 *
 * @returns {Object} - The reference to the element, overflow state, and the function to check for overflow.
 * @returns {Object} elementRef - A ref to attach to the DOM element you want to monitor.
 * @returns {boolean} isLeftOverflowing - Boolean indicating if the element is overflowing to the left.
 * @returns {boolean} isRightOverflowing - Boolean indicating if the element is overflowing to the right.
 * @returns {Function} checkOverflow - Function to manually trigger the overflow check.
 */
export default function useOverflowDetect() {
  const elementRef = useRef(null); // Reference to the element being monitored
  const [isLeftOverflowing, setLeftIsOverflowing] = useState(false); // State to track if the element is overflowing to the left
  const [isRightOverflowing, setRightIsOverflowing] = useState(false); // State to track if the element is overflowing to the right

  /**
   * Checks if the element is overflowing either to the left or right side of the viewport.
   */
  function checkOverflow() {
    const element = elementRef.current;

    if (element) {
      const elementRect = element.getBoundingClientRect(); // Get the element's position and size
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth; // Get the viewport width

      // Check for left overflow
      if (elementRect.left < 0) setLeftIsOverflowing(true);
      else setLeftIsOverflowing(false);

      // Check for right overflow
      if (elementRect.right > viewportWidth) setRightIsOverflowing(true);
      else setRightIsOverflowing(false);
    }
  }

  useEffect(() => {
    // Add resize event listener to check for overflow on window resize
    window.addEventListener("resize", checkOverflow);
    checkOverflow(); // Run initial overflow check when the component is mounted

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  return {
    elementRef,           // Ref to attach to the DOM element
    isRightOverflowing,    // Boolean: true if the element is overflowing to the right
    isLeftOverflowing,     // Boolean: true if the element is overflowing to the left
    checkOverflow          // Function to manually check for overflow
  };
}
