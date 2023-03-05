import React, { useState } from "react";
import Logo from "../logo2.png";

const baseURL = process.env.REACT_APP_FABRIC_BASEURL;

function ConnectWallet() {
  const [name, setName] = useState("");
  sessionStorage.setItem("fabricUserName", name);

  //Activate on Button click
  const fetchAccount = async () => {
    try {
      const fabricResponse = await fetch(baseURL + "GetAccountBalance", {
        method: "POST",
        body: JSON.stringify({
          fabricUserName: sessionStorage.getItem("fabricUserName"),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const valid = await fabricResponse.text();
      checkAndConnect(valid);
    } catch (err) {
      console.log(err);
    }
  };

  const checkAndConnect = (valid) => {
    if (
      valid !== "Wallet does not exist" &&
      valid !== undefined &&
      valid !== "" &&
      valid !== null &&
      valid !== "{}"
    ) {
      console.log("YO it WORKING");
      window.location.assign("./Home");
    }
    alert("Wallet does not exist, please enter your existing wallet");
  };

  // when Enter is pressed
  const keyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchAccount();
    }
  };

  // prevent actual form submission
  const preventSubmit = (event) => {
    event.preventDefault();
  };

  // handle input change
  const inputHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="connect-page">
      <header className="app-header">
        <img className="logo" src={Logo} alt="vet logo" />
        <p className="app-title">Vet wallet</p>
      </header>

      <button className="backToSetup" onClick={() => (window.location = "/")}>
        Back
      </button>

      <div className="connect-body">
        <h1>Enter your username</h1>

        <form className="user" onSubmit={preventSubmit}>
          <input
            type="text"
            id="username"
            name="name"
            value={name}
            onChange={inputHandler}
            onKeyDown={keyPress}
          />{" "}
          <br></br>
          <button type="submit" className="unlock" onClick={fetchAccount}>
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
export default ConnectWallet;
