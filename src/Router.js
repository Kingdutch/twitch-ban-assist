import React from 'react';
import {useAuthState} from "./auth";
import Anonymous from "./screens/Anonymous";
import Authenticated from "./screens/Authenticated";

function Router() {
  const { isLoading, isError, data: { user, token }, error } = useAuthState();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Unexpected error while authenticating: {error.message}</p>;
  }

  if (user === null) {
    return <Anonymous />;
  }

  return (
    <main className={"Authenticated"}>
      <Authenticated user_id={user.user_id} user_name={user.user_name} token={token} />
    </main>
  );
}

export default Router;
