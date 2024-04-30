const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

const secret = "secret-key";
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/signincookie", (req, res) => {
  res.cookie("paket", "ransel", { signed: true });
  res.send("Cookie signed");
});
app.get("/verifycookie", (req, res) => {
  const cookies = req.signedCookies;
  res.send(cookies);
});

app.get("/count", (req, res) => {
  let count = req.cookies.count || 0;
  count++;
  res.cookie("count", count);
  res.send(`Count: ${count}`);
});

app.get("/register", (req, res) => {
  const { username = "Anonim" } = req.query;
  req.session.username = username;
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  res.send("Welcome back to dasbhboard, " + req.session.username);
});

app.use("/admin", require("./routes/admin"));
app.use("/theater", require("./routes/theater"));
app.use("/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:3000`);
});
