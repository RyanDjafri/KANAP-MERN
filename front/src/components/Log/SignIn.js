import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  // check infos before signing in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const connectUser = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    }).then((res) => {
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        window.location = "/";
      }
    });
  };
  return (
    <div>
      <h2>Sign In </h2>
      <form onSubmit={connectUser}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <span id="error"></span>
        <br />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default SignIn;
