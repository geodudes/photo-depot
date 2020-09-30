import React from "react";

export default function Login() {

  /*
    This is the button that sends the initial OAuth authentication request
  */

  return (
    <div>
      <a href="/api/getAuthURL">
        <button>LOG IN WITH GOOGLE</button>
      </a>
      <a href="/api/logout">
        <button>LOG OUT</button>
      </a>
    </div>
  );
};