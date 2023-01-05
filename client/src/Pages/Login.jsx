import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mask from "../mask.png";

//get all users
const fetchUsers = () => {
  return fetch("/api/users").then((res) => res.json());
};

const Login = () => {
  const [users, setUsers] = useState();
  const [loginValue, setLoginValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleMockLogin = () => {
    const userNames = users.map((user) => user.name);
    if (userNames.indexOf(loginValue) !== -1) {
      navigate(`/order/?user=${loginValue}`);
    }
  };

  return (
    <>
    <div className="welcomeBox">
      <p className="welcomeText">Welcome Visitor, please use your login to access our system.</p>
    </div>
    <div className="userBox">
      <label htmlFor="userName">Username: </label>
      <input className="userInput"
        name="userName"
        id="userName"
        value={loginValue}
        onChange={(event) => setLoginValue(event.target.value)}
      />
      <button className="btn" onClick={handleMockLogin}>Login</button>
      </div>
     <img className="mask" alt="mask" src={mask}/>
     </>
  );
};

export default Login;
