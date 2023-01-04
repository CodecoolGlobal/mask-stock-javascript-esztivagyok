import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const fetchHospitals = () => {
  return fetch("/api/hospitals").then((res) => res.json());
};

const UserHospital = () => {
  const [hospitals, setHospitals] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");

  useEffect(() => {
    fetchHospitals().then((hosps) => {
      setHospitals(hosps.filter((hosp) => hosp.users.includes(user)));
    });
  }, [user]);

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
          {hospitals.map((hospital) => (
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
