const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MongoURI } = require("../config/keys");
const cors = require("cors");
const app = express();

const stripe = require("stripe")(
  "sk_test_51K8SsmEqt2T4r3H7toUlZD2M55lcA7zKdIqmSsQtliB6M0D5wusjaSlU8DiCjIt9U2bUvYBom5McIye6nhrC5qCj00SW7QWnkZ"
);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

const flightController = require("./Routes/FlightController");
const reservationcontroller = require("./Routes/reservationController");
const userController = require("./Routes/userController");

app.use("/flights", flightController);
app.use("/reservations", reservationcontroller);
app.use("/users", userController);

const port = process.env.PORT || "8000";

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT ", product);
  console.log("PRICE ", product.price);
  const idempontencyKey = "sLXoX7tnENC9IRcnv";

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});