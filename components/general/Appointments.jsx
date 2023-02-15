import React from "react";
import { BsPlus } from "react-icons/bs";
import { Modal } from "@mui/material";

const appointmentsData = [
  { number: 1, name: "Dr. Piyush Goyel", time: "", date: "" },
  { number: 2, name: "Dr. Piyush Goyel", time: "", date: "" },
];

const AppointmentCard = ({ number, name, time, date }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className="flex flex-col w-[240px] h-[180px] border-[1px] border-[#000] rounded-[15px] cursor-pointer px-5 py-5 relative justify-self-center md:justify-self-auto"
        onClick={handleOpen}
      >
        <div>
          <span className="text-[24px] mr-2">{number}.</span>
          <span className="">{name}</span>
        </div>
        <div className="bg-[#000] h-[10px] w-full mb-3" />
        <span className="font-medium mb-5">Time: {time || "12:00 am"}</span>
        <span className="font-light">Appointment at: </span>
        <span className="font-light">{date || "2nd of January, 2023"}</span>
        <img
          src="/appointmentCardBg.svg"
          alt="Three rows of three dots"
          className="w-[60px] h-[60px] absolute bottom-5 right-5"
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[80%] bg-[#fff] m-auto"></div>
      </Modal>
    </>
  );
};

const NewAppointmentCard = () => {
  const [newOpen, setNewOpen] = React.useState(false);
  const handleNewOpen = () => setNewOpen(true);
  const handleNewClose = () => setNewOpen(false);

  return (
    <>
      <div
        className="flex flex-row items-center justify-center max-w-[240px] h-[180px] border-[1px] border-dashed border-[#000] rounded-[15px] cursor-pointer justify-self-center w-full md:justify-self-auto"
        onClick={handleNewOpen}
      >
        <BsPlus className="w-8 h-8" />
      </div>
      <Modal
        open={newOpen}
        onClose={handleNewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[80%] bg-[#fff] m-auto"></div>
      </Modal>
    </>
  );
};

const Appointments = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#000] px-8 py-8">
      {appointmentsData?.map((appointment) => {
        return (
          <AppointmentCard
            key={appointment.number}
            name={appointment.name}
            number={appointment.number}
          />
        );
      })}
      <NewAppointmentCard />
    </div>
  );
};

export default Appointments;
