import React from "react";
import './Anonymous.css'
import {getAuthorizeUrl} from "../auth";

function Anonymous() {
  const authLink = getAuthorizeUrl();

  return (
    <main className={"Anonymous"}>
      <p>You must authenticate with Twitch to use this tool.</p>
      <p>
        The tool will request the following permissions:
        <ul>
          {/*<li>Access to your follow list <br/> <span className={"i"}>required to let you select the channels you're a moderator in.</span></li>*/}
          <li>Read and Write chat messages <br /> <span className={"i"}>required to be able to issue commands such as ban to Twitch.</span></li>
          <li>Perform moderation tasks on your behalf <br /> <span className={"i"}>required to automatically ban users in the channel you're a moderator in.</span></li>
        </ul>
      </p>
      <p className={"center"}>
        <a href={authLink} className={"btn btn-primary"}>Authenticate</a>
      </p>

    </main>
  );
}

export default Anonymous;