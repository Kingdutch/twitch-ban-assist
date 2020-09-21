import React, {useEffect, useMemo, useState} from "react";

// Convert a username into a valid channel name.
function toChannel(str) {
  const channel = (str ? str : "").toLowerCase();
  return channel[0] === "#" ? channel : "#" + channel;
}

function BanForm({ chatClient, channels, user_name }) {
  // Create a lookup table for IRC channel to Twitch channel names.
  const channelLookup = useMemo(() => Object.fromEntries(channels.map(c => [toChannel(c), c])), [channels]);
  // Check form state.
  const [selected, updateSelected] = useState({});
  // Create event listener for join to track mod state.
  useEffect(() => {
    // Show the user we're joining channels.
    let onJoin = (channel, joinedUser) => {
      // Ignore other users.
      if (joinedUser !== user_name) {
        return;
      }
      // Add the channel to our list of possible channels to select.
      updateSelected(selected => ({...selected, [channelLookup[channel]]: false}));
    }
    chatClient.on("join", onJoin);
    return () => {
      chatClient.off("join", onJoin);
    }
  }, [chatClient, updateSelected, user_name, channelLookup]);
  // Keep track of the form fields.
  const [banForm, updateBanForm] = useState({target_user: '', reason: ''});
  // Keep track of the banning in progress.
  const [banState, updateBanState] = useState({});

  // The actual callback to ban the user.
  const banUser = () => {
    const target = banForm.target_user;
    const reason = banForm.reason;
    updateBanForm({target_user: '', reason: ''});
    const channelsToBanIn = Object.fromEntries(Object.entries(selected).filter(([_,v]) => v).map(([k,_]) => [k, `Banning ${target}...`]));
    updateBanState(channelsToBanIn);
    for (const streamer of Object.keys(channelsToBanIn)) {
      const channel = toChannel(streamer);
      chatClient.ban(channel, target, reason)
        .then(() => updateBanState(s => ({...s, [channel]: `Banned ${target}`})))
        .catch((e) => updateBanState(s => ({...s, [channel]: `Error ${e}`})))
    }
  }

  const allSelected = Object.entries(selected).every(([_,v]) => v);
  const channel_list = channels.map(channel => {
    const hasJoined = typeof selected[channel] !== "undefined";
    return (
      <tr key={channel}>
        <td>
          <input
            type={"checkbox"}
            value={channel}
            disabled={!hasJoined}
            checked={selected[channel] ?? false}
            onChange={() => updateSelected(selected => ({ ...selected, [channel]: !selected[channel] }))} />
        </td>
        <td>{channel}</td>
        <td>{hasJoined ? (banState[toChannel(channel)] ?? '') : "Joining channel..."}</td>
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
              onChange={() => updateSelected(selected => Object.fromEntries(Object.entries(selected).map(([k,_]) => [k, !allSelected])))}
            />
          </th>
          <th>Broadcaster</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {channel_list}
        </tbody>
      </table>
      <p>
        <label>
          Username<br/>
          <input
            type={"text"}
            required={true}
            value={banForm.target_user}
            onChange={(e) => {
              const target_user = e.target.value;
              updateBanForm(s => ({...s, target_user }))
            }}
          />
        </label>
      </p>
      <p>
        <label>
          Reason<br/>
          <input
            value={banForm.reason}
            type={"text"}
            onChange={(e) => {
              const reason = e.target.value;
              updateBanForm(s => ({...s, reason }))
            }}
          />
        </label>
      </p>
      <p>
        <button disabled={banForm.target_user.length === 0} onClick={banUser} className={"btn btn-primary"}>Ban</button>
      </p>
    </>
  );
}

export default BanForm;