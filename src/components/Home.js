import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import cookie from "cookie";
import { serialize } from "cookie";

const Home = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const login = (e) => {
    e.preventDefault();
    document.cookie = serialize("loggedIn", "true", { maxAge: 1000 * 60 });
    // document.cookie = "loggedIn=true;max-age=5"
    // set cookie here
    // set loggedIn = true and max-age = 60*1000 (one minute)

    navigate("/");
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={login}>
          <TextField
            required
            onChange={handleTextChange}
            value={state.username}
            name="username"
            label="Username"
            type="text"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.password}
            name="password"
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Home;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, CardContent, CardActions, Divider } from '@mui/material';

// const Home = () => {
//     return (
//         <Card>
//             <CardContent>
//                 <h1>this is the home.js component</h1>
//             </CardContent>
//         </Card>
//     );
// };

// export default Home;

// first page the user sees. welcome message + login button. this is the only page that does not have a menu bar at the top showing main menu / log out.