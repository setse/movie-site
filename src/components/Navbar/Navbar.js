import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
//import { useEffect, useState } from "react";

import { GETUSER } from "../../queries/index";

import classes from "./navbar.module.scss";

const Navbar = (props) => {
  const isLoggedIn = localStorage.getItem("token") !== null;

  const userdata = useQuery(GETUSER).data;

  let name = "guest";

  // const [username, setUsername] = useState("name");

  // TODO: Fix this! >>> Fixed but i dont know if that was a bad fix
  // I don't understand why the state method didn't work here so I used another aproach
  if (userdata) {
    //setUsername(userdata.currentUser.username);
    name = userdata.currentUser.username;
    console.log("username: " + name); //checking if the username is matching
  }

  return (
    <div className={classes.nav}>
      <div className={classes.logo}>
        <Link to={"/main"}>
          <h1>Movie App</h1>
        </Link>
      </div>
      <div className={classes.userprofile}>
        <h5>Hello, {name} 😄 </h5>
        {isLoggedIn ? (
          <div className={classes.links}>
            <NavLink to="/mymovies">
              <button>My Movies</button>
            </NavLink>
            <NavLink to="/addmovie">
              <button>Add Movie</button>
            </NavLink>
            <NavLink to="/">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Log Out
              </button>
            </NavLink>
          </div>
        ) : (
          <div className={classes.links}>
            <NavLink to="/auth">
              <button>Log In</button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
