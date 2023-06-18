import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import classes from "./SignIn.module.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { initialLoginData } from "./constants";
import { handleLoginPage } from "./lib/formHandlers";
import { handleLogin } from "./lib/auth";
import { setCookie } from "cookies-next";
import { useUser } from "components/UserContext";
import { useRouter } from "next/router";

const Login = () => {
  const [loginData, setLoginData] = useState(initialLoginData);
  const [loginEmailErr, setLoginEmailErr] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const { setLoggedIn } = useUser();
  const router = useRouter()

  const handleLoginClick = async () => {
    await handleLogin(
      loginData,
      setLoginEmailErr,
      setLoginData,
      setLoggedIn,
      setCookie,
      router
    );
  };

  return (
    <div className={classes.cardFront}>
      <div className={classes.title}>Login</div>
      <TextField
        label="Email ID"
        error={loginEmailErr}
        helperText={loginEmailErr && "Invalid Email!"}
        color="primary"
        variant="outlined"
        type="email"
        fullWidth
        id="email"
        sx={{ borderRadius: "10px" }}
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />

      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={showLoginPassword ? "text" : "password"}
          id="pswd"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowLoginPassword((prev) => !prev)}
                edge="end"
              >
                {showLoginPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          fullWidth
        />
      </FormControl>

      <div className={classes.forgotPswd}>
        <Button color="primary">Forgot Password?</Button>
      </div>
      <div className={classes.remember}>
        <FormControlLabel
          control={<Switch color="info" />}
          label="Remember me for a month"
        />
      </div>
      <Button
        sx={{ backgroundColor: "#1565c0!important" }}
        fullWidth
        variant="contained"
        onClick={handleLoginClick}
      >
        Login
      </Button>
      <Button
        fullWidth
        color="warning"
        variant="outlined"
        onClick={() => setLoginData(initialLoginData)}
      >
        Clear
      </Button>
      <div className={classes.switchForm1}>
        <div>Don&apos;t Have an account yet?</div>
        <Button color="primary" onClick={handleLoginPage}>
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default Login;
