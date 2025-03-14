const express = require("express");
const router = express.Router();
const { loginRequired } = require("../utils/helpers");
const {
	getQuotePage,
	postQuotePage,
	getBuyPage,
	postBuyPage,
} = require("../controllers/stockController");

router
	.route("/buy")
	.get(loginRequired, getBuyPage)
	.post(loginRequired, postBuyPage);

router
	.route("/sell")
	.get(loginRequired, (req, res) => {
		res.send("TODO");
	})
	.post(loginRequired, (req, res) => {
		res.send("TODO");
	});

router
	.route("/quote")
	.get(loginRequired, getQuotePage)
	.post(loginRequired, postQuotePage);

router.get("/history", loginRequired, (req, res) => {
	res.send("TODO");
});

module.exports = router;
