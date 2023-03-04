import React, { useState, useEffect } from "react";
import Logo from "../logo2.png";

const baseURL = process.env.REACT_APP_FABRIC_BASEURL;

function ConnectWallet() {
  const [name, setName] = useState("");
  sessionStorage.setItem("fabricUserName", name);

  async function checkAndConnect() {
    let fabricResponse = await fetch(baseURL + "GetAccountBalance", {
      method: "POST",
      body: JSON.stringify({
        fabricUserName: sessionStorage.getItem("fabricUserName"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let validAccount = await fabricResponse.text();

    console.log(sessionStorage.getItem("fabricUserName"));
    // console.log(validAccount);
    if (validAccount === "Wallet does not exist") {
      alert("Wallet does not exist, please enter your existing wallet");
      return;
    }
    window.location.assign("./Home");
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        checkAndConnect();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  //   let fabricResponse = useEffect(() => {
  //     fetch(baseURL + "GetAccountBalance", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         fabricUserName: sessionStorage.getItem("fabricUserName"),
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     });
  //   }, []);

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
        <form className="user">
          <input
            type="text"
            id="username"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <br></br>
        </form>

        <button className="unlock" onClick={checkAndConnect}>
          Unlock
        </button>
      </div>

      {/* <h2 className="seedphrase-link" onClick={() => window.location = './SeedPhrase'}> import using private key</h2> */}
    </div>
  );
}
export default ConnectWallet;
