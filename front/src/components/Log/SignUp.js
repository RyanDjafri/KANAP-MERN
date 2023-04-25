import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  // check infos, valid email, password ...
  const [submitForm, setSubmitForm] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createAccount = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      data: { pseudo, email, password },
    }).then((res) => {
      console.log(res);
      setSubmitForm(true);
    });
  };

  return (
    <>
      {submitForm ? (
        <>
          <h2>Signed up ! </h2>
          <a href="/login">Login</a>
        </>
      ) : (
        <div className="signup-container">
          <form onSubmit={createAccount}>
            <input
              type="text"
              placeholder="Pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <br />
            <span id="pseudo-error"></span>
            <br />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <span id="email-error"></span>
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <span id="password-error"></span>
            <br />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;
