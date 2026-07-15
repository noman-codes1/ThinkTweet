import { Resend } from "resend";
import { env } from "../config/env.config.js";
import { mailBody } from "./signup.mailBody.js";
import { logFlow, logError } from "../debug/debug.logs.js";
import { InteralServerError } from "../errors/errors.custom.js";

//creating a instance from the class
const sendMail = new Resend(env.resend);

//function to send a mail
export const sendVerificationLink = async (links, userEmailId) => {
  logFlow("Preparing to send the mail to the user");

  //calling the function to get the mail id
  const message = mailBody(links);

  //calling the function to send the mail via resend
  logFlow("Talking to the resend server");
  const response = await sendMail.emails.send({
    from: "ThinkTweet <verification@thinktweet.meetnoman.com>",
    to: userEmailId,
    subject: "Verify your ThinkTweet account",
    html: message,
  });
  logFlow("Response recieved from the resend server");

  if (response.error) {
    logError("Error occured while sending the mail");
    throw new InteralServerError("Unable to sent a mail");
  }
  logFlow("Mail sent successfully");
};
