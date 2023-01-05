const { useState, useEffect } = require("react");

const fetchOrders = () => {
  return fetch("/api/orders").then((res) => res.json());
};

const fetchHospitals = () => {
  return fetch("/api/hospitals").then((res) => res.json());
};

const Orderlist = () => {
  const [hospitals, setHospitals] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then((datas) => {
      setOrders(datas);
      console.log(datas);
    });

    fetchHospitals().then((datas) => {
      setHospitals(datas);
      console.log(datas);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Hospital</th>
          <th>Orderd Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.name}</td>
            <td>
              {
                hospitals.filter(
                  (hospital) => hospital._id === order.hospital
                )[0]?.name
              }
            </td>
            <td>{order.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orderlist;
