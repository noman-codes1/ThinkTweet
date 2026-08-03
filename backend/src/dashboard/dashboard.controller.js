import { logFlow, logError, logDB, logValid } from "../debug/debug.logs.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { paymentRecordsVar } from "../webhook/webhook.schemaModel.js";

export const dashboardController = async (req, res, next) => {
  try {
    logFlow("Inside dashboardController files");

    logFlow("Getting the value from the");
    const userId = req.user.userId

    logDB("Checking any payment was done or not...");
    const doesPaymentRecordExists = await paymentRecordsVar.exists({
      user_id: userId,
      has_updated: false,
    });

    //performing this only if the user boughts the credits and system hasn't updated it
    logFlow("Performing action based on what database responded.")
    if (doesPaymentRecordExists) {

      logFlow("Payment log exists which is not updated.")
      logDB("Pulling the records in array format from databse...")
      const paymentData = await paymentRecordsVar.find({
        user_id: userId,
      });

      //calculating the number of credits bought (if confused, re-read about reduce func)
      logFlow("Summing of the credits for multiple log (if any).")
      const creditsBought = paymentData.reduce((total, currentVal) => {
        return total + currentVal.credits_bought;
      }, 0);

      //asking database to return the current credits left in the account
      logDB("Pulling the existing number of credits of a user.")
      const existingCredData = await registeredUserVar.findOne(
        { _id: userId },
        { _id: 0, credits: 1 },
      );

      //adding up the final credits
      logFlow("Summing up the final credits for a user.")
      const finalCred = creditsBought + existingCredData.credits;

      //adding the final credits in the account
      logFlow("Updating the credits in a user account.")
      await registeredUserVar.updateOne(
        { _id: userId },
        { $set: { credits: finalCred } },
      );

      //updating the value in the records to avoid ideompotency
      logFlow("Changing the status of 'has_updated' to avoid adding multiple credits")
      await paymentRecordsVar.updateMany(
        { user_id: userId, has_updated: false },
        { $set: { has_updated: true } },
      );
    }

    //getting all the updated records from the database to feed the dashboard
    logDB("Pulling out all the data to send to the frontend")
    const updatedDataFromDatabase = await registeredUserVar.findOne(
      { _id: userId },
      { _id: 0, user_name: 1, credits: 1, totalAnalysis: 1 },
    );

    //declaring the error in the last purchase history page for now
    logError("Declaring the error for due to time constraint for the developer.")
    const purchaseHistoryError = {
      date: "System error",
      credits: "Error",
      amount: "Error",
    };

    //crafting a data to be sent
    logFlow("Crafting the final response...")
    const dataToFeedDashboard = {
      name: updatedDataFromDatabase.user_name,
      credits: updatedDataFromDatabase.credits,
      numOfAnalysis: updatedDataFromDatabase.totalAnalysis,
      lastPurHistory: purchaseHistoryError,
    };

    //closing off the talk now
    logFlow("Closing the conneciton.")
    res.status(200).json({
      success: true,
      data: dataToFeedDashboard,
    });
  } catch (error) {
    next(error);
  }
};
