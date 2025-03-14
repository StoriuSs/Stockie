const axios = require("axios");

function loginRequired(req, res, next) {
	if (!req.session.user_id) {
		return res.redirect("/login");
	}
	next();
}

async function lookup(symbol) {
	const url = `https://finance.cs50.io/quote?symbol=${symbol.toUpperCase()}`;
	try {
		const response = await axios.get(url);
		const quoteData = response.data;
		return {
			name: quoteData.companyName,
			price: quoteData.latestPrice,
			symbol: symbol.toUpperCase(),
		};
	} catch (error) {
		console.error(`Request error: ${error}`);
		return null;
	}
}

function usd(value) {
	return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

module.exports = { loginRequired, lookup, usd };
