import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grow from "@mui/material/Grow";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { db } from "components/general/firebase-config.js";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { timeMiner } from "utils/ExtendedUtils";
import calander from "../../../../public/calander.png";
import { useUser } from "../../../UserContext";
import slotcss from "./SlotBooking.module.css";

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function SlotBooking({
  id,
  setSlot,
  setState,
  setErrorDialog,
  setErrorMsg,
}) {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [date, setDate] = useState("");
  const [allSlots, setAllSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleClick = (Transition) => async () => {
    const result = await handleSelectSlot();
    if (result === "Success") {
      try {
        const refDoc = doc(db, `Userdata/${user.uid}/cases`, id);
        const findDoc = await getDoc(refDoc);

        if (findDoc.exists()) {
          const data = findDoc.data();
          const slot = data.slot || "";

          if (slot === `${date} ${selectedSlot}`) {
            setErrorMsg("You have already booked this slot");
            setErrorDialog(true);
            return;
          }
          else if(slot !== "") {
            setErrorMsg("You have already booked one slot. You cannot book two slots at a time");
            setErrorDialog(true);
            return;
          }
          
          await updateDoc(refDoc, {
            slot: `${date} ${selectedSlot}` 
          });

        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.log(error);
      }
      setState({
        openSnackbar: true,
        Transition,
      });
    } else {
      setErrorMsg(result);
      setErrorDialog(true);
    }
  };

  const handleChange = async (e) => {
    setLoading(true);
    if (e == null) {
      setDate("");
      return;
    }
    const currdate = `${e.$D}-${e.$M + 1}-${e.$y}`;
    setDate(currdate);
    const refDoc = doc(db, "Slots", currdate);
    const findDoc = await getDoc(refDoc);
    if (findDoc.exists()) {
      const slots = findDoc.data();
      setAllSlots(slots.slots);
      setLoading(false);
    } else {
      console.log("Document not found");
      setAllSlots(["#"]);
      setLoading(false);
    }
  };

  const handleSelectSlot = async () => {
    const refDoc = doc(db, "Slots", date);
    let findDoc;
    try {
      findDoc = await getDoc(refDoc);
    } catch (error) {
      console.log(error);
      setOpen(false);
      setSlot(false);
      return "Some problem occured.. please try again";
    }
    if (!findDoc.exists()) {
      setOpen(false);
      setSlot(false);
      return "Some problem occured.. please try again";
    }
    const docFound = findDoc.data().slots;

    const oldSlots = docFound;
    let newSlots = [];
    let slotFound = 0;
    for (let i = 0; i < oldSlots.length; i++) {
      let slotArr = oldSlots[i].split(" ");
      if (selectedSlot === slotArr[0]) {
        slotFound = 1;
        let capacity = parseInt(slotArr[1]);
        capacity -= 1;
        if (capacity !== 0) {
          newSlots.push(`${slotArr[0]} ${capacity}`);
        }
      } else {
        newSlots.push(oldSlots[i]);
      }
    }
    if (slotFound === 0) {
      setOpen(false);
      setSlot(false);
      return "Somebody booked the selected slot just before you. Please select another slot...";
    }
    try {
      await updateDoc(refDoc, {
        slots: [...newSlots],
      });
      if (newSlots.length === 0) {
        deleteDoc(refDoc);
      }
      console.log("handle Click start");
      setOpen(false);
      setSlot(false);

      return "Success";
    } catch (error) {
      console.log(error);
      setOpen(false);
      setSlot(false);
      return "Sorry... falied to book your slot";
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to book this slot?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Slot will be scheduled on {date} between{" "}
            {selectedSlot + " " + timeMiner(selectedSlot)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="warning">
            No
          </Button>
          <Button onClick={handleClick(GrowTransition)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <div
        style={{ height: "100%", width: "100%", color: "black" }}
        className={slotcss.container}
      >
        <div
          style={{
            justifyContent: "center",
          }}
          className={slotcss.innerContainer}
        >
          <div className={slotcss.left}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                className={slotcss.horizontalCalander}
                orientation="landscape"
                onChange={handleChange}
              />
              <StaticDatePicker
                className={slotcss.varticalCalander}
                sx={{ width: "150px" }}
                orientation="portrait"
                onChange={handleChange}
              />
            </LocalizationProvider>
          </div>
          <div className={slotcss.right}>
            <div className={slotcss.title}>Select slots</div>
            {loading && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            )}
            {allSlots.length === 0 && loading === false && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  width={250}
                  height={250}
                  style={{ marginTop: "2rem" }}
                  src={calander}
                />
                <div
                  style={{ color: "rgb(135, 135, 135)", fontSize: "1.5rem" }}
                >
                  Select slot
                </div>
              </div>
            )}
            {allSlots.length !== 0 &&
              allSlots[0] === "#" &&
              loading === false && (
                <div className={slotcss.noSlots}>No slots found</div>
              )}
            {allSlots.length !== 0 &&
              allSlots[0] !== "#" &&
              loading === false && (
                <div className={slotcss.slotBox}>
                  {allSlots.map((slot, index) => {
                    let slotArr = slot.split(" ");
                    return (
                      <Badge
                        className={slotcss.slotBtn}
                        key={`slotBtn_${index}`}
                        badgeContent={slotArr[1]}
                        color="primary"
                      >
                        <Button
                          onClick={() => {
                            handleClickOpen();
                            setSelectedSlot(slotArr[0]);
                          }}
                          style={{
                            width: "100%",
                            border: "1px solid blue",
                            borderRadius: "10px",
                            fontSize: "1.2rem",
                          }}
                        >
                          {slotArr[0]}
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
