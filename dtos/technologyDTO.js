function validateTechnology(data) {
    const errors = [];

    if (!data.name || data.name.trim() === "") {
        errors.push("O nome da tecnologia é obrigatório.");
    }

    return errors;
}

function toTechnologyResponse(technology) {
    return {
        id: technology.id,
        name: technology.name,
        description: technology.description,
        created_at: technology.created_at
    };
}

module.exports = {
    validateTechnology,
    toTechnologyResponse
};