import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import userIcon from "../assets/user.png";
import { AuthContext } from "../provider/AuthProvider";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const hadleLogout = () => {
    logOut()
      .then(() => {
        alert(`user logged out successfully.`);
      })
      .catch((error) => {
        const errCode = error.code;
        const errMessage = error.message;
        alert(errMessage,errCode);
        // console.log(errCode);
      
      });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="">{user && user.email}</div>
      <div className="nav flex gap-5 text-accent">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/career">Career</NavLink>
      </div>
      <div className="login-btn flex gap-5">
        <img src={userIcon} alt="" />

        {user ? (
          <button onClick={hadleLogout} className="btn btn-primary px-10 ">
            Logout
          </button>
        ) : (
          <Link to={"/auth/login"} className="btn btn-primary px-10 ">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
