const { lookup, usd } = require("../utils/helpers");
const connection = require("../config/dbConfig");

const getQuotePage = (req, res) => {
	res.render("quote.ejs", { messages: req.flash("error"), status: "danger" });
};

const postQuotePage = async (req, res) => {
	const { symbol } = req.body;
	const quoteData = await lookup(symbol);
	if (!quoteData) {
		req.flash("error", "Symbol not found!");
		return res.redirect("/quote");
	}

	req.flash(
		"success",
		`A share of ${quoteData.name} (${quoteData.symbol}) costs ${usd(
			quoteData.price
		)}.`
	);
	res.render("quote.ejs", {
		messages: req.flash("success"),
		status: "success",
	});
};

const getBuyPage = (req, res) => {
	res.render("buy.ejs", { messages: req.flash("error"), status: "danger" });
};

const postBuyPage = async (req, res) => {
	const { symbol, shares } = req.body;
	const quoteData = await lookup(symbol);

	if (!symbol || !shares) {
		req.flash("error", "Please fill in all fields!");
		return res.redirect("/buy");
	}

	if (!quoteData) {
		req.flash("error", "Symbol not found!");
		return res.redirect("/buy");
	}

	if (shares <= 0) {
		req.flash("error", "Shares must be a positive interger!");
	}

	const total = quoteData.price * shares;
	const [userCash] = await connection.query(
		"SELECT cash FROM users WHERE id = ?",
		req.session.user_id
	);

	let cash = userCash[0].cash;
	if (cash < total) {
		req.flash("error", "You don't have enough cash to do this action!");
		return res.redirect("/buy");
	}

	cash = cash - total;
	const now = new Date();
	// Add transaction to database
	await connection.query(
		"INSERT INTO transactions (symbol, shares, price, user_id, date) VALUES (?, ?, ?, ?, ?)",
		[symbol, shares, quoteData.price, req.session.user_id, now]
	);

	// Update user's cash
	await connection.query("UPDATE users SET cash = ? WHERE id = ?", [
		cash,
		req.session.user_id,
	]);

	req.flash("success", "Bought successfully!");
	res.render("index.ejs", {
		messages: req.flash("success"),
		status: "success",
	});
};

module.exports = { getQuotePage, postQuotePage, getBuyPage, postBuyPage };
