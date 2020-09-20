import React, {useEffect, useState} from "react";

// Convert a username into a valid channel name.
function toChannel(str) {
  const channel = (str ? str : "").toLowerCase();
  return channel[0] === "#" ? channel : "#" + channel;
}

function BanForm({ chatClient, follows, user_name }) {
  // Check form state.
  const [selected, updateSelected] = useState(() => follows.reduce((a, f) => ({...a, [f.to_name]: false }), {}),[follows]);
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
        .catch((e) => updateBanState(s => ({...s, [channel]: `Error ${e.message}`})))
    }
  }

  const allSelected = Object.entries(selected).filter(([k,_]) => isMod[toChannel(k)]).every(([_,v]) => v);
  const mod_channel_list = follows.filter(follower => isMod[toChannel(follower.to_name)]);
  const follower_list = mod_channel_list.map(follower => {
    return (
      <tr key={follower.to_id}>
        <td>
          <input
            type={"checkbox"}
            value={follower.to_name}
            checked={selected[follower.to_name] ?? false}
            onChange={() => updateSelected(selected => ({ ...selected, [follower.to_name]: !selected[follower.to_name] }))} />
        </td>
        <td>{follower.to_name}</td>
        <td>{banState[toChannel(follower.to_name)] ?? ''}</td>
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
              onChange={() => updateSelected(Object.fromEntries(mod_channel_list.map(follower => [follower.to_name, !allSelected])))}
            />
          </th>
          <th>Broadcaster</th>
          <th>Status</th>
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