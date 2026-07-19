import { logFlow, logDB, logError } from "../debug/debug.logs.js"
import { registeredUserVar } from "../signup/signup.schemaModel.js"

export const authneticatedController = async (req, res, next) =>{
    try {
        logFlow("Inside authnenticatedController files")

        //getting the user id
        logFlow("Extracting the data from jwt")
        const extractedData = req.user
        
        //searching the name of the user
        logDB("Finding the name in the database")
        const userData = await registeredUserVar.findOne({_id: extractedData.userId}, {user_name: 1})
        logDB("Name Found")

        res.status(200).json({
            success: true,
            message : {
                name : userData.user_name
            }
        })
    } catch (error) {
        next(error)
    }
}