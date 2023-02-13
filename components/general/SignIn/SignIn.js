import {
  Paper,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  handleClear,
  handleClear2
} from "./SigninFunctions.js";
import classes from "./SignIn.module.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#2e7d32',
    },
    warning:{
      main : '#e65100',
    }
  },
});

function SignIn() {
  const iniErrState = {
    email_err: false,
    fname_err: false,
    lname_err: false,
    password_err: false,
    cPassword_err: false,
  };
  const [err, setErr] = useState(iniErrState);
  function handleLogin() {
    let inBox = document.getElementById("innerbox");
    inBox.style.transform = "rotateY(-180deg)";
    inBox.style.transformStyle = "preserve-3d";
  }
  function handleSignUp() {
    let inBox = document.getElementById("innerbox");
    inBox.style.transform = "rotateY(0deg)";
    inBox.style.transformStyle = "preserve-3d";
  }
  function handleCreateAccount() {
    const res_fname = validateName(document.getElementById("fname").value);
    setErr((currState) => {
      return { ...currState, fname_err: !res_fname };
    });

    const res_lname = validateName(document.getElementById("lname").value);
    setErr((currState) => {
      return { ...currState, lname_err: !res_lname };
    });

    const res_mail = validateEmail(document.getElementById("mail").value);
    setErr((currState) => {
      return { ...currState, email_err: !res_mail };
    });

    const res_password = validatePassword(
      document.getElementById("pswrd").value
    );
    console.log(document.getElementById("pswrd").value, "here we go");
    setErr((currState) => {
      return { ...currState, password_err: !res_password };
    });

    const res_cPassword = validateConfirmPassword(
      document.getElementById("pswrd").value,
      document.getElementById("cpswd").value
    );
    setErr((currState) => {
      return { ...currState, cPassword_err: !res_cPassword };
    });
  }

  return (
    <>
      <div className={classes.container}>
        <ThemeProvider theme={theme}>
          <Paper className={classes.card} elevation={0}>
            <div className={classes.innerBox} id="innerbox">
              <div className={classes.cardFront}>
                <div className={classes.title} >Login</div>
                <TextField
                  label="Email ID"
                  error={false}
                  color="primary"
                  variant="outlined"
                  type="email"
                  fullWidth
                  id="email"
                  sx={{borderRadius: "10px"}}
                />

                <TextField
                  label="Password"
                  error={false}
                  color="primary"
                  variant="outlined"
                  type="password"
                  fullWidth
                  id="pswd"
                />

                <div className={classes.forgotPswd}>
                  <Button color='primary'>Forgot Password?</Button>
                </div>
                <div className={classes.remember}>
                  <FormControlLabel
                    control={<Switch color="info" />}
                    label="Remember me for a month"
                  />
                </div>
                <Button fullWidth variant="contained">
                  Login
                </Button>
                <Button fullWidth color="warning" variant="outlined" onClick={handleClear}>
                  Clear
                </Button>
                <div className={classes.switchForm1}>
                  <div>Don't Have an account yet?</div>
                  <Button color="primary" onClick={handleLogin}>
                    Create Account
                  </Button>
                </div>
              </div>
              <div className={classes.cardBack}>
                <div className={classes.title}>New User</div>
                <div className={classes.name}>
                  <TextField
                    required
                    label="First Name"
                    error={err.fname_err}
                    helperText={err.fname_err ? "Only letters allowed" : ""}
                    color="primary"
                    variant="outlined"
                    type="text"
                    sx={{ width: "47%" }}
                    id="fname"
                  />
                  <TextField
                    required
                    label="Last Name"
                    error={err.lname_err}
                    helperText={err.fname_err ? "Only letters allowed" : ""}
                    color="primary"
                    variant="outlined"
                    type="text"
                    sx={{ width: "47%" }}
                    id="lname"
                  />
                </div>
                <TextField
                  required
                  label="Email ID"
                  error={err.email_err}
                  helperText={err.fname_err ? "Incorrect email" : ""}
                  color="primary"
                  variant="outlined"
                  type="email"
                  fullWidth
                  id="mail"
                />
                <TextField
                  required
                  label="Password"
                  error={err.password_err}
                  helperText={err.password_err ? "Password should have atleast 8 characters with atleast one lowercase letter and special character" : ''}
                  color="primary"
                  variant="outlined"
                  type="password"
                  fullWidth
                  id="pswrd"
                />
                <TextField
                  required
                  label="Confirm Password"
                  error={err.cPassword_err}
                  helperText={
                    err.cPassword_err ? "Passwords are not matching" : ""
                  }
                  color="primary"
                  variant="outlined"
                  type="password"
                  fullWidth
                  id="cpswd"
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCreateAccount}
                >
                  Create Account
                </Button>
                <Button fullWidth color="warning" variant="outlined" onClick={() => handleClear2(setErr)}>
                  Clear
                </Button>
                <div className={classes.switchForm2}>
                  <div> Already have an account?</div>
                  <Button onClick={handleSignUp}>Login</Button>
                </div>
                <div className={classes.terms}>
                  By clicking 'Create account', I agree to Reh-A's TOS and
                  privacy policy.
                </div>
              </div>
            </div>
          </Paper>
        </ThemeProvider>
      </div>
    </>
  );
}
export default SignIn;
