import {useQuery} from "react-query";
import {client_id} from "../config";

/**
 * Loads the channels a user follows using React query.
 *
 * @param {string} access_token
 *   A valid access token.
 * @param {int} user_id
 *   The user to fetch follows for.
 * @return {QueryResult<unknown, unknown>}
 */
export function useFollows(access_token, user_id) {
  return useQuery(['helix/users/follows', access_token, { from_id: user_id }], twitchApi);
}

/**
 * Request function for Twitch API that can be used by React Query.
 *
 * @param endpoint
 * @param access_token
 * @param query
 * @return {Promise<any>}
 */
async function twitchApi(endpoint, access_token = null, query = {}) {
  let url = new URL(endpoint, "https://api.twitch.tv/");
  url.search = (new URLSearchParams(query)).toString();
  let headers = {
    "Client-Id": client_id,
  };

  if (access_token !== null) {
    headers["Authorization"] = `Bearer ${access_token}`;
  }

  const result = await fetch(url.toString(), { headers });

  const data = await result.json();

  if (typeof data.status !== "undefined" && (data.status < 200 || data.status > 300)) {
    throw data;
  }

  return data;
}

/**
 * Returns the channels a user follows.
 *
 * @param {string} user_id
 *   The user ID of the user to get a list of follows for.
 */
export function getFollows(user_id) {
  // GET https://api.twitch.tv/helix/users/follows?from_id=<user ID>
}

