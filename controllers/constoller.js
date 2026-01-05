const Model = require("../models/model");

class Controller {
    static async readShirts(req, res) {
        try {
            const { q } = req.query;
            const dataShirts = await Model.getShirts(q);
            res.render("shirts", { dataShirts, q });
        } catch (error) {
            // res.send(error);
            console.log(error);
        }
    }
    static async showForm(req, res) {
        try {
            const { id } = req.params;
            let action = "/shirts/add";
            const dataTags = await Model.getTags();
            let isEdit = false;
            let shirt = {};

            if (id) {
                shirt = await Model.getShirtById(id);
                action = `/shirts/edit/${id}`;
                isEdit = true;
            }

            res.render("showForm", {
                shirt,
                dataTags,
                isEdit,
                action,
                error: {},
            });
        } catch (error) {
            res.send(error);
        }
    }
    static async postAdd(req, res) {
        try {
            const payload = { ...req.body };
            const data = await Model.submitAdd(payload);
            res.redirect("/");
        } catch (error) {
            const dataTags = await Model.getTags();
            if (error.name == "Validation Error") {
                return res.render("showForm", {
                    shirt: req.body,
                    dataTags,
                    action: "/shirts/add",
                    error: error.valErr,
                    isEdit: false,
                });
            }
            res.send(error);
        }
    }

    static async postEdit(req, res) {
        const { id } = req.params;
        try {
            const payload = { ...req.body };
            await Model.submitEdit(id, payload);
            res.redirect("/");
        } catch (error) {
            const dataTags = await Model.getTags();
            if (error.name == "Validation Error") {
                return res.render("showForm", {
                    shirt: req.body,
                    dataTags,
                    action: `/shirts/edit/${id}`,
                    error: error.valErr,
                    isEdit: true,
                });
            }
            res.send(error);
        }
    }
    static async increaseStock(req, res) {
        try {
            const { id } = req.params;
            await Model.incStock(+id);
            res.redirect("/");
        } catch (error) {
            res.send(error);
        }
    }
    static async decreaseStock(req, res) {
        try {
            const { id } = req.params;
            await Model.decStock(+id);
            res.redirect("/");
        } catch (error) {
            res.send(error);
        }
    }
    static async delShirt(req, res) {
        try {
            const { id } = req.params;
            await Model.deleteShirt(+id);
            res.redirect("/");
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;
