const { Router } = require("express");
const { TimeoutError } = require("sequelize");
const router = Router();

const {
  getAllBreeds,
  postBreed,
  deleteBreed,
  updateBreed,
} = require("../Controllers/DogController");
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedBreed = await updateBreed(id, data);
    console.log(updatedBreed);
    res.status(200).json(updatedBreed);
  } catch (error) {
    res.status(404).json("Error to update the breed", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBreed = await deleteBreed(id);
    res.status(200).json(deletedBreed);
  } catch (error) {
    res.status(404).json("Error to delete breed", error);
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
