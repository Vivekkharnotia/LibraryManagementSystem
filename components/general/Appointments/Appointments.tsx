import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import NewAppointmentCard from "./NewAppointmentCard";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";
const appointmentsData = [
  { number: 1, name: "Dr. Piyush Goyel", time: "", date: "" },
  { number: 2, name: "Dr. Piyush Goyel", time: "", date: "" },
  { number: 3, name: "Dr. Piyush Goyel", time: "", date: "" },
  { number: 4, name: "Dr. Piyush Goyel", time: "", date: "" },
];

const Appointments = () => {
  const [state, setState] = React.useState<{
    openSnackbar: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    openSnackbar: false,
    Transition: Grow,
  });
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleErrorDialog = () => {
    setErrorDialog(false);
  }
  const handleClose = () => {
    setState({
      ...state,
      openSnackbar: false,
    });
  };

  return (
    <>
      <Dialog
        open={errorDialog}
        onClose={handleErrorDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Try again
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialog}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={state.openSnackbar}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        // message="Your slot is booked successfully..."
        key={state.Transition.name}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="success" >Your slot is booked successfully...</Alert>
      </Snackbar>

      <div
        className={`flex flex-row flex-wrap justify-center md:justify-start gap-8 text-[#000] px-8 py-8`}
      >
        {appointmentsData?.map((appointment) => {
          return (
            <AppointmentCard
              key={appointment.number}
              name={appointment.name}
              number={appointment.number}
              setState={setState}
              setErrorDialog={setErrorDialog}
              setErrorMsg={setErrorMsg}
            />
          );
        })}
        <NewAppointmentCard />
      </div>
    </>
  );
};

export default Appointments;
