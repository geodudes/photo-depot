import React from "react";

export default function Login() {

  const attemptLogin = async () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await console.log('loginresponse', loginResponse)
    } 
    catch (error) {
      console.log('Error while attempting login', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="email" id="email" />
      <input type="text" placeholder="password" id="password" />
      <button onClick={attemptLogin} >Submit</button>
    </div>
  );
};