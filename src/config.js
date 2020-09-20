export const client_id = "ok7ldffjfrdafeme3x5jfob7rxhmlv";
export const redirect_uri = process.env.NODE_ENV === "production" ? "https://kingdutch.github.io/twitch-ban-assist/" : "http://localhost:3000/twitch-ban-assist/";
export const scope = [
  'channel:moderate',
];
