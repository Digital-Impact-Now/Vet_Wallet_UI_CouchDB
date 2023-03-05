import React, { useState, useEffect } from "react";
import TxtData from "./TxtData";

const baseURL = process.env.REACT_APP_FABRIC_BASEURL;

function Home() {
  const [Balance, setBalance] = useState();
  const [ID, setID] = useState("");

  sessionStorage.setItem("userBalance", Balance);

  useEffect(() => {
    fetch(baseURL + "GetAccountBalance", {
      method: "POST",
      body: JSON.stringify({
        fabricUserName: sessionStorage.getItem("fabricUserName"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setBalance(json))
      .catch((err) => {
        console.log(err);
      });
  }, [Balance]);

  useEffect(() => {
    fetch(baseURL + "GetID", {
      method: "POST",
      body: JSON.stringify({
        fabricUserName: sessionStorage.getItem("fabricUserName"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        response.text().then(function (text) {
          setID(text);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-home-title">
          <p className="username">{sessionStorage.getItem("fabricUserName")}</p>
          <p className="address">{ID}</p>
        </div>
        <button
          className="account-link"
          onClick={() => (window.location = "./AccountScreen")}
        >
          Account
        </button>
      </header>

      <div className="balance">
        <h2 className="balance-title">Balance:</h2>
        <form className="balance-box">
          <output>
            <p className="balance-amt">{Balance}</p>
          </output>
        </form>
        <button
          className="send-btn"
          onClick={() => (window.location = "./Send")}
        >
          Send →
        </button>
      </div>
      <TxtData />
    </div>
  );
}
export default Home;
