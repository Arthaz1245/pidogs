const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const getApiInfo = async () => {
  try {
    const apiurl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?apiKey=${API_KEY}`
    );
    const BreedsApiInfo = apiurl.data.map((e) => {
      let weight = e.weight.metric.split("-");
      let height = e.height.metric.split("-");
      let life_span = e.life_span.split("-");
      let min_height = parseInt(height[0]);
      let max_height = parseInt(height[1]);
      let min_weight = parseInt(weight[0]);
      let max_weight = parseInt(weight[1]);
      let min_lifespan = parseInt(life_span[0]);
      let max_lifespan = parseInt(life_span[1]);
      return {
        id: e.id,
        name: e.name,
        min_height: min_height,
        max_height: max_height,
        min_weight: min_weight,
        max_weight: max_weight,
        min_lifespan: min_lifespan,
        max_lifespan: max_lifespan,
        image: e.image.url,
        temperaments: e.temperament
          ? e.temperament.split(", ").map((t) => {
              return {
                name: t,
              };
            })
          : "Not Temperament",
      };
    });
    return BreedsApiInfo;
  } catch (error) {
    console.log(error);
  }
};
const getDbInfo = async () => {
  try {
    const dbInfo = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbInfo;
  } catch (error) {
    console.log("error");
  }
};
const getAllBreeds = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};
const deleteBreed = async (id) => {
  try {
    const deletedBreed = await Dog.findByPk(id);
    await Dog.destroy({
      where: { id: id },
    });
    return deletedBreed;
  } catch (error) {
    console.log(error);
  }
};

const updateBreed = async (id, data) => {
  try {
    await Dog.update(data, {
      where: { id: id },
    });
  } catch (error) {
    console.log("Error in update Breed", error);
  }
};
const postBreed = async (objBreed) => {
  try {
    const {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_lifespan,
      max_lifespan,
      image,
      temperaments,
    } = objBreed;
    const allBreeds = await getAllBreeds();
    const isBreed = allBreeds.find((e) => e.name === name.toLowerCase());
    if (!isBreed) {
      const newBreed = {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        min_lifespan,
        max_lifespan,
        image,
      };
      const breedTemperaments = await Temperament.findAll({
        where: { name: temperaments },
      });
      const breedCreated = await Dog.create(newBreed);

      await breedCreated.addTemperaments(breedTemperaments);
      return await Dog.findByPk(breedCreated.id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
    } else {
      throw new error("There is a breed with that name already");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllBreeds,
  postBreed,
  deleteBreed,
  updateBreed,
};
