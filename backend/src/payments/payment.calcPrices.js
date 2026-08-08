import { logFlow } from "../debug/debug.logs.js"

export const calculatePrice = (plan) =>{
    logFlow("Running caculatePrice files...")

    //deciding the price based on selected user plan
    logFlow("Deciding the price of plan...")
    let price
    if(plan === "premium"){
        price = 10000
    }
    else if(plan === "pro"){
        price = 20000
    }
    else if(plan === "pro-max"){
        price = 30000
    }
    logFlow("Plan decided. Returning the func.")

    return price
}