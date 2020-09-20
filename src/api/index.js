import {useQuery} from "react-query";
import {client_id} from "../config";

/**
 * Retrieves the username for the user.
 *
 * @param {string} access_token
 *   A valid access token.
 * @param {int} user_id
 *   The user to fetch follows for.
 * @return {QueryResult<unknown, unknown>}
 */
export function useUsername(access_token, user_id) {
  return useQuery(['helix/users/follows', access_token, { from_id: user_id }], twitchApi, { staleTime: 0 });
}

/**
 * Loads the channels a user follows using React query.
 *
 * @param {string} access_token
 *   A valid access token.
 * @param {int} user_id
 *   The user to fetch follows for.
 * @param {string} user_name
 *   The name of the user to fetch follows for. Injected into the results.
 * @return {QueryResult<unknown, unknown>}
 */
export function useFollows(access_token, user_id, user_name) {
  let { isLoading, isError, data, error } = useQuery(['helix/users/follows', access_token, { from_id: user_id }], twitchApi, { staleTime: 10 * 60 * 1000 /* ms */});
  // If we've done the loading, inject the user themselves as a follow so that
  // they show up everywhere.
  if (!isLoading && !isError) {
    data = {
      ...data,
      data: [...data.data, { followed_at: "2020-01-01T00:00:01Z", from_id: user_id, from_name: user_name, to_id: user_id, to_name: user_name }],
    }
  }

  return { isLoading, isError, data, error };
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


