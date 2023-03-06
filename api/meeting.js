// const API_BASE_URL = "https://api.videosdk.live";
// const VIDEOSDK_TOKEN = process.env.NEXT_PUBLIC_VIDEOSDK_TOKEN;
// const API_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const getToken = async () => {
  const res = await fetch(`http://localhost:9000/get-token`, {
    method: "GET",
  });
  const { token } = await res.json();
  return token;
};

export const createMeeting = async ({ token }) => {
  const url = `https://api.videosdk.live/v2/rooms`;

  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const res = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  const { roomId } = res;

  return roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `https://api.videosdk.live/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result ? result.roomId === roomId : false;
};
