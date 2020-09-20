import React, {useEffect, useRef, useState} from "react";
import {useFollows} from "../api";
import "./Authenticated.css";
import BanForm from "../components/BanForm";
import {getChatClient} from "../chat";

function Authenticated({ token, user_id, user_name }) {
  const { isLoading, isError, data, error } = useFollows(token, user_id, user_name);
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
  getChatClient(token, user_name, data.data.map(f => f.to_name), updateChatState);

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
      <BanForm chatClient={client} follows={data.data} user_name={user_name} />
    </>
  );
}

export default Authenticated;