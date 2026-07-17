import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.config.js";
import argon2 from "argon2";
import { logFlow,logError } from "../debug/debug.logs.js";

export const accessToken = (id) => {
  logFlow("Running generateToken files...")
  logFlow("Runing accessToken function...")

  //creating the signed cryptographic key for access token
  logFlow("Creating a accessToken")
  return jwt.sign({ userId: id }, env.accesskey, { expiresIn: "10m" });
};

export const refreshToken = async (id, sId) => {
  logFlow("Running generateToken files...")
  logFlow("Running refreshToken function...")

  //creating a refresh token cyptographically
  logFlow("Creating a refresh token")
  const refreshToken = jwt.sign(
    { userId: id, sessionId: sId },
    env.refreshkey,
    {
      expiresIn: "7d",
    },
  );
  logFlow("Created")

  //hashing a token
  logFlow("Hashing the refToken")
  const hashedRefToken = await argon2.hash(refreshToken);

  return {
    rToken: refreshToken,
    rHashedToken: hashedRefToken,
  };
};
