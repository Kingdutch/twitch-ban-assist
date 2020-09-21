import { Client } from 'tmi.js';

let client = null;

/**
 * React hook that provides the chat client.
 *
 * @param token
 *   A valid access token.
 * @param user_name
 *   The name of the user that's using our tool.
 * @param channels
 *   A list of channels that we should join.
 * @param clientStateUpdate
 *   Callback to be called when the client is ready or an error occurs.
 */
export function getChatClient(token, user_name, channels, clientStateUpdate) {
  // Only if we have all the needed data including a channel list can we create
  // a client.
  if (client === null && token !== null && user_name !== null && channels.length !== 0) {
    client = createChatClient(token, user_name, channels);
    client.connect()
      .then(() => {
        clientStateUpdate({ error: null, client })
      })
      .catch((error) => {
        clientStateUpdate({ error, client: null })
      });
  }
}

function createChatClient(token, user_name, channels) {
  return new Client({
    options: { debug: process.env.NODE_ENV === "development" },
    connection: {
      // Don't automatically reconnect as this case state change loops in
      // React.
      reconnect: false,
      secure: true,
    },
    identity: {
      username: user_name,
      password: `oauth:${token}`,
    },
    channels,
    logger: {
      info: () => null,
      warn: console.warn,
      error: console.error,
    }
  });
}