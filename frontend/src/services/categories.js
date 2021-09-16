const axios = require("axios").default;

const categoriesURL = "http://localhost:1337/categories?categoryName=";

const fetchCategoriesID = async (category) => {
  const res = await axios.get(categoriesURL + category);
  return res.data[0]._id;
};

const postCategoy = async (category, JWT) => {
  try {
    const res = await axios.post(categoriesURL, category, {
      headers: {
        Authorization: "Bearer " + JWT,
      },
    });
    return res.data.id;
  } catch (e) {
    if (e.response.status === 500) {
      const fetchedID = fetchCategoriesID(category.categoryName);
      return fetchedID;
    } else {
      console.log(e);
    }
  }
};

export default { fetchCategoriesID, postCategoy };
