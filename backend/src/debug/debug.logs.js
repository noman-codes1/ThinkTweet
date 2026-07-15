import createDebug from "debug"

export const logFlow = createDebug("ThinkTweet:flow")
export const logValid = createDebug("ThinkTweet:validation")
export const logDB = createDebug("ThinkTweet:database")
export const logError = createDebug("ThinkTweet:error")
export const logSuccess = createDebug("ThinkTweet:success")