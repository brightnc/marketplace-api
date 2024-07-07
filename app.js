const { initDatabase } = require("./config/db.js");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const JWTMiddleware = require("./middleware/jwt.js");

const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/healthcheck", async (req, res) => {
  res.send("hello world");
});

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", JWTMiddleware, orderRoutes);

app.listen(port, () => {
  console.log("server is listening on port ", port);
  initDatabase();
});
