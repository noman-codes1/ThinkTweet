export function authLoginController(req, res){
    console.log("Inside authLoginController() func")
    console.log(req.body)
    res.json({
      success: true,
      message: "You have reached login controller",
    });
}