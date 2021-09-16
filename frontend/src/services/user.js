const axios = require("axios").default;

const URL = "http://localhost:1337/users/";
const diceBear = "https://avatars.dicebear.com/api/bottts/";
const pickUpLinesUrl = "http://localhost:1337/pick-up-lines";

const getUserPosts = async (id, token) => {
  const creds = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const res = await axios.get(URL + id, creds);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const fetchProfilePic = async (username) => {
  const picURL = diceBear + username + ".svg";

  try {
    const res = await axios.get(picURL);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const postLine = async (line, JWT) => {
  try {
    const res = await axios.post(pickUpLinesUrl, line, {
      headers: {
        Authorization: "Bearer " + JWT,
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
export default { getUserPosts, fetchProfilePic, postLine };
