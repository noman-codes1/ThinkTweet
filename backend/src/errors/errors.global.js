import { AppError } from "./errors.custom.js";
import { logFlow, logError } from "../debug/debug.logs.js";

//function for the global error so that one can handle alone
//we need 4 paramteters to run it properly... express depends a bit.
export const globalError = (err, req, res, next) => {
  logError(err.message)
  logError("This is the error stack: ", err.stack);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Something went wrong.",
    });
  }
};
