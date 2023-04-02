import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [submitForm, setSubmitForm] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const checkInfos = () => {
    const regex = /^[A-Za-z0-9+*_.-]+@(.+)$/;
    const pseudoError = document.getElementById("pseudo-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    if (pseudo.length <= 3) {
      pseudoError.textContent = "Minimum length : 4";
    } else {
      passwordError.textContent = "";
    }
    if (regex.test(email.value) === false) {
      emailError.textContent = "Please, enter a valid email";
    } else {
      emailError.textContent = "";
    }
    if (password !== confirmPassword || password.length <= 3) {
      passwordError.textContent = "Incorrect Password!";
    } else {
      passwordError.textContent = "";
    }
  };
  const createAccount = (e) => {
    e.preventDefault();
    checkInfos();
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
