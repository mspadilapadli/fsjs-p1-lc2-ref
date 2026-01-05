const pool = require("./connection");

const dropTable = `drop table if exists "Tags","Shirts"`;

const qTags = `create table if not exists "Tags"(
"id" SERIAL PRIMARY KEY,
"name" VARCHAR NOT NULL
)`;

const qShirts = `create table if not exists "Shirts"(
"id" SERIAL PRIMARY KEY,
"name" VARCHAR NOT NULL,
"type" VARCHAR NOT NULL, 
"size" VARCHAR NOT NULL, 
"stock" INT NOT NULL, 
"TagId" INT REFERENCES "Tags"("id")
)`;

const migration = async () => {
    try {
        const dropTables = await pool.query(dropTable);
        if (dropTables) console.log("all tables are dropped");
        const tableTags = await pool.query(qTags);
        if (tableTags) console.log("table tags is created");
        const tableShirts = await pool.query(qShirts);
        if (tableShirts) console.log("table shirts is created");
    } catch (error) {
        console.log(error);
    }
};

migration();
