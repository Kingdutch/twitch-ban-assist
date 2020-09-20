import React, {useState} from "react";
import {useFollows} from "../api";
import "./Authenticated.css";

function Authenticated({ token, user_id }) {
  const { isLoading, isError, data, error } = useFollows(token, user_id);
  const [selected, updateSelected] = useState({});

  if (isLoading) {
    return <p>Loading follower list.....</p>;
  }

  if (isError) {
    return <p>Error loading follower list: {error.message}</p>;
  }

  const followers = data.data;

  const follower_list = followers.map(follower => {
    return (
      <tr key={follower.to_id}>
        <td>
          <input
            type={"checkbox"}
            value={follower.to_id}
            checked={selected[follower.to_id] ?? false}
            onChange={() => updateSelected(selected => ({ ...selected, [follower.to_id]: typeof selected[follower.to_id] !== "undefined" ? !selected[follower.to_id] : true }))} />
        </td>
        <td>{follower.to_name}</td>
      </tr>
    )
  });

  // The check all checkbox is selected if all followers are in the state
  // (it starts empty) and all checkboxes are selected.
  const allSelected = Object.values(selected).length === followers.length && Object.values(selected).every(v => v);

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
                onChange={() => updateSelected(Object.fromEntries(followers.map(follower => [follower.to_id, !allSelected])))}
              />
            </th>
            <th>Broadcaster</th>
          </tr>
        </thead>
        <tbody>
        {follower_list}
        </tbody>
      </table>
      <p>
        <label>
          Username<br/>
          <input type={"text"} />
        </label>
      </p>
      <p>
        <button className={"btn btn-primary"}>Ban</button>
      </p>
    </>
  );
}

export default Authenticated;