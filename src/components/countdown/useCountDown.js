"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Initial state for the countdown timer, representing the time left.
 * Each field (days, hours, minutes, seconds) is initialized to 0.
 *
 * @typedef {Object} TimeState
 * @property {number} days - Number of days left.
 * @property {number} hours - Number of hours left.
 * @property {number} minutes - Number of minutes left.
 * @property {number} seconds - Number of seconds left.
 */
const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};
/**
 * Custom hook `useCountDown` that provides a countdown timer.
 * It calculates the time left until a given expiration date and updates the state every second.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {number} params.expireDate - The expiration date in milliseconds.
 * @returns {Object} An object containing the time left in days, hours, minutes, and seconds.
 */
export default function useCountDown({
  expireDate
}) {
  const [timeLeft, setTimeLeft] = useState(initialState);

  /**
   * Calculates the time remaining until the expiration date.
   * 
   * @function calculateTimeLeft
   * @returns {Object} An object with the time left in days, hours, minutes, and seconds. 
   * If the expiration date has passed, returns the initial state with all values as 0.
   */
  const calculateTimeLeft = useCallback(() => {
    const distance = expireDate - new Date().getTime();
    
    // If the expiration date has passed, return the initial state
    if (distance < 0) return initialState;
    
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
      minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
      seconds: Math.floor(distance % (1000 * 60) / 1000)
    };
  }, [expireDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return {
    timeLeft
  };
}
