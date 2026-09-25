const express = require("express");

const {
    createTechnology,
    getAllTechnologies,
    addTechnologyToProject
} = require("../controllers/technologyController");

const router = express.Router();

router.post("/", createTechnology);
router.get("/", getAllTechnologies);

// Associar tecnologia a um projeto
router.post("/project", addTechnologyToProject);

module.exports = router;