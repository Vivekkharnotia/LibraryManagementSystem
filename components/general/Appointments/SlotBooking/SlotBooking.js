import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import slotcss from "./SlotBooking.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { db } from "components/general/firebase-config.js";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import calander from "../../../../public/calander.png";
import CircularProgress from "@mui/material/CircularProgress";
import Grow from "@mui/material/Grow";
import { useUser } from "../../../UserContext";

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function SlotBooking({
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
        const refDoc = doc(db, "Userdata", user.uid);
        const findDoc = await getDoc(refDoc);
        if (findDoc.exists()) {
          const data = findDoc.data();
          console.log(data);
          const slots = data.slots || [];
          let slotPresent = 0;
          for (let i = 0; i < slots.length; i++) {
            if (slots[i] === `${date} ${selectedSlot}`) {
              slotPresent = 1;
              break;
            }
          }
          if (slotPresent === 1) {
            setErrorMsg("You have already booked this slot");
            setErrorDialog(true);
            return;
          }
          slots.push(`${date} ${selectedSlot}`);
          await updateDoc(refDoc, {
            slots: [...slots],
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
    console.log(e);
    const currdate = `${e.$D}-${e.$M + 1}-${e.$y}`;
    setDate(currdate);
    console.log(currdate);
    const refDoc = doc(db, "Slots", currdate);
    const findDoc = await getDoc(refDoc);
    if (findDoc.exists()) {
      const slots = findDoc.data();
      console.log(slots.slots);
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

  const timeMiner = (time) => {
    time = time.split(":");
    time = parseInt(time[0]);

    if (time >= 5 && time < 12) return "at morning";
    else if (time >= 12 && time < 4) return "at afternoon";
    else return "at evening";
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
