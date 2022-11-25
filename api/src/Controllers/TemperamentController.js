const { Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getTemperaments = async () => {
  try {
    const apiData = await axios.get(
      `https://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`
    );

    const apiTemperament = apiData.data.map((el) => el.temperament);
    const temperamentsEach = apiTemperament
      .map((t) => (t === undefined ? [] : t.split(", ")))
      .join()
      .split(",")
      .filter((el) => el !== "");

    temperamentsEach.forEach((el) =>
      Temperament.findOrCreate({
        where: { name: el },
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTemperaments,
};
