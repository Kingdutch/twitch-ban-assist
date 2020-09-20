import React, {useEffect, useState} from "react";

// Convert a username into a valid channel name.
function toChannel(str) {
  const channel = (str ? str : "").toLowerCase();
  return channel[0] === "#" ? channel : "#" + channel;
}

function BanForm({ chatClient, follows, user_name }) {
  // Check form state.
  const [selected, updateSelected] = useState(() => follows.reduce((a, f) => ({...a, [f.to_id]: false })),[follows]);
  // Check mod state.
  const [isMod, updateMod] = useState( () => ({length: 0}));
  // Create event listener for join to track mod state.
  useEffect(() => {
    // Show the user we're joining channels.
    let onJoin = (channel, joinedUser) => {
      // Ignore other users.
      if (joinedUser !== user_name) {
        return;
      }
      // Broadcasters aren't considered moderators but they have the right
      // powers.
      let weAreMod = chatClient.isMod(channel, user_name) || channel === toChannel(user_name);
      updateMod(modStatus => ({...modStatus, length: modStatus.length + 1, [channel]: weAreMod}));
    }
    chatClient.on("join", onJoin);
    return () => {
      chatClient.off("join", onJoin);
    }
  }, [chatClient, updateMod, user_name]);

  const allSelected = Object.values(selected).every(v => v);
  const follower_list = follows.filter(follower => isMod[toChannel(follower.to_name)]).map(follower => {
    return (
      <tr key={follower.to_id}>
        <td>
          <input
            type={"checkbox"}
            value={follower.to_id}
            checked={selected[follower.to_id] ?? false}
            onChange={() => updateSelected(selected => ({ ...selected, [follower.to_id]:!selected[follower.to_id] }))} />
        </td>
        <td>{follower.to_name}</td>
      </tr>
    )
  });

  return (
    <>
      <table className={"table-select"}>
        <caption>Select streams to apply ban to</caption>
        <thead>
        <tr>
          <th>
            <input
              type={"checkbox"}
              checked={allSelected}
              onChange={() => updateSelected(Object.fromEntries(follows.map(follower => [follower.to_id, !allSelected])))}
            />
          </th>
          <th>Broadcaster</th>
        </tr>
        </thead>
        <tbody>
        {isMod.length < follows.length
          ? <tr><td colSpan={2}>Finding moderator channels, checked {isMod.length}/{follows.length}</td></tr>
          : follower_list}
        </tbody>
      </table>
      <p>
        <label>
          Username<br/>
          <input type={"text"} />
        </label>
      </p>
      <p>
        <label>
          Reason<br/>
          <input type={"text"} />
        </label>
      </p>
      <p>
        <button className={"btn btn-primary"}>Ban</button>
      </p>
    </>
  );
}

export default BanForm;