import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.config.js";
import argon2 from "argon2";

export const accessToken = (id) => {
  console.log("Inside accessToken() Func, creating a signed key");

  //creating the signed cryptographic key for access token
  return jwt.sign({ userId: id }, env.accesskey, { expiresIn: "10m" });
};

export const refreshToken = async (id, sId) => {
  console.log("Inside refreshToken() Func");

  //creating a refresh token cyptographically
  console.log("Creating a refresht token...");
  const refreshToken = jwt.sign(
    { userId: id, sessionId: sId },
    env.refreshkey,
    {
      expiresIn: "7d",
    },
  );
  console.log("Created.");

  //hashing a token
  console.log("Hashing the token to save in database...");
  const hashedRefToken = await argon2.hash(refreshToken);
  console.log("All work is done. Returning the func.");

  return {
    rToken: refreshToken,
    rHashedToken: hashedRefToken,
  };
};
