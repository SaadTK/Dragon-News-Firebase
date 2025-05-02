import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");

  const { signIn } = useContext(AuthContext);

  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errCode = error.code;
        // const errMessage = error.message;
        // alert(errMessage);
        // console.log(errCode);
        setError(errCode);
      });
  };
  return (
    <div className=" flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm py-5 shrink-0 shadow-2xl">
        <h2 className="font-semibold text-2xl text-center">
          Login to your account
        </h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            {/* email  */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* password  */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            {error && <p className="text-red-500 text-lg">{error}</p>}

            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            <p className="font-semibold text-center pt-5">
              Don't Have an account?
              <Link className="text-secondary" to={"/auth/register"}>
                <span> Register</span>
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
