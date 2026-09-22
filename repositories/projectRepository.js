const pool = require("../config/database");

async function createProject(project) {
    const {
        title,
        description,
        project_url,
        repository_url,
        profile_id
    } = project;

    const result = await pool.query(
        `
        INSERT INTO projects
        (title, description, project_url, repository_url, profile_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [
            title,
            description,
            project_url,
            repository_url,
            profile_id
        ]
    );

    return result.rows[0];
}

async function findAllProjects() {
    const result = await pool.query(
        `
        SELECT *
        FROM projects
        ORDER BY id;
        `
    );

    return result.rows;
}

module.exports = {
    createProject,
    findAllProjects
};