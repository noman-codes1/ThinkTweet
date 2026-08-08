import { logFlow } from "../debug/debug.logs.js"

export const calculateCredits = (plan) =>{
    logFlow("Running calculateCredits files..")

    //calculating the credits
    logFlow("Calculation begins..")
    let credits
    if (plan === "premium"){
        credits = 100
    }
    else if(plan === "pro"){
        credits = 250
    }
    else if(plan === "pro-max"){
        credits = 400
    }
    logFlow("Caculation done")
    
    //returing the function
    logFlow("Returning the func.")
    return credits
}