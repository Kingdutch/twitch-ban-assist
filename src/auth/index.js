import { useQuery } from 'react-query';
import { client_id, redirect_uri, scope } from '../config';

/**
 * React hook to get the auth state for a user.
 *
 * @return {{isLoading: boolean, isError: boolean, data: {user_id: string, token: string}, error: unknown}}
 */
export function useAuthState() {
  const { isLoading: isLoadingToken, isError: isErrorToken, data: token, error: errorToken } = useAccessToken();
  const { isLoading: isLoadingId, isError: isErrorId, data: user_id, error: errorId } = useUserId(token);
  return {
    isLoading: isLoadingToken || isLoadingId,
    isError: isErrorToken || isErrorId,
    data: { token, user_id },
    error: errorToken || errorId,
  };
}

/**
 * React hook to get the access token using react-query.
 */
export function useAccessToken() {
  return useQuery('access_token', getAccessToken);
}

/**
 * React hook to get the user id for a given access token.
 */
export function useUserId(token) {
  return useQuery([token, false, 'user_id'], validateToken, { enabled: token });
}

/**
 * Data loader for an access token.
 *
 * @return {Promise<null|string>}
 */
export async function getAccessToken() {
  // try to fetch a token from storage.
  let token = localStorage.getItem('token');

  // If there is no stored token, check if we just came back from authorization.
  if (token === null) {
    token = getAccessTokenFromUrl();

    // If we don't have a stored token and this was not an auth request then
    // we don't have a token.
    if (token === null) {
      return null;
    }

    // In case a token was found in the URL we must store it.
    localStorage.setItem('token', token);
  }

  // If a token is not valid then we remove it from storage and we're done.
  const user_id = await validateToken(token);
  if (user_id === null) {
    localStorage.removeItem('token');
    return null;
  }

  return token;
}

/**
 * Returns a URL used to authorize the application for the user.
 *
 * @return {string}
 */
export function getAuthorizeUrl() {
  return `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=token&scope=${scope.join(' ')}`;
}

/**
 * Validates an access token with Twitch.
 *
 * @param token
 *   The token to validate.
 * @param {boolean} force
 *   Allows re-validation to be forced.
 * @return {Promise<string|null>}
 *   The promise resolves to true when the token is valid or false when the
 *   token is invalid.
 */
async function validateToken(token, force = false) {
  // A token must be validated at least once per hour. For new tokens we must
  // also perform initial validation to fetch the user id of the authenticated
  // user.
  const validation_time = parseInt(localStorage.getItem('validation_time') ?? 0, 10);
  const user_id = localStorage.getItem('user_id');

  // If we have recently validated and we have a user_id then we're done.
  if (!force && validation_time > (Date.now() - (60 * 60 * 1000)) && user_id !== null) {
    return user_id;
  }

  const response = await fetch("https://id.twitch.tv/oauth2/validate", {
    headers: {
      Authorization: `OAuth ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  try {
    const data = await response.json();
    let user_id = typeof data["user_id"] !== "undefined" ? data["user_id"] : null;

    localStorage.setItem('user_id', user_id);
    localStorage.setItem('validation_time', Date.now().toString());
    return user_id;
  }
  // In case of invalid JSON we return null.
  catch (e) {
    return null;
  }
}

/**
 * Finds an access token in the URL if there is one.
 *
 * Used to check if the current page is being loaded in response to an
 * authentication request.
 *
 * @return {string|null}
 *   The access token from the URL or null if none was found.
 */
function getAccessTokenFromUrl() {
  const hash = document.location.hash;
  // The hash includes the # so we need at least something beyond that.
  if (hash.length <= 1) {
    return null;
  }

  const data = parseQuery(hash.substr(1));

  if (typeof data['access_token'] === "undefined" || typeof data['token_type'] === "undefined" || data["token_type"] !== "bearer") {
    return null;
  }

  return data["access_token"];
}

/**
 * Parses a query string and returns its components as objects.
 *
 * @param queryString
 *   The query string to parse.
 * @return {{}}
 *   An object containing the found parts.
 */
function parseQuery(queryString) {
  let query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

  for (let i = 0, j = pairs.length; i < j; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  return query;
}