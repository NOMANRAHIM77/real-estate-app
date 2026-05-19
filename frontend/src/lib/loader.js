import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const postPromise = apiRequest("/posts/" + params.id);
  return defer({
    postResponse: postPromise,
  });
};

export const listPageLoader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.toString();

  try {
    const postResponse = apiRequest(
      "/posts" + (query ? `?${query}` : "")
    );

    return defer({
      postResponse,
    });
  } catch (err) {
    console.log("LIST LOADER ERROR:", err);

    return defer({
      postResponse: Promise.resolve({ data: [] }),
    });
  }
};

export const profileLoader = async () => {
  try {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  } catch (err) {
    console.log(err);
  }
};