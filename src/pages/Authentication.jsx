import React from "react";
import users from "../data/users";
import { useState } from "react";
import CardAuth from "../component/Authentication/CardAuth";

function Authentication() {
  const [msg, setMsg] = useState("");

  async function Login({ username, password }) {
    let response;
    if (username === users.username && password === users.password) {
      response = {
        status: "success",
        token:
          "9b352eca86cfa6e96aa7fd85fcfad08b2db556ede7b5e74a3890094b0c4ccc1838cb178eb4f0bf2789f2226bfaba700a04ee9b33ac856a5634018d03a753c836",
      };
    } else {
      response = {
        status: "failed",
        message: "Username atau password salah !",
      };
    }
    if (response.status === "success") {
      const expires = `expires = Fri, 31 Dec 9999 23:59:59 GMT`;
      document.cookie = `token=${response.token};${expires};path=/`;
      window.location.reload();
    } else {
      setMsg(response.message);
    }
  }

  return (
    <div className="container">
      <div className="bg-gray-100 -z-10 absolute top-0 left-0 w-full h-full"></div>
      <CardAuth fcLogin={Login} msg={msg} />
    </div>
  );
}

export default Authentication;
