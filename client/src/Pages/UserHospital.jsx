import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

//Jó endpoint?
const fetchHospitals = () => {
  return fetch("/api/hospital").then((res) => res.json());
};

const UserHospital = () => {
  const [hospitals, setHospitals] = useState([
    {
      _id: "1",
      name: "hospitalname",
      city: "cityname",
      country: "countryname",
      users: ["egy", "ketto"],
    },
    {
      _id: "2",
      name: "hospitalname2",
      city: "cityname2",
      country: "countryname2",
      users: ["egy", "ketto"],
    },
    {
      _id: "3",
      name: "hospitalname",
      city: "cityname",
      country: "countryname",
      users: ["ketto"],
    },
  ]);

  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");

  useEffect(() => {
    /* fetchHospitals().then((hosps) => {
      setHospitals(hosps);
    }); */

    setFilteredHospitals(
      hospitals.filter((hospital) => hospital.users.includes(user))
    );
  }, []);

  return (
    <div>
      <h1>My Hospitals</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitals.map((hospital) => (
            <tr key={hospital._id}>
              <td>{hospital.name}</td>
              <td>{hospital.city}</td>
              <td>{hospital.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHospital;
