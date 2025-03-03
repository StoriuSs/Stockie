const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();

// Cấu hình session
app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: true,
	})
);

app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Kết nối MySQL
const db = mysql.createPool({
	host: "localhost",
	user: "root", // Thay bằng user của bạn
	password: "", // Thay bằng password của bạn
	database: "finance_db", // Đảm bảo đã tạo CSDL này
});

db.getConnection((err) => {
	if (err) console.error("❌ Lỗi kết nối MySQL:", err.message);
	else console.log("✅ Kết nối MySQL thành công!");
});

// Middleware kiểm tra đăng nhập
function loginRequired(req, res, next) {
	if (!req.session.user_id) {
		return res.redirect("/login");
	}
	next();
}

// Chặn cache (tương đương @after_request)
app.use((req, res, next) => {
	res.set("Cache-Control", "no-cache, no-store, must-revalidate");
	res.set("Pragma", "no-cache");
	res.set("Expires", "0");
	next();
});

// Helper function to render apology
function apology(message, code = 400) {
	function escape(s) {
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
		for (const [oldChar, newChar] of replacements) {
			s = s.replace(new RegExp(oldChar, "g"), newChar);
		}
		return s;
	}

	return {
		title: "Error",
		top: code,
		bottom: escape(message),
	};
}

// Middleware to make session available in all views
app.use((req, res, next) => {
	res.locals.session = req.session;
	next();
});

// Route index
app.get("/", loginRequired, (req, res) => {
	res.render("apology", apology("TODO"));
});

// Route buy
app.get("/buy", loginRequired, (req, res) => {
	res.render("apology", apology("TODO"));
});

// Route history
app.get("/history", loginRequired, (req, res) => {
	res.render("apology", apology("TODO"));
});

// Route login
app.get("/login", (req, res) => {
	res.render("login", { title: "Log In" });
});

app.post("/login", (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.render("apology", apology("Must provide username & password"));
	}

	db.query(
		"SELECT * FROM users WHERE username = ?",
		[username],
		async (err, results) => {
			if (err) return res.send("Database error");
			if (
				results.length === 0 ||
				!(await bcrypt.compare(password, results[0].hash))
			) {
				return res.render("apology", apology("Invalid username/password"));
			}

			req.session.user_id = results[0].id;
			res.redirect("/");
		}
	);
});

// Route logout
app.get("/logout", (req, res) => {
	req.session.destroy(() => res.redirect("/"));
});

// Route quote
app.get("/quote", loginRequired, (req, res) => {
	res.render("apology", apology("TODO"));
});

// Route register
app.get("/register", (req, res) => {
	res.render("apology", apology("TODO"));
});

// Route sell
app.get("/sell", loginRequired, (req, res) => {
	res.render("apology", apology("TODO"));
});

// Chạy server
const PORT = 8800;
app.listen(PORT, () => {
	console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
