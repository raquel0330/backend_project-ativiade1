const feedbackRepository = require("../repositories/feedbackRepository");

async function createFeedback(projectId, feedback) {
    const { rating, comment } = feedback;

    // Verifica se o projeto existe
    const project = await feedbackRepository.findProjectById(projectId);

    if (!project) {
        const error = new Error("Projeto não encontrado.");
        error.status = 404;
        throw error;
    }

    // Cadastra o feedback
    const savedFeedback = await feedbackRepository.createFeedback({
        rating,
        comment,
        project_id: projectId
    });

    // Calcula a nova média
    const averageRating =
        await feedbackRepository.calculateAverageRating(projectId);

    // Atualiza a média do projeto
    const updatedProject =
        await feedbackRepository.updateProjectAverageRating(
            projectId,
            averageRating
        );

    return {
        feedback: savedFeedback,
        project: updatedProject
    };
}

module.exports = {
    createFeedback
};