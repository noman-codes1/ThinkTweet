import Stripe from "stripe";
import { env } from "../config/env.config.js";
import { NotFoundError } from "../errors/errors.custom.js";
import { paymentRecordsVar } from "./webhook.schemaModel.js";
import { calculateCredits } from "./webhook.calcCredits.js";
import { UnauthorizedError } from "../errors/errors.custom.js";

const stripe = new Stripe(env.stripe);

export const webhookController = async (req, res, next) => {
  console.log("Inside webhookController() func")
  try {

    //extracting the signature
    console.log("Extracting the signature")
    const signature = req.headers["stripe-signature"];

    //checking whether the signature is present or not
    console.log("Checking whehter the signature is present or not...")
    if (!signature){
      throw new UnauthorizedError("No signature found")
    }

    //matching the signature cryptorgraphically
    console.log("Matching.....")
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.webhook,
    );
    console.log("Singature Matched")

    //extracting the data based on conditons
    console.log("Checking the condtions...")
    if (event.type === "checkout.session.completed") {
      console.log("Inside if block")

      //storing the data in a variable
      console.log("Extracting a data...")
      const returnedData = event.data.object;
      console.log(returnedData)

      //checking whether the data payment was recorded or not
      console.log("Checking the database to avoid ideompotency.")
      if(await paymentRecordsVar.exists({sess_id: returnedData.id})){
        console.log("Payment records already exists")

        //replying back to the server
        console.log("Connection closed...")
        return res.status(200).json({
            recieved: true
        })
      }
      console.log("Payment records not found.")

      //calculating the credits
      console.log("Calc the credits...")
      const credits = calculateCredits(returnedData.metadata.plan);

      //saving the records in the database
      console.log("Saving the records in a database...")
      await paymentRecordsVar.create({
        user_id: returnedData.metadata.userId,
        sess_id: returnedData.id,
        user_email: returnedData.customer_details.email,
        credits_bought: credits,
        payment_amount: returnedData.amount_total,
        plan_bought: returnedData.metadata.plan
      });
      console.log("Database Saved")
    } else {
      console.log("Needful event not found. Throwing a error to record...")
      throw new NotFoundError("Selected event type not present");
    }

    //sending a acknowledgement to the server
    console.log("Closing the connection.")
    res.status(200).json({
      recieved: true,
    });
  } catch (error) {
    next(error);
  }
};
