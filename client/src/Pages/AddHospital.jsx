import { useLocation } from "react-router-dom";
//Jó az endpoint?
const postHospital = (hospital) => {
  return fetch("/api/hospital", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(hospital),
  });
};

const AddHospital = () => {
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

    console.log({
      ...inputs,
      users: [user],
    });

    /* postHospital({
      ...inputs,
      users: [user],
    }); */
  };

  return (
    <div>
      <h1>Add new hospital</h1>
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
        <button type="submit">Add new hospital</button>
      </form>
    </div>
  );
};

export default AddHospital;
