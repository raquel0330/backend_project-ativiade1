const projectRepository = require("../repositories/projectRepository");
const {
    validateProject,
    toProjectResponse
} = require("../dtos/projectDTO");

async function createProject(req, res) {
    try {
        const errors = validateProject(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        const project =
            await projectRepository.createProject(req.body);

        return res.status(201).json(
            toProjectResponse(project)
        );

    } catch (error) {
        console.error("Erro ao criar projeto:", error);

        return res.status(500).json({
            error: "Erro interno ao criar projeto."
        });
    }
}

async function getAllProjects(req, res) {
    try {
        const projects =
            await projectRepository.findAllProjects();

        return res.status(200).json(
            projects.map(toProjectResponse)
        );

    } catch (error) {
        console.error("Erro ao buscar projetos:", error);

        return res.status(500).json({
            error: "Erro interno ao buscar projetos."
        });
    }
}

module.exports = {
    createProject,
    getAllProjects
};