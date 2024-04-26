const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret-key"));

app.get("/signincookie", (req, res) => {
  res.cookie("paket", "ransel", { signed: true });
  res.send("Cookie signed");
});
app.get("/verifycookie", (req, res) => {
  const cookies = req.signedCookies;
  res.send(cookies);
});

app.use("/admin", require("./routes/admin"));
app.use("/theater", require("./routes/theater"));
app.use("/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:3000`);
});
