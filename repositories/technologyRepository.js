const pool = require("../config/database");

async function createTechnology(technology) {
    const { name, description } = technology;

    const result = await pool.query(
        `
        INSERT INTO technologies
        (name, description)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [name, description]
    );

    return result.rows[0];
}

async function findAllTechnologies() {
    const result = await pool.query(
        `
        SELECT *
        FROM technologies
        ORDER BY id;
        `
    );

    return result.rows;
}

module.exports = {
    createTechnology,
    findAllTechnologies
};