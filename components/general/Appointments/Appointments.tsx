import React, { useEffect, useState } from "react";
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
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useUser } from "components/UserContext";

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
  const [errorMsg, setErrorMsg] = useState("");
  const {user, userLoading} = useUser();
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);

  const handleErrorDialog = () => {
    setErrorDialog(false);
  };
  const handleClose = () => {
    setState({
      ...state,
      openSnackbar: false,
    });
  };

  const getAppointmentData = async ()=>{
    const appoinments = await getDocs(collection(db, `Userdata/${user.uid}/cases`));
    const appointmentsData = appoinments.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setAppointmentsData(appointmentsData);
  }

  useEffect(() => {
    getAppointmentData();
  }, []);
  return (
    <>
      <Dialog
        open={errorDialog}
        onClose={handleErrorDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Try again</DialogTitle>
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
        <Alert variant="filled" severity="success">
          Your slot is booked successfully...
        </Alert>
      </Snackbar>

      <div
        className={`flex flex-row flex-wrap justify-center md:justify-start gap-8 text-[#000] px-8 py-8`}
      >
        {appointmentsData?.map((appointment, index) => {
          return (
            <AppointmentCard
              key={index + 1}
              id = {appointment.id}
              user = {user}
              number={index + 1}
              name={appointment.caseName}
              date={appointment.createdAt.toDate().toDateString()}
              time={appointment.time}
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
