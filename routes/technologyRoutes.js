const express = require("express");

const {
    createTechnology,
    getAllTechnologies
} = require("../controllers/technologyController");

const router = express.Router();

router.post("/", createTechnology);
router.get("/", getAllTechnologies);

module.exports = router;