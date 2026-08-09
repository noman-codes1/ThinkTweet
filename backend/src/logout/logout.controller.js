import { logFlow, logError, logDB } from "../debug/debug.logs.js";

export const logoutController = (req, res, next) => {
  try {
    logFlow("Running logoutController files...");

    //extracting the user id
    logFlow("Extracting user id from the request");
    const userId = req.user.userId;

    //delete the session from the server
    //#tip: You need to update the lot of files to delete this
    //but make sure to build this feature because it's imp for security

    //deleting the access token
    logFlow("Deleting the accessToken");
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    //deleting the refresh token
    logFlow("Deleting the refreshToken");
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/refresh",
    });

    //closing the  connection
    logFlow("Closing the connection.. Bye bye user!!")
    res.status(200).json({
        success: true,
        message: "You have successfully logged out"
    })
  } catch (error) {
    next(error)
  }
};
