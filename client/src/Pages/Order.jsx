//Mit rendelünk pontosan?
//felugró ablak sikeres küldés/sikertelen küldés

import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Jó endpoint?
const fetchAvailableMasksNumber = () => {
  return fetch("/api/stock").then((res) => res.json());
};

//Jó endpoint?
const fetchHospitals = () => {
  return fetch("/api/hospital").then((res) => res.json());
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
  const [orderdAmount, setOrderedAmount] = useState(2);
  const [options, setOptions] = useState([
    { label: "", value: "" },
    { label: "hospital1", value: "1" },
    { label: "hospital2", value: "2" },
    { label: "hospital3", value: "3" },
  ]);
  const [optionValue, setOptionValue] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");

  /* useEffect(() => {
    fetchAvailableMasksNumber().then((masks) => {
      setAmountOfMasks(masks);
    });

    fetchHospitals().then((hospitals) => {
      setOptions(
        { label: "", value: "" },
        ...hospitals.map((hospital) => ({
          label: hospital.name,
          value: hospital._id,
        }))
      );
    });
  }, []); */

  const handleOrder = () => {
    const order = {
      user: user,
      hospital: optionValue,
      amount: orderdAmount,
    };

    placeOrder(order).then((res) => {
      setIsOrderSuccess(true);
      setShowConfirmationWindow(true);
    });
  };

  return (
    <div>
      <h1>Order</h1>
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
      <button
        type="button"
        onClick={() => {
          /* handleOrder(); */
          setShowConfirmationWindow(true);
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
        <h1>
          {isSuccess
            ? "Your order was successfully sent"
            : "Unfortunatelly something went wrong, please try again later"}
        </h1>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
};

export default Order;
