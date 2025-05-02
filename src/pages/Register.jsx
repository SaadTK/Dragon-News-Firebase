import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const [nameErr, setNameErr] = useState("");
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;

    if (name.length < 5) {
      setNameErr("Name Should Be more than 5 Character Long.");
      return;
    } else {
      setNameErr("");
    }

    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(name, photo, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoUrl: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoUrl: photo });
            navigate("/");
          })
          .catch((error) => {
            // console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errCode = error.code;
        const errMessage = error.message;
        alert(errMessage);
        // console.log(errCode);
      });
  };

  return (
    <div>
      <div className=" flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm py-5 shrink-0 shadow-2xl">
          <h2 className="font-semibold text-2xl text-center">
            Register your account
          </h2>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              {/* name  */}
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Name"
                required
              />
              {nameErr && <p className="text-lg text-error">{nameErr}</p>}
              {/* Photo URL  */}
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Photo URL"
                required
              />
              {/* email  */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              {/* password  */}
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                required
              />

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>
              <p className="font-semibold text-center pt-5">
                Already Have an account?
                <Link className="text-secondary" to={"/auth/login"}>
                  <span> Login</span>
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
