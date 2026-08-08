import Stripe from "stripe";
import { env } from "../config/env.config.js";
import { NotFoundError } from "../errors/errors.custom.js";
import { paymentRecordsVar } from "./webhook.schemaModel.js";
import { calculateCredits } from "./webhook.calcCredits.js";
import { UnauthorizedError } from "../errors/errors.custom.js";
import { logFlow, logError, logDB } from "../debug/debug.logs.js"

//creating a stripe object from the factory function
const stripe = new Stripe(env.stripe);

export const webhookController = async (req, res, next) => {
  try {
    logFlow("Running webhookController files....")

    //extracting the signature
    logFlow("Extracting the signature from the req.headers")
    const signature = req.headers["stripe-signature"];

    //checking whether the signature is present or not
    logFlow("Does signature exists?")
    if (!signature){
      logError("No, not")
      throw new UnauthorizedError("No signature found")
    }
    logFlow("Yes, it does")

    //matching the signature cryptorgraphically and getting the data
    logFlow("Matching the signatue and getting the data from stripe server..")
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.webhook,
    );
    logFlow("Done")

    //extracting the data based on conditons
    logFlow("Checking whether selected event type is presnt or not and working accordingly..")
    if (event.type === "checkout.session.completed") {
      logFlow("Yes, present")

      //storing the data in a variable
      logFlow("Extracting the useful data")
      const returnedData = event.data.object;

      //checking whether the data payment was recorded or not
      logFlow("Ideompotency check begins...")
      if(await paymentRecordsVar.exists({sess_id: returnedData.id})){
        logFlow("Payment already recorded ThinkTweet server")

        //replying back to the server
        logFlow("Closing the connection")
        return res.status(200).json({
            recieved: true
        })
      }
      logFlow("Ideompotency not recorded")

      //calculating the credits
      logFlow("Calculating the credits...")
      const credits = calculateCredits(returnedData.metadata.plan);

      //saving the records in the database
      logFlow("Creating a payment record in the database")
      await paymentRecordsVar.create({
        user_id: returnedData.metadata.userId,
        sess_id: returnedData.id,
        user_email: returnedData.customer_details.email,
        credits_bought: credits,
        payment_amount: returnedData.amount_total,
        plan_bought: returnedData.metadata.plan
      });
      logFlow("Database created")
    } else {
      logFlow("Selected event not found")
      throw new NotFoundError("Selected event type not present");
    }

    //sending a acknowledgement to the server
    logFlow("Closing the connnection")
    res.status(200).json({
      recieved: true,
    });
  } catch (error) {
    next(error);
  }
};
