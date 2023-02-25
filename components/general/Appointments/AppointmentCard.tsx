import { Modal } from '@mui/material';
import React, {FC} from 'react'
import Image from 'next/image';

interface AppointmentCardProps {
    number: number;
    name: string;
    time?: string;
    date?: string;
}

const AppointmentCard:FC<AppointmentCardProps> = ({ number, name, time, date }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <div
          className="flex flex-col w-[240px] h-[180px] border-[1px] border-[#000] rounded-[15px] cursor-pointer px-5 py-5 relative justify-items-start"
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
          <Image
            src="/appointmentCardBg.svg"
            alt="Three rows of three dots"
            width={60}
            height={60}
            className="absolute bottom-5 right-5"
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

export default AppointmentCard