const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db");

router.get("/", async (req, res) => {
  try {
    const allBreeds = await Temperament.findAll();
    res.status(200).send(allBreeds);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
