import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function GPDialog(props: any) {

    const { open, closeDialog, title, message, primaryActionText, handlePrimaryAction } = props;


  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
        <Button onClick={handlePrimaryAction} color="warning">
          {primaryActionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GPDialog;
