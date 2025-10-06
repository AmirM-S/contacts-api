const express = require("express");
const router = express.Router();
const controller = require("../controllers/contact.controller");
const { validateContact, validateContactUpdate } = require("../utils/validators");

router.post("/", validateContact, controller.createContact);
router.get("/", controller.getContacts);
router.get("/search", controller.searchContacts);
router.get("/:id", controller.getContactById);
router.put("/:id", validateContactUpdate, controller.updateContact);
router.delete("/:id", controller.deleteContact);

module.exports = router;
