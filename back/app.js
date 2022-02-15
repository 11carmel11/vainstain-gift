//#region requires
const express = require("express");
const cors = require("cors");
const sendGrid = require("@sendgrid/mail");
const mongoose = require("mongoose");
require("dotenv").config();
const Coupons = require("./models/Coupon");
//#endregion

//#region config
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI;
const sendGridApiKey = process.env.SEND_GRID_API_KEY;
sendGrid.setApiKey(sendGridApiKey);
const msg = {
  to: "11carmrl11@gmail.com",
  from: "11carmel11@walla.com",
  // subject: "nitzan and yuri using coupon",
  // text: "and easy to do anywhere, even with Node.js",
  // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
//#endregion

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json("hello");
});

app.get("/coupons", async (_req, res) => {
  let coupons = await Coupons.find({});

  coupons = coupons.map((coupon) => {
    delete coupon._id;
    return coupon;
  });

  res.json({ coupons, freeUse: coupons.length === 4 });
});

app.put("/use", async (req, res) => {
  const { title } = req.query;
  msg.subject = "nitzan and yuri - using coupon";
  msg.text = title;
  msg.html = `<strong>${title}</strong`;
  await Coupons.findOneAndUpdate({ title }, { used: true });
  await sendGrid.send(msg);

  res.sendStatus(204);
});

app.post("/create", async (req, res) => {
  const newCoupon = new Coupons(req.body);
  msg.subject = "nitzan and yuri - creating coupon";
  msg.text = req.body.explain;
  msg.html = `<strong>${req.body.explain}</strong`;
  await Coupons.insertMany([newCoupon]);
  await sendGrid.send(msg);

  res.status(201).json(newCoupon);
});

//#region connecting
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to MongoDB`);
    app.listen(port, () => console.log(`app listening at ${port}`));
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
//#endregion
