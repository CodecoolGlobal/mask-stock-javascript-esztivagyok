import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <label htmlFor="userName">User name: </label>
      <input
        name="userName"
        id="userName"
        value={loginValue}
        onChange={(event) => setLoginValue(event.target.value)}
      />
      <button onClick={handleMockLogin}>Login</button>
    </div>
  );
};

export default Login;
