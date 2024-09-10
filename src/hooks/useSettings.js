import { useContext } from "react";
import { SettingsContext } from "contexts/SettingContext";

/**
 * Custom hook to access the settings stored in the `SettingsContext`.
 * This hook provides an easy way to access and manage global settings throughout the application.
 *
 * @returns {Object} - The current settings and any associated methods provided by the `SettingsContext`.
 */
const useSettings = () => useContext(SettingsContext);

export default useSettings;
