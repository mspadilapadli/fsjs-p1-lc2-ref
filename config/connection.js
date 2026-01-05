const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "admin65",
    host: "localhost",
    database: "p1w3-lc2-ref",
    port: 5432,
    idleTimeoutMillis: 500,
});

// tessting connection
// (async () => {
//     try {
//         const result = await pool.query("SELECT $1::text as name", [
//             "connection successfully",
//         ]);
//         console.log(result.rows[0].name); // brianc
//     } catch (error) {
//         console.log(error);
//     }
// })();

module.exports = pool;
