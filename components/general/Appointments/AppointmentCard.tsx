import { Button, Modal } from "@mui/material";
import React, { FC, useState } from "react";
import Image from "next/image";
import appoinmentcss from "./Appoinments.module.css";
import qrSample from "./qrSample.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SlotBooking from './SlotBooking/SlotBooking.js';

interface AppointmentCardProps {
  number: number;
  name: string;
  time?: string;
  date?: string;
  setState: any;
  setErrorDialog: any;
  setErrorMsg:any;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  number,
  name,
  time,
  date,
  setState,
  setErrorDialog,
  setErrorMsg,
}) => {
  const [open, setOpen] = React.useState(false);
  const [slot, setSlot] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buy, setBuy] = useState(false);
  const toggleBuy = () => setBuy((prev) => !prev);
  const toggleSlot = () => setSlot((prev) => !prev);

  const handleCopy = () => {
    navigator.clipboard.writeText("sampelupiid@oksbi");
  };
  return (
    <>
      <div className="flex flex-col w-[240px] h-[270px] border-[1px] border-[#000] rounded-[15px] cursor-pointer px-5 py-5 relative justify-items-start">
        <div onClick={handleOpen}>
          <div>
            <span className="text-[24px] mr-2">{number}.</span>
            <span className="">{name}</span>
          </div>
          <div
            className="bg-[#000] h-[5px] w-full mb-3"
            style={{ opacity: "0" }}
          />
          <span className="font-medium mb-5">Time: {time || "12:00 am"}</span>
          <div
            className="bg-[#000] h-[5px] w-full mb-3"
            style={{ opacity: "0" }}
          />
          <span className="font-light">Appointment at: </span>
          <span className="font-light">{date || "2nd of January, 2023"}</span>
          <Image
            src="/appointmentCardBg.svg"
            alt="Three rows of three dots"
            width={60}
            height={60}
            className="absolute bottom-5 right-5"
          />
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e9ab02", marginTop: "10px" }}
          onClick={toggleBuy}
        >
          Buy sessions
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e9ab02", marginTop: "10px" }}
          onClick={toggleSlot}
        >
          Book Slots
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[80%] bg-[#fff] m-auto"></div>
      </Modal>

      <Modal
        open={buy}
        onClose={toggleBuy}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className={`${appoinmentcss.container} absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px bg-[#fff] m-auto`}
        >
          <div className={appoinmentcss.name}>R-A</div>
          <div className={appoinmentcss.title}>Scan this code for payment</div>
          <div>
            <Image
              width={150}
              height={150}
              alt="img not found"
              src={qrSample}
              className={appoinmentcss.qrcode}
            />
          </div>
          <div style={{ display: "flex", marginTop: "40px" }}>
            <div>UPI ID : sample384983@oksbi &nbsp;&nbsp;</div>
            <ContentCopyIcon
              fontSize="small"
              onClick={handleCopy}
              sx={{ width: "max-content" }}
              className={appoinmentcss.copyIcn}
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={slot}
        onClose={toggleSlot}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[97%] bg-[#fff] m-auto sm:w-[80%]">
          <SlotBooking setErrorMsg={setErrorMsg} setErrorDialog={setErrorDialog} setState={setState} setSlot = {setSlot}/>
            
        </div>
      </Modal>
    </>
  );
};

export default AppointmentCard;
