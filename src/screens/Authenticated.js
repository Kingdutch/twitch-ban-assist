import React, {useEffect, useRef, useState} from "react";
import {useMods} from "../api";
import "./Authenticated.css";
import BanForm from "../components/BanForm";
import {getChatClient} from "../chat";

function Authenticated({ token, user_name }) {
  const { isLoading, isError, data: mod_channels, error } = useMods(user_name);
  const [{ error: chatError, client }, updateChatState] = useState({ error: null, client: null });
  const clientCleanup = useRef(null);
  clientCleanup.current = client;
  useEffect(() => {
    return () => {
      if (clientCleanup.current !== null) {
        clientCleanup.current.disconnect();
        clientCleanup.current = null;
      }
    }
  }, [clientCleanup]);

  if (isLoading) {
    return <p>Loading follower list.....</p>;
  }

  if (isError) {
    return <p>Error loading follower list: {error.message}</p>;
  }

  // This is slightly hacky but only triggers a state update the first time.
  getChatClient(token, user_name, mod_channels, updateChatState);

  const loggedInAs = <p>Logged in as: {user_name}</p>;

  if (chatError === null && client === null) {
    return (
      <>
        {loggedInAs}
        <p>Connecting to chatserver....</p>
      </>
    );
  }

  if (chatError !== null) {
    return (
      <>
        {loggedInAs}
        <p>Error connecting to chatserver: {chatError.message}</p>
      </>
    );
  }

  return (
    <>
      {loggedInAs}
      <BanForm chatClient={client} channels={mod_channels} user_name={user_name} />
    </>
  );
}

export default Authenticated;