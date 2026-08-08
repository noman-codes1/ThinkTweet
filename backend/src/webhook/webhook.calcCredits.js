import { logFlow } from "../debug/debug.logs.js"

export const calculateCredits = (plan) =>{
    logFlow("Running calculateCredits files..")

    //calculating the credits
    logFlow("Calculation begins..")
    let credits
    if (plan === "premium"){
        credits = 90
    }
    else if(plan === "pro"){
        credits = 360
    }
    else if(plan === "pro-max"){
        credits = 630
    }
    logFlow("Calculation done")
    
    //returing the function
    logFlow("Returning the func.")
    return credits
}