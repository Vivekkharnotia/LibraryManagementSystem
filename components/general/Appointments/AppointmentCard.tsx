import {
  Button,
  Fade,
  Grow,
  GrowProps,
  IconButton,
  Modal,
  Slide,
  SlideProps,
  Snackbar,
} from "@mui/material";
import React, { FC, useState } from "react";
import Image from "next/image";
import appoinmentcss from "./Appoinments.module.css";
import qrSample from "./qrSample.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface AppointmentCardProps {
  number: number;
  name: string;
  time?: string;
  date?: string;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  number,
  name,
  time,
  date,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buy, setBuy] = useState(false);
  const toggleBuy = () => setBuy((prev) => !prev);
  const [copied, setCopied] = useState(false);

  const resetCopy = () => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("sampelupiid@oksbi");
    setCopied(true);
    resetCopy();
  };

  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      handleCopy();
      setState({
        open: true,
        Transition,
      });
    };

  const handleSnackBarClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  return (
    <>
      <div className="flex flex-col w-[240px] border-[1px] border-[#000] rounded-[15px] cursor-pointer px-5 py-5 relative justify-items-start">
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
          className="bg-[#e9ab02] mt-[1rem] rounded-lg py-[0.5rem] hover:bg-[hsl(44,98%,44%)]"
          variant="contained"
          disableElevation
          onClick={toggleBuy}
          endIcon={<AddShoppingCartIcon className="ml-4" />}
        >
          Buy sessions
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
          style={{width: 'min(450px, 90%)'}}
        >
          <IconButton
            onClick={() => setBuy(false)}
            className="absolute right-5 top-5 aspect-square"
          >
            <CloseIcon />
          </IconButton>
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
          <div
            style={{
              display: "flex",
              marginTop: "40px",
              alignItems: "center",
              position: "relative",
              paddingRight: "2rem",
            }}
          >
            <div>UPI ID : sample384983@oksbi &nbsp;&nbsp;</div>
            <IconButton
              style={{ position: "absolute", right: "0" }}
              onClick={handleClick(SlideTransition)}
            >
              {!copied ? (
                <ContentCopyIcon
                  fontSize="small"
                  sx={{ width: "max-content" }}
                  className={appoinmentcss.copyIcn}
                />
              ) : (
                <DoneAllIcon color="success" />
              )}
            </IconButton>
          </div>
        </div>
      </Modal>

      <Snackbar
        open={state.open}
        onClose={handleSnackBarClose}
        TransitionComponent={state.Transition}
        message="Copied to clipboard"
        key={state.Transition.name}

      />
    </>
  );
};

export default AppointmentCard;
