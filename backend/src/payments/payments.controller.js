import { createStripeCustomerId } from "./payment.createStripeId.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { checkoutStripe } from "./payment.checkoutStripe.js";
import { validationPayment } from "../validation/validation.payment.js";
import { calculatePrice } from "./payment.calcPrices.js";

export const paymentController = async (req, res, next) => {
  console.log("Inside paymetnController() func");
  try {
    //getting the plan
    console.log("Validating the request...");
    const userPlan = await validationPayment(req.body);
    console.log(`User Plan: ${userPlan}`);

    //getting the data from jwt
    console.log("Get id from req.uer");
    const id = req.user.userId;

    //calculating the cost of the plan
    console.log("Calculating the price to be paid by user");
    const setPrice = calculatePrice(userPlan);

    //fetching the database to get the details
    console.log("Searching the database...");
    const data = await registeredUserVar.findOne(
      { _id: id },
      { _id: 0, user_email: 1, user_name: 1, stripe_cus_id: 1 },
    );
    console.log("Recieved data is: ", data);

    //checking whether user has stripe id or not
    console.log("Getting the stripe id");
    let stripeId;
    if (data.stripe_cus_id) {
      //stripe id already present
      console.log("Inside if block");
      console.log("Stripe id present in the database...");
      stripeId = data.stripe_cus_id;
    } else {
      //creating a stripe id
      console.log("Inside else block");
      console.log("Generating a stripe id");
      stripeId = await createStripeCustomerId(
        data.user_email,
        data.user_name,
        id,
      );
    }
    console.log(`Stripe id: ${stripeId}`);

    //creating a checkout session
    console.log("Creating a payment session...");
    const url = await checkoutStripe(
      data.stripe_cus_id,
      id,
      userPlan,
      setPrice,
    );

    //replying back to frontend
    console.log("Closing the connection");
    res.status(200).json({
      sucess: "true",
      message: url,
    });
  } catch (error) {
    next(error);
  }
};
