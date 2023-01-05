//Mit rendelünk pontosan?
//felugró ablak sikeres küldés/sikertelen küldés

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//Jó endpoint?
const fetchAvailableMasksNumber = () => {
  return fetch("/api/stock").then((res) => res.json());
};

//Jó endpoint?
const fetchHospitals = () => {
  return fetch("/api/hospitals").then((res) => res.json());
};

//Jó endpoint?
const placeOrder = (order) => {
  return fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(order),
  }).then((res) => res.json());
};

const Order = () => {
  const [amountOfMasks, setAmountOfMasks] = useState(10000);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState();
  const [orderdAmount, setOrderedAmount] = useState("");
  const [options, setOptions] = useState([]);
  const [optionValue, setOptionValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");

  useEffect(() => {
    fetchAvailableMasksNumber().then((masks) => {
      setAmountOfMasks(masks[0].amount);
    });

    fetchHospitals().then((hospitals) => {
      setOptions([
        { label: "", value: "" },
        ...hospitals.map((hospital) => ({
          label: hospital.name,
          value: hospital._id,
        })),
      ]);
    });
  }, []);

  const handleOrder = () => {
    if (orderdAmount > 0 && orderdAmount < amountOfMasks) {
      setErrorMessage(false);

      const order = {
        name: user,
        hospital: optionValue,
        amount: orderdAmount,
      };

      placeOrder(order).then((res) => {
        setIsOrderSuccess(true);
        setShowConfirmationWindow(true);

        fetchAvailableMasksNumber().then((masks) => {
          setAmountOfMasks(masks[0].amount);
        });

        setOptionValue("");
        setOrderedAmount("");
      });
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div className="orderTable">
      <h1>Order</h1>
      <p>{`You can order maximum ${amountOfMasks} pcs of masks`}</p>
      {errorMessage && (
        <p>{`You have to order at least 1 and maximum ${amountOfMasks} pcs`}</p>
      )}
      <label htmlFor="masks">Amount of Masks: </label>
      <input
        id="masks"
        name="masks"
        type="number"
        min="1"
        max={amountOfMasks}
        value={orderdAmount}
        onChange={(event) => setOrderedAmount(event.target.value)}
      />
      <select
        value={optionValue}
        onChange={(event) => setOptionValue(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button className="btn"
        type="button"
        onClick={() => {
          handleOrder();
        }}
      >
        Send Order
      </button>
      {showConfirmationWindow && (
        <ConfirmationModal
          isSuccess={isOrderSuccess}
          closeModal={() => setShowConfirmationWindow(false)}
        />
      )}
    </div>
  );
};

const ConfirmationModal = ({ isSuccess, closeModal }) => {
  return (
    <div className="backdrop">
      <div className="modal">
        <h3>
          {isSuccess
            ? "Your order was successfully sent"
            : "Unfortunatelly something went wrong, please try again later"}
        </h3>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};

export default Order;
