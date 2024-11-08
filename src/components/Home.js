import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

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

  const login = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: state.username,
          password: state.password,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        document.cookie = serialize("loggedIn", "true", {
          maxAge: 60 * 60 * 1000, // 1 hour
          path: '/',
          sameSite: 'strict'
        });
        localStorage.setItem('userId', data.user.id);
        navigate("/menu");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("An error occurred during login");
    }
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

