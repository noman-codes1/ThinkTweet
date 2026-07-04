import { z } from "zod"
import { isAlphanumeric } from "validator";

// FILE UNUSED RIGHT NOW. DON'T DELETE IT.

export const signupSchema = z.object({
  username: z
    .string({message: "Must be a string"})
    .trim()
    .refine((val) => {
      if (val === "") return true
      return isAlphanumeric(val)
      console.log(!!isAlphanumeric(val))
    }, {message: "Special Characters not allowed"})
    .min(3, {message: "Must be greater than 3 character"})
    .max(15, {message: "Must be less than 15 character"})
});