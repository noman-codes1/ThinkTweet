import React from 'react'
import Form from '../features/signup/Form'

const SignUp = () => {
  // WE WILL COME BACK TO THIS BECAUSE, THERE ARE LOTS OF LOGICAL ISSUES

  //handle form submit
  const handleSubmit = async (name, email, passoword, confirmPass) => {
    // USE ZOD TO VALIDATE ALSO
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        useremail: email,
        userpass: passoword,
        userconfirmpasss: confirmPass,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="bg-[#f8fafc] flex justify-center p-12">
      <Form formSubmit={handleSubmit} />
    </div>
  );
}

export default SignUp