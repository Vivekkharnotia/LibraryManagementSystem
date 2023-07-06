import { DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

interface Props {
  message: string;
}

export default function GPErrorBox(props: Props) {
  const { message } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message === "" || message === undefined) {
        return;
    }
    setOpen(true);
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">An error has occured</DialogTitle>

        <DialogContent>
            {message}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>okay</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
