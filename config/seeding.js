const pool = require("./connection");

const valTags = require("../data/tags.json")
    .map(({ name }) => `('${name}')`)
    .join(", \n");
const valShirts = require("../data/shirts.json")
    .map(
        ({ name, type, size, stock, tagId }) =>
            `('${name}','${type}','${size}','${stock}','${tagId}')`
    )
    .join(", \n");

const qSeedTags = `insert into "Tags" ("name") values ${valTags}`;
const qSeedShirts = `insert into "Shirts" 
("name","type","size", "stock","TagId")
 values ${valShirts}`;

const seeding = async () => {
    try {
        const seedTags = await pool.query(qSeedTags);
        if (seedTags) console.log("seeding Tags successfully");
        const seedShirts = await pool.query(qSeedShirts);
        if (seedShirts) console.log("seeding Shirts successfully");
    } catch (error) {
        console.log(error);
    }
};

seeding();
