import { Resend } from "resend";
import { env } from "../config/env.config.js";
import { mailBody } from "./signup.mailBody.js";

//creating a instance from the class
const sendMail = new Resend(env.resend);

//function to send a mail
export const sendVerificationLink = async (links, userEmailId) => {
  console.log("Inside sendVerificationLink() func");
  
  //calling the function to get the mail id
  const message = await mailBody(links);

  //calling the function to send the mail via resend
  const response = await sendMail.emails.send({
    from: "ThinkTweet <verification@thinktweet.meetnoman.com>",
    to: userEmailId.trim(),
    subject: "Verify your ThinkTweet account",
    html: message,
  });

  console.log("Resend replied to our server back.");

  if (response.error) {
    console.log(response.error);
    return "";
  }
  console.log("Mail sent successfully");

  return response.data.id;
};
