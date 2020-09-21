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
 * Loads the channels a user is a moderator in using React query.
 *
 * @param {string} user_name
 *   The name of the user to fetch follows for. Injected into the results.
 * @return {QueryResult<unknown, unknown>}
 */
export function useMods(user_name) {
  let { isLoading, isError, data, error } = useQuery([user_name, 'user_follows'], getMods, { staleTime: 12 * 60 * 60 * 1000 /* 12 hours in ms */});
  // If we've done the loading, inject the user themselves as a channel so that
  // they show up everywhere. Broadcasters are not marked as mods by default.
  if (!isLoading && !isError) {
    data = [...data, user_name];
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

/**
 * Fetches the channels a user is a moderator of from ModLookup.
 * @param user_name
 *   The user to find moderator channels for.
 * @return {Promise<*|*[]>}
 *   A promise that resolves to a list of channels the user is a moderator for.
 */
async function getMods(user_name) {
  const result = await fetch(`https://modlookup.3v.fi/api/user-v3/${user_name}?limit=10000`);

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  const data = await result.json();
  return (data.channels || []).map(c => c.name);
}
