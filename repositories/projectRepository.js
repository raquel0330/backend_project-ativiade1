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

async function findAllProjects(options = {}) {
    const {
        technology,
        page = 1,
        limit = 10
    } = options;

    const offset = (page - 1) * limit;

    let query = `
        SELECT DISTINCT p.*
        FROM projects p
    `;

    const values = [];

    if (technology) {
        query += `
            INNER JOIN project_technologies pt
                ON pt.project_id = p.id
            INNER JOIN technologies t
                ON t.id = pt.technology_id
        `;
    }

    query += `
        WHERE 1 = 1
    `;

    if (technology) {
        values.push(technology);

        query += `
            AND LOWER(t.name) = LOWER($${values.length})
        `;
    }

    values.push(limit);
    const limitPosition = values.length;

    values.push(offset);
    const offsetPosition = values.length;

    query += `
        ORDER BY p.id
        LIMIT $${limitPosition}
        OFFSET $${offsetPosition};
    `;

    const result = await pool.query(query, values);

    return result.rows;
}

async function incrementUpvotes(projectId) {
    const result = await pool.query(
        `
        UPDATE projects
        SET upvotes = upvotes + 1
        WHERE id = $1
        RETURNING *;
        `,
        [projectId]
    );

    return result.rows[0];
}

module.exports = {
    createProject,
    findAllProjects,
    incrementUpvotes
};