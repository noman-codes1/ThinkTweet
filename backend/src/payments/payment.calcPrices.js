export const calculatePrice = (plan) =>{
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

    return price
}