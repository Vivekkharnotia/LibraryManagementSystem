import { Alert, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grow from "@mui/material/Grow";
import Snackbar from "@mui/material/Snackbar";
import { TransitionProps } from "@mui/material/transitions";
import { useUser } from "components/UserContext";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../general/firebase-config";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import NewAppointmentCard from "../NewAppointmentCard/NewAppointmentCard";

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
  const { user, userLoading } = useUser();
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleErrorDialog = () => {
    setErrorDialog(false);
  };
  const handleClose = () => {
    setState({
      ...state,
      openSnackbar: false,
    });
  };

  const getAppointmentData = async () => {
    setLoading(true);
    if (userLoading === "loaded") {
      const appoinments = await getDocs(
        collection(db, `Userdata/${user.uid}/cases`)
      );
      const appointmentsData = appoinments.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setLoading(false);
      setAppointmentsData(appointmentsData);
    }
  };

  useEffect(() => {
    getAppointmentData();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <CircularProgress />
    </div>
  ) : (
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
        className={`flex flex-row flex-wrap justify-center md:justify-start text-[#000] px-5 py-8 gap-y-8`}
      >
        {/* all the appointments of the user */}
        {appointmentsData?.map((appointment, index) => {
          return (
            <AppointmentCard
              key={index + 1}
              id={appointment.id}
              user={user}
              number={index + 1}
              name={appointment.caseName}
              date={appointment.createdAt.toDate().toDateString()}
              numberOfSessions={appointment.numberOfSessions}
              setErrorDialog={setErrorDialog}
              setErrorMsg={setErrorMsg}
              getAppointmentData={getAppointmentData}
            />
          );
        })}

        {/* to create a new appointment */}
        <NewAppointmentCard getAppointmentData={getAppointmentData} />
      </div>
    </>
  );
};

export default Appointments;
