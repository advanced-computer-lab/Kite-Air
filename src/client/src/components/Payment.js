
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Button from "@mui/material/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import StripeCheckout from "react-stripe-checkout";

import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
//import { UserContext } from "../context/index.js";
import StripeInput from "./StripeInput";

const Payment = () => {

    const onPaymentSuccess = (token) => {
        // send the stripe token to your backend!
      }
  

    const [product, setProduct] = useState({
        name: "flight reserved",
        price: 10,
      });
    
  const makePayment = token => {
      console.log("hereeeeeeeeeeeeeeekede")
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:8000/payment`, {
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


  function handleCVC(input) {
    console.log(input);
  }

  return (
    <>
    <br/><br/><br/><br/><br/><br/><br/><br/>
    
      <StripeCheckout
    stripeKey="pk_test_51K8SsmEqt2T4r3H7Dv4W361XbP9J3TNHzMQDKVtljLjJaoHg8aQKnhDTcfFaWtLO69MG8DK8ZuVwgmmkbB3Nea2p00IUseecKz"
    amount={100000}
    imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
    name="Payment"
    currency="USD"
    token={makePayment}
    allowRememberMe={false}
    onPaymentSuccess={onPaymentSuccess}
  />
    </>
  );
};

export default Payment;


// {cardsLogo.map((e) => (
//   <img
//     key={e}
//     src={`./cards/${e}.png`}
//     alt={e}
//     width="50px"
//     align="bottom"
//     style={{ padding: "0 5px" }}
//   />
// ))}
