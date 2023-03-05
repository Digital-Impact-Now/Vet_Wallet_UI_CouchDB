import React, { useEffect, useState } from "react";

function TxtData() {
  const [txData, setTxData] = useState([]);
  const [userArr, setUserArr] = useState([]);

  useEffect(() => {
    fetch("/express_backend")
      .then((res) => res.text())
      .then((data) => {
        setTxData(data);

        const stringJSON = JSON.stringify(data);

        const cleanedJSON = cleanRawData(stringJSON);
        const objArr = buildArray(cleanedJSON);

        const userArray = objArr.filter(
          (tx) => tx.value.name === sessionStorage.getItem("fabricUserName")
        );
        setUserArr(userArray);

        //Log object array
        console.log("obj" + objArr);
        console.log("usr:" + userArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cleanRawData = (stringJSON) => {
    //Import JSON string

    console.log("raw: " + stringJSON);

    //Remove invalid characters & transactions text
    let cleanedJSON = stringJSON.replace(/\n|\r/g, "");
    cleanedJSON = cleanedJSON.replaceAll("\\", "");
    cleanedJSON = cleanedJSON.replace('"{"transactions":[', "");
    cleanedJSON = cleanedJSON.slice(0, -3);
    return cleanedJSON;
  };

  const buildArray = (cleanedJSON) => {
    //Innitialize JSON to object variables
    const objArray = [];
    let jsonObj;
    let obj;

    while ((cleanedJSON.match(/id/g) || []).length > 2) {
      //Parse JSON to object
      jsonObj = cleanedJSON.substr(0, cleanedJSON.indexOf(',{"id":'));

      //Push object to array
      try {
        obj = JSON.parse(jsonObj);
        objArray.push(obj);
      } catch (error) {
        console.error(error);
      }

      //Remove pushed object from JSON txt
      cleanedJSON = cleanedJSON.replace(",", "");
      cleanedJSON = cleanedJSON.substring(jsonObj.length);
      console.log("cleaned: " + cleanedJSON);
    }

    //Push object to array
    try {
      obj = JSON.parse(cleanedJSON);
      objArray.push(obj);
    } catch (error) {
      console.error(error);
    }

    return objArray;
  };

  return (
    <div>
      <div className="tx-wrapper">
        {userArr.map((tx, i) => (
          <div key={i}>
            {
              <div className="tx-box">
                <h2 className="tx-type"> EBT purchase </h2>
                <p className="tx-date"> {tx.value.timestamp} </p>
                <p className="tx-loc"> {tx.value.location} </p>
                <p className="tx-amount"> $ {tx.value.price} </p>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default TxtData;
