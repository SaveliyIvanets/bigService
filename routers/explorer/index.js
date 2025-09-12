const express = require("express");
const router = express.Router();
const traversalCatcher = require("./traversalCatcher");
const getContent = require("./getContent");
const errorMidleware = require("./errorMidleware");

router.use("/:operation/:name(*)", traversalCatcher);
router.get("/:operation/:name(*)", getContent.getContent);
router.get("/browse", getContent.getUpdateContent);
router.use(errorMidleware);

module.exports = router;
