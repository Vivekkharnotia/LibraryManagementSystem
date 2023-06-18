import { Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import classes from "./SignIn.module.css";
import Login from "./Login";
import SignIn from "./SignIn";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#2e7d32",
    },
    warning: {
      main: "#e65100",
    },
  },
});

const SignInPage = () => {
  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <Paper className={classes.card} elevation={0}>
          <div className={classes.innerBox} id="innerbox">
            <Login />
            <SignIn />
          </div>
        </Paper>
      </ThemeProvider>
    </div>
  );
};
export default SignInPage;
