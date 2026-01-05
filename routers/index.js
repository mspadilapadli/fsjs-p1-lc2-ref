const express = require("express");
const router = express.Router();
const Controller = require("../controllers/constoller");

router.get("/", Controller.readShirts);

router.get("/shirts/add", Controller.showForm);
router.post("/shirts/add", Controller.postAdd);

router.get("/shirts/edit/:id", Controller.showForm);
router.post("/shirts/edit/:id", Controller.postEdit);

router.get("/shirts/increase-stock/:id", Controller.increaseStock);
router.get("/shirts/decrease-stock/:id", Controller.decreaseStock);

router.get("/shirts/delete/:id", Controller.delShirt);

module.exports = router;
