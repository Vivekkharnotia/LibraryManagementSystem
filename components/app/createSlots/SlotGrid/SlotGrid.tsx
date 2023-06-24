import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../general/firebase-config";
import SlotGridCell from "./SlotGridCell/SlotGridCell";
import style from "./SlotGrid.module.css";
import { timings } from "./constants";
import SlotGridDialog from "./SlotGridDialog/SlotGridDialog";
import { Button } from "@mui/material";

function SlotGrid({
  slotMatrix,
  daysOfWeek,
  dateArray,
}: {
  slotMatrix: number[][];
  daysOfWeek: string[];
  dateArray: string[];
}) {
  const [slots, setSlots] = useState<number[][]>(slotMatrix);
  const [setterSlots, setSetterSlots] = useState<number[][]>(slotMatrix);
  const [blocks, setBlocks] = useState([...Array(7)].map((e) => Array(0)));
  const [open, setOpen] = useState(false);

  const slotGenerator = () => {
    const newBlocks = [...Array(7)].map((e) => Array(0));
    slots.map((day, dayIndex) => {
      let block: any = [];
      day.map((slot, index) => {
        if (slot === 1) {
          block.push(index);
          if (index === day.length - 1) {
            newBlocks[dayIndex].push(
              `${timings[block[0]]}-${timings[block[block.length - 1] + 1]} 1`
            );
            setBlocks(newBlocks);
            block = [];
          }
        } else if (slot === 0) {
          if (block.length > 0) {
            newBlocks[dayIndex].push(
              `${timings[block[0]]}-${timings[block[block.length - 1] + 1]} 1`
            );
            setBlocks(newBlocks);
            block = [];
          }
        }
      });
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // save the blocks elements to the Slots collection in the database with id as dateArray elements
    dateArray.map(async (date, index) => {
      const docRef = doc(db, "Slots", `${date}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data()) {
        await setDoc(docRef, {
          slots: blocks[index],
        });
      } else {
        await updateDoc(docRef, {
          slots: blocks[index],
        });
      }
    });
    setSetterSlots([...slots]);
    setOpen(false);
  };

  return (
    <>
      <div className={style.table_container}>
        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ borderRadius: "5px 0 0 0" }}>Time</th>
              {daysOfWeek.map((day, index) => (
                <th key={`daysOfWeek-${index}`}>{day}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timings.map((time, column) => {
              if (column === timings.length - 1) {
                return;
              }

              return (
                <tr key={`column-${column}`}>
                  <td>{time}</td>
                  {daysOfWeek.map((day, row) => (
                    <SlotGridCell
                      key={`row-${row}`}
                      row={row}
                      column={column}
                      slots={slots}
                      setSlots={setSlots}
                      setterSlots={setterSlots}
                    />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={style.button_container}>
        <Button
          onClick={slotGenerator}
          className={style.button}
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "1rem",
            padding: "0.5rem 2rem",
          }}
        >
          Save
        </Button>
      </div>

      <SlotGridDialog
        open={open}
        handleClose={handleClose}
        blocks={blocks}
        setBlocks={setBlocks}
        daysOfWeek={daysOfWeek}
        handleSave={handleSave}
      />
    </>
  );
}

export default SlotGrid;
