/* TODO:
Complete the following API functions to fetch user's data and its unmasked phone number.
Each request should be authenticated with a Bearer token of 'WellTheoryCode2023'.
Use the default fetch API.

(Optional) Use JSDoc to document the functions.
*/

import { User as UserResponse, Phone as PhoneResponse } from "@/types";

/**
 * Common fetcher function to make authenticated requests.
 * @param {string} url The URL to fetch.
 * @returns {Promise<T>} The response data.
 */
const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Authorization': 'Bearer WellTheoryCode2023'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! ${errorText}`);
  }

  return await response.json();
};

/**
 * Fetches the user's data.
 * @returns {Promise<UserResponse>} The user's data.
*/
export const me = (): Promise<UserResponse> => {
  return fetcher('https://us-central1-internals-358114.cloudfunctions.net/react-challenge/me');
};

/**
 * Fetches the user's unmasked phone number.
 * @returns {Promise<PhoneResponse>} The user's unmasked phone number.
*/
export const phone = (): Promise<PhoneResponse> => {
  return fetcher('https://us-central1-internals-358114.cloudfunctions.net/react-challenge/phone');
};
