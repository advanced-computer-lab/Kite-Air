import React from "react"; //, {useState }
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { TextField, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
//import { UserContext } from "../context/index.js";
import StripeInput from "./StripeInput";
import{ useState } from "react";

import StripeCheckout from "react-stripe-checkout";

const trial= () => {

    return fetch(`http://localhost:8282/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      })
        .then(response => {
          console.log("RESPONSE ", response);
          const { status } = response;
          console.log("STATUS ", status);
        })
        .catch(error => console.log(error));
    };
  // const formValues = UserContext();
  const stripePromise = loadStripe("STRIPE_PUBLISHABLE_API_KEY");

  function handleCVC(input) {
    console.log(input);
  }

  // const cardsLogo = [
  //   "amex",
  //   "cirrus",
  //   "diners",
  //   "dankort",
  //   "discover",
  //   "jcb",
  //   "maestro",
  //   "mastercard",
  //   "visa",
  //   "visaelectron",
  // ];

  return (
    <>
    
<StripeCheckout
stripeKey="LEARNCODEONLINE"
token={makePayment}
name="Buy React"
amount={product.price * 100}
shippingAddress
billingAddress
>
<button className="btn-large blue">
  Buy react is just {product.price} $
</button>
</StripeCheckout>
      {/* <Grid container item spacing={4} xs={15}>
        <Grid item xs={8} spacing={6}>
          <Typography variant="h6"> Payment Data </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} spacing={10}>
        <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement,
            },
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} sm={6} spacing={4}>
        <TextField
          label="Expiration Date"
          name="ccexp"
          variant="outlined"
          required
          fullWidth
          InputProps={{
            inputProps: {
              component: CardExpiryElement,
            },
            inputComponent: StripeInput,
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} sm={6} spacing={7}>
        <TextField
          label="CVC"
          name="cvc"
          variant="outlined"
          required
          onChange={handleCVC}
          fullWidth
          InputProps={{
            inputProps: {
              component: CardCvcElement,
            },
            inputComponent: StripeInput,
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid> */}
    </>
  
};

export default trial;

