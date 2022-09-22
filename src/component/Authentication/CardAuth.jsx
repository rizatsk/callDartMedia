import { useState } from "react";

function CardAuth({ fcLogin, msg }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // This function is called when the input username chnage
  const handleChangeUsername = (event) => {
    const enteredName = event.target.value;
    setUsername(enteredName);
  };

  const buttonSingin = (event) => {
    event.preventDefault();
    fcLogin({ username, password });
  };

  return (
    <div className="max-w-[400px] mx-auto mt-10">
      <div className="py-[50px] px-[40px] box-border bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-lg italic capitalize font-semibold text-primary">
            <h2>welcome back</h2>
            <h3 className="text-base">TO SIGN IN</h3>
          </div>
        </div>
        <div className={`${msg ? "my-[20px]" : "my-[30px]"}`}>
          <p className="text-sm block">
            Enter your email/username and password to{" "}
            <span className="italic font-bold text-primary block">sign in</span>
          </p>
        </div>
        <p className="text-sm text-red-600">{msg}</p>
        <div className="card-auth_form">
          <form action="" className="text-sm 2xl:text-base">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="input-form"
                placeholder="Username"
                id="username"
                value={username}
                onChange={handleChangeUsername}
                autoCapitalize="off"
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="auth-password">Password</label>
              <input
                type="password"
                className="input-form"
                placeholder="Password"
                id="auth-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group_btn">
              <button className="btn-primary btn-full" onClick={buttonSingin}>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardAuth;
