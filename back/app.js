//#region requires
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Coupons = require("./models/Coupon");
//#endregion

//#region config
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI;
//#endregion

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.json("hello");
});

app.get("/coupons", async (_req, res) => {
  const coupons = (await Coupons.find({})).map((coupon) => {
    delete coupon._id;
    return coupon;
  });

  res.json({ coupons, freeUse: coupons.length === 4 });
});

app.put("/use", async (req, res) => {
  const { title } = req.query;
  await Coupons.findOneAndUpdate({ title }, { used: true });
  res.sendStatus(204);
});

app.post("/create", async (req, res) => {
  const newCoupon = new Coupons(req.body);
  await Coupons.insertMany([newCoupon]);
  res.status(201).json(newCoupon);
});

//#region connecting
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(`connected to MongoDB`);
    app.listen(port, () => console.log(`app listening at ${port}`));
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
//#endregion
