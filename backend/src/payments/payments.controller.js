import { createStripeCustomerId } from "./payment.createStripeId.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { checkoutStripe } from "./payment.checkoutStripe.js";
import { calculatePrice } from "./payment.calcPrices.js";
import { logFlow, logError, logDB } from "../debug/debug.logs.js";

export const paymentController = async (req, res, next) => {
  try {
    logFlow("Running paymentController Files...")

    //getting the plan
    logFlow("Extracting the plan from the body of request...")
    const userPlan = req.body.plan

    //getting the data from jwt
    logFlow("Getting the user id from the request object...")
    const id = req.user.userId;

    //calculating the cost of the plan
    logFlow("Calculating the price of the plan user selected")
    const setPrice = calculatePrice(userPlan);

    //fetching the database to get the details
    logDB("Searching the database to get relevant data...")
    const data = await registeredUserVar.findOne(
      { _id: id },
      { _id: 0, user_email: 1, user_name: 1, stripe_cus_id: 1 },
    );
    logDB("Data fetched")

    //checking whether user has stripe id or not
    logFlow("Checking whether has stripe customer id or not")
    let stripeId;
    if (data.stripe_cus_id) {
      logFlow("Stripe id found present in database")
      stripeId = data.stripe_cus_id;
    } else {
      logFlow("Stripe id not present")

      //creating a stripe id
      logFlow("Generating the stripe id")
      stripeId = await createStripeCustomerId(
        data.user_email,
        data.user_name,
        id,
      );
      logFlow("Stripe id generated")
    }

    //creating a checkout session
    logFlow("Creating a checkout session")
    const url = await checkoutStripe(
      data.stripe_cus_id,
      id,
      userPlan,
      setPrice,
    );

    //replying back to frontend
    logFlow("Closing the connection")
    res.status(200).json({
      sucess: "true",
      message: {
        sessionUrl : url
      },
    });
  } catch (error) {
    next(error);
  }
};
