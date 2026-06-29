import Stripe from "stripe";
import { env } from "../config/env.config.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";

//creating a instance from the class
const stripe = new Stripe(env.stripe);

//function to get a unique stripe customer id
export const createStripeCustomerId = async (useremail, username, userid) => {
  console.log("Inside createStripeCustomerId() func");

  //fetching the data from stripe server
  console.log("Talking to Stripe Server...");
  const stripeCustomer = await stripe.customers.create({
    email: useremail,
    name: username,

    metadata: {
      userId: userid.toString(),
    },
  });
  console.log("Server talk completed. Recievied data");
  console.log(`Stripe cus id : ${stripeCustomer.id}`);

  //updating a database
  console.log("Updating a database");
  await registeredUserVar.updateOne(
    { _id: userid },
    { $set: { stripe_cus_id: stripeCustomer.id } },
  );
  console.log("Database updated");

  console.log("Returning the func...");
  return stripeCustomer.id;
};
