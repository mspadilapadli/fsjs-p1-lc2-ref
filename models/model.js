const { Factory, Shirt } = require("./class");
const pool = require("../config/connection");

class Model {
    static async getTags() {
        try {
            let query = `select * from "Tags"`;
            const { rows } = await pool.query(query);
            return Factory.instanceTags(rows);
        } catch (error) {
            throw error;
        }
    }
    static async getShirts(q) {
        try {
            let query = `SELECT s.*, t."name" AS "tagName"
FROM "Shirts" s JOIN	"Tags" t 
ON	s."TagId"  = t."id" `;
            if (q) query += `where s."name" ilike '%${q}%'`;
            query += `order by s."name" asc`;

            const { rows } = await pool.query(query);
            return Factory.instanceShirts(rows);
        } catch (error) {
            throw error;
        }
    }
    static async getShirtById(idShirt) {
        try {
            const query = `select * from "Shirts" where "id" = ${idShirt}`;
            const { rows } = await pool.query(query);
            const { id, name, type, size, stock, TagId } = rows[0];
            const instance = new Shirt(id, name, type, size, stock, TagId, "");
            return instance;
        } catch (error) {
            throw error;
        }
    }

    static async submitAdd(payload) {
        try {
            const { name, type, size, stock, TagId } = payload;

            const validation = this.validate(payload);
            if (Object.keys(validation).length > 0)
                throw {
                    name: "Validation Error",
                    valErr: validation,
                };

            const query = `insert into "Shirts"
         ("name", "type", "size", "stock", "TagId")
         values ('${name}','${type}','${size}','${stock}','${TagId}')
         `;
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    }

    static async submitEdit(id, payload) {
        try {
            const { name, type, size, stock, TagId } = payload;

            const validation = this.validate(payload);
            if (Object.keys(validation).length > 0)
                throw {
                    name: "Validation Error",
                    valErr: validation,
                };

            const query = `update "Shirts" set "name" = '${name}',
            "type" = '${type}',
            "size" = '${size}',
            "stock" = '${stock}',
            "TagId" = '${TagId}'
            where "id" = '${id}'`;

            await pool.query(query);
        } catch (error) {
            throw error;
        }
    }

    static validate(payload) {
        try {
            const { name, type, size, stock, TagId } = payload;
            const errors = {};

            if (!name) {
                errors.name = `name is required`;
            } else {
                const words = name.trim().split(/\s+/);
                n;
                if (words.length < 2) errors.name = `minimal 2 word of name`;
            }
            if (!type) {
                errors.type = `type is required`;
            }
            if (!size) {
                errors.size = `size is required`;
            }
            if (!stock) {
                errors.stock = `stock is required`;
            } else if (+stock < 0 || +stock > 100) {
                errors.stock = `stock must be between 0 - 100`;
            }
            if (!TagId) {
                errors.TagId = `TagId is required`;
            }

            return errors;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Model;
