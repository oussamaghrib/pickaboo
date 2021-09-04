const axios = require("axios").default;

const URL = "http://localhost:1337/auth/local/register";

const signup = async (creds) => {
  const res = await axios.post(URL, creds);
  return res.data;
};

export default { signup };
