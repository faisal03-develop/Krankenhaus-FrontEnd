/**
 * Sets a value in localStorage.
 *
 * @param {string} key - The key for the localStorage item.
 * @param {string} value - The value to be stored in localStorage.
 */
export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Sets a value in sessionStorage.
 *
 * @param {string} key - The key for the sessionStorage item.
 * @param {string} value - The value to be stored in sessionStorage.
 */
export const setSessionStorageItem = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to sessionStorage:", error);
  }
};

/**
 * Gets a value from localStorage.
 *
 * @param {string} key - The key for the localStorage item.
 * @returns {string | null} The value retrieved from localStorage or null if an error occurs.
 */
export const getLocalStorageItem = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return null;
  }
};

/**
 * Gets a value from sessionStorage.
 *
 * @param {string} key - The key for the sessionStorage item.
 * @returns {string | null} The value retrieved from sessionStorage or null if an error occurs.
 */
export const getSessionStorageItem = (key) => {
  try {
    const data = JSON.parse(sessionStorage.getItem(key));
    return data;
  } catch (error) {
    console.error("Error retrieving from sessionStorage:", error);
    return null;
  }
};

/**
 * Removes a value from localStorage.
 *
 * @param {string} key - The key for the localStorage item to be removed.
 */
export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

/**
 * Removes a value from sessionStorage.
 *
 * @param {string} key - The key for the sessionStorage item to be removed.
 */
export const removeSessionStorageItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from sessionStorage:", error);
  }
};
