import { anaylsisServices } from "./analysis.services.js"

export async function analysisControllerLogic (req, res) {
    console.log(req.body)
    await anaylsisServices(req.body.dataText)
    res.json({
        message : "You have reached controller"
    })
}