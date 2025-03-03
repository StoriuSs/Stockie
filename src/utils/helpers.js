const axios = require('axios');

function apology(message, code = 400) {
    const escape = (s) => {
        const replacements = [
            ["-", "--"],
            [" ", "-"],
            ["_", "__"],
            ["?", "~q"],
            ["%", "~p"],
            ["#", "~h"],
            ["/", "~s"],
            ['"', "''"],
        ];
        replacements.forEach(([old, newStr]) => {
            s = s.replace(new RegExp(old, 'g'), newStr);
        });
        return s;
    };

    return {
        view: "apology",
        data: { top: code, bottom: escape(message) },
        status: code
    };
}

function loginRequired(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
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
            symbol: symbol.toUpperCase()
        };
    } catch (error) {
        console.error(`Request error: ${error}`);
        return null;
    }
}

function usd(value) {
    return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

module.exports = { apology, loginRequired, lookup, usd };
