import Stripe from "stripe";
import { env } from "../config/env.config.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { logFlow, logError, logDB, logValid } from "../debug/debug.logs.js";
import { NotFoundError } from "../errors/errors.custom.js";

//creating a instance from the class
// #tip: understand more about the 'class' concept of js 
const stripe = new Stripe(env.stripe);

//function to get a unique stripe customer id
export const createStripeCustomerId = async (useremail, username, userid) => {
  logFlow("Running createStripeCustomerId files...")

  //fetching the data from stripe server
  logFlow("Establishing a connection with stripe server...")
  const stripeCustomer = await stripe.customers.create({
    email: useremail,
    name: username,

    metadata: {
      userId: userid.toString(),
    },
  });
  logFlow("Stripe server responded with some data..")

  //checking whether stripe customer id present or not
  logFlow("Validating the response")
  if (!stripeCustomer.id) {
    logError("Stripe id not found")
    throw new NotFoundError("Unable to create stripe cus id.")
  }
  logValid("Validated the stripe data")

  //updating a database
  logDB("Updating the database with stripe cuss id..")
  await registeredUserVar.updateOne(
    { _id: userid },
    { $set: { stripe_cus_id: stripeCustomer.id } },
  );
  logDB("Database updated")

  //returning the function
  logFlow("Returning the func.")
  return stripeCustomer.id;
};
