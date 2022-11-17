const { Router } = require("express");
const router = Router();
//const { Pokemon, Type } = require("../db");
const { getAllBreeds, postBreed } = require("../Controllers/DogController");
router.get("/", async (req, res) => {
  const { name } = req.query;
  let allBreed = await getAllBreeds();
  if (name) {
    let breedName = allBreed.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    breedName
      ? res.status(200).send(breedName)
      : res.status(404).send("Breed not found");
  } else {
    res.status(200).send(allBreed);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let allBreed = await getAllBreeds();
  try {
    if (id) {
      let breedId = allBreed.find(
        (b) => b.id === Number(id) || b.id === String(id)
      );
      breedId
        ? res.status(200).send(breedId)
        : res.status(404).send("Breed not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const bodyInfo = req.body;

    const BreedCreated = await postBreed(bodyInfo);
    console.log(BreedCreated);
    res.status(201).json("Created successfully");
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
