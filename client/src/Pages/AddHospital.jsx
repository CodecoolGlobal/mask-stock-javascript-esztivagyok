import { useState } from "react";
import { useLocation } from "react-router-dom";
//Jó az endpoint?
const postHospital = (hospital) => {
  return fetch("/api/hospitals", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(hospital),
  });
};

const AddHospital = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const entries = [...formData.entries()];

    const inputs = entries.reduce((inputsObject, [key, value]) => {
      inputsObject[key] = value;
      return inputsObject;
    }, {});

    const hospital = {
      ...inputs,
      users: [user],
    };

    if (
      hospital.name !== "" &&
      hospital.city !== "" &&
      hospital.country !== ""
    ) {
      setErrorMessage(false);
      postHospital(hospital).then(() => {
        event.target.reset();
        setResponseMessage(true);
        setTimeout(() => {
          setResponseMessage(false);
        }, 3000);
      });
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div  className="addHospital">
      <h1>Add new hospital</h1>
      {errorMessage && <p>All inputfield must be filled out</p>}
      {responseMessage && <p>Hospital added</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Hospital name: </label>
        <input id="name" name="name" />
        <br />
        <label htmlFor="city">City: </label>
        <input id="city" name="city" />
        <br />
        <label htmlFor="country">Country: </label>
        <input id="country" name="country" />
        <br />
        <button className="btn" type="submit">Add new hospital</button>
      </form>
    </div>
  );
};

export default AddHospital;
