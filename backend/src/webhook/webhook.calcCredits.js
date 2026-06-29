export const calculateCredits = (plan) =>{
    console.log("Inside calculateCredits() func")

    //calculating the credits
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
    
    //returing the function
    console.log(`Credits: ${credits}`)
    return credits
}