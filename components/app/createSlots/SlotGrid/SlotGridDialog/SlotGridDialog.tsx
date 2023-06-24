import { Input } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

interface SlotGridDialogProps {
  open: boolean;
  handleClose: () => void;
  blocks: string[][];
  setBlocks: React.Dispatch<React.SetStateAction<string[][]>>;
  daysOfWeek: string[];
  handleSave: () => void;
}

const SlotGridDialog = ({
  open,
  handleClose,
  blocks,
  setBlocks,
  daysOfWeek,
  handleSave,
}: SlotGridDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Number of Meetings Per Slot</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormGroup>
            {blocks.map((block, index) => {
              if (block.length > 0) {
                return (
                  <div key={`Item-${index}`}>
                    <DialogTitle>{daysOfWeek[index]}:</DialogTitle>

                    <List style={{ marginLeft: "1rem" }}>
                      {block.map((slot, i) => {
                        const startTime = slot.split(" ")[0].split("-")[0];
                        const endTime = slot.split(" ")[0].split("-")[1];
                        return (
                          <ListItem
                            key={`ListItem-${index}${i}`}
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemIcon>{i + 1}.</ListItemIcon>
                              <ListItemText
                                primary={`${startTime} to ${endTime}`}
                                sx={{ paddingRight: "8rem" }}
                              />
                            </ListItemButton>
                            <Input
                              type="number"
                              defaultValue={parseInt(slot.split(" ")[1])}
                              style={{
                                width: "5rem",
                                paddingLeft: "0.8rem",
                                marginLeft: "1rem",
                              }}
                              onChange={(e) => {
                                if (parseInt(e.target.value) <= 0) {
                                  e.target.value = "1";
                                }
                                block[
                                  i
                                ] = `${startTime}-${endTime} ${e.target.value}`;
                                setBlocks([...blocks]);
                              }}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                );
                {
                  /* <Button className={style.delete} onClick={() => {
                  block.splice(index, 1);
                  setBlocks([...blocks]);
                }}>X</Button> */
                }
              }
            })}
          </FormGroup>

          <Button onClick={handleSave}>Save</Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default SlotGridDialog;
