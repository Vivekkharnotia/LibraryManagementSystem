import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import classes from "./SignIn.module.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { iniErrCreateUserState, initialCreateAccData } from "./constants";
import { handleSignUpPage } from "./lib/formHandlers";
import { handleCreateAccount } from "./lib/auth";
import { setCookie } from "cookies-next";
import { useUser } from "components/UserContext";
import { useRouter } from "next/router";

const SignIn = () => {
  const [createAccData, setCreateAccData] = useState(initialCreateAccData);
  const [err, setErr] = useState(iniErrCreateUserState);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { setLoggedIn } = useUser();
  const router = useRouter()

  const handleCreateAccountClick = async () => {
    await handleCreateAccount(
      createAccData,
      setCreateAccData,
      setErr,
      setLoggedIn,
      setCookie,
      router
    );
  };

  return (
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
          value={createAccData.fname}
          onChange={(e) =>
            setCreateAccData({
              ...createAccData,
              fname: e.target.value,
            })
          }
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
          value={createAccData.lname}
          onChange={(e) =>
            setCreateAccData({
              ...createAccData,
              lname: e.target.value,
            })
          }
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
        value={createAccData.email}
        onChange={(e) =>
          setCreateAccData({
            ...createAccData,
            email: e.target.value,
          })
        }
      />

      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          error={err.password_err}
          type={showRegisterPassword ? "text" : "password"}
          id="pswrd"
          value={createAccData.password}
          onChange={(e) =>
            setCreateAccData({
              ...createAccData,
              password: e.target.value,
            })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowRegisterPassword((prev) => !prev)}
                edge="end"
              >
                {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          fullWidth
        />
        {err.password_err && (
          <FormHelperText id="outlined-weight-helper-text" error>
            Password should have atleast 8 characters with atleast one lowercase
            letter and special character
          </FormHelperText>
        )}
      </FormControl>

      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          error={err.cPassword_err}
          type={showCPassword ? "text" : "password"}
          id="cpswd"
          value={createAccData.cPassword}
          onChange={(e) =>
            setCreateAccData({
              ...createAccData,
              cPassword: e.target.value,
            })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowCPassword((prev) => !prev)}
                edge="end"
              >
                {showCPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          fullWidth
        />
        {err.password_err && (
          <FormHelperText id="outlined-weight-helper-text" error>
            Password should have atleast 8 characters with atleast one lowercase
            letter and special character
          </FormHelperText>
        )}
      </FormControl>
      <Button
        sx={{ backgroundColor: "#1565c0!important" }}
        fullWidth
        variant="contained"
        onClick={handleCreateAccountClick}
      >
        Create Account
      </Button>
      <Button
        fullWidth
        color="warning"
        variant="outlined"
        onClick={() => {
          setCreateAccData(initialCreateAccData);
          setErr({
            email_err: false,
            fname_err: false,
            lname_err: false,
            password_err: false,
            cPassword_err: false,
          });
        }}
      >
        Clear
      </Button>
      <div className={classes.switchForm2}>
        <div> Already have an account?</div>
        <Button onClick={handleSignUpPage}>Login</Button>
      </div>
      <div className={classes.terms}>
        By clicking &apos;Create account&apos;, I agree to Reh-A&apos;s TOS and
        privacy policy.
      </div>
    </div>
  );
};

export default SignIn;
