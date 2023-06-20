import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUser } from "components/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import GPBackdrop from "../GeneralPurpose/GPBackdrop";
import GPDialog from "../GeneralPurpose/GPDialog";
import GPSnackbar from "../GeneralPurpose/GPSnackbar";
import { db } from "../firebase-config";
import AppointmentCard from "./AppointmentCard";
import NewAppointmentCard from "./NewAppointmentCard";

const Appointments = () => {
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { user, userLoading } = useUser();
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cardDeleteLoading, setCardDeleteLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogProps, setDialogProps] = useState<any>({});

  const handleErrorDialog = () => {
    setErrorDialog(false);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "2.5rem",
          marginLeft: "2rem",
          "@media (max-width: 786px)": {
            marginLeft: "0",
            justifyContent: "center",
          },
        }}
      >
        {appointmentsData?.map((appointment, index) => {
          const dateString = appointment.createdAt.toDate().toDateString().split(" ");
          const date = `${dateString[1]} ${dateString[2]}, ${dateString[3]}`;

          return (
            <AppointmentCard
              key={index + 1}
              id={appointment.id}
              user={user}
              number={index + 1}
              name={appointment.caseName}
              date={date}
              numberOfSessions={appointment.numberOfSessions}
              setErrorDialog={setErrorDialog}
              setErrorMsg={setErrorMsg}
              getAppointmentData={getAppointmentData}
              setCardDeleteLoading={setCardDeleteLoading}
              setSnackbarMessage={setSnackbarMessage}
              setDialogProps={setDialogProps}
            />
          );
        })}
        <NewAppointmentCard getAppointmentData={getAppointmentData} />
      </Box>

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

      <GPBackdrop loading={cardDeleteLoading} message="Deleting..." />
      <GPSnackbar message={snackbarMessage} />
      <GPDialog
        open={dialogProps.open}
        setOpen={dialogProps.handleClose}
        title={dialogProps.title}
        contentText={dialogProps.contentText}
        buttons={[
          {
            text: "Cancel",
            onClick: dialogProps.handleClose,
          },
          {
            text: "Delete",
            onClick: dialogProps.primaryAction,
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default Appointments;
