import Stripe from "stripe";
import { env } from "../config/env.config.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";

//creating a instance from the class
const stripe = new Stripe(env.stripe);

//function to get the url for the payment
export const checkoutStripe = async (
  stripecusid,
  userid,
  userplan,
  calculatedAmount,
) => {
  console.log("Inside checkoutStripe() func");

  //creating a stripe session by talking to the server
  console.log("Creating a stripe session...");
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: stripecusid,
    line_items: [
      {
        price_data: {
          currency: "usd",

          product_data: {
            name: `Think Tweet ${userplan}`,
          },
          unit_amount: calculatedAmount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: userid.toString(),
      plan: userplan,
    },
    success_url: "https://meetnoman.com/",
    cancel_url: "https://velin.meetnoman.com/",
  });
  console.log("Server talk completed. Server replied...");

  //returing the function
  return session.url;
};
