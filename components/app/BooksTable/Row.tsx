import {
  Close,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Publish,
  Save,
} from "@mui/icons-material";
import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface Props {
  row: any;
  index: number;
  setBooksData: Dispatch<SetStateAction<any[]>>;
  booksData: any;
  setQrCode: Dispatch<SetStateAction<string>>;
  setRowId: Dispatch<SetStateAction<string>>;
  handleIssueBook: () => void;
}

export default function Row(props: Props) {
  const {
    row,
    index,
    setBooksData,
    booksData,
    setQrCode,
    setRowId,
    handleIssueBook,
  } = props;
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { showDialog, showBackdrop, closeBackdrop } = useContext(GPCContext);
  const uid = getCookie("uid") as string;

  const handleSave = async () => {
    setIsEdit(false);
    const title = document.getElementById(`title-${index}`) as HTMLInputElement;
    const author = document.getElementById(
      `author-${index}`
    ) as HTMLInputElement;
    const copies = document.getElementById(
      `copies-${index}`
    ) as HTMLInputElement;
    const available = document.getElementById(
      `available-${index}`
    ) as HTMLInputElement;

    const values = {
      title: title.value,
      author: author.value,
      copies: copies.value,
      available: available.value,
    };

    booksData[index] = { ...values, id: booksData[index].id };
    console.log(booksData[index]);

    const docRef = doc(db, "idk", "idk");
    await updateDoc(docRef, `books.${booksData[index].id}`, values);

    setBooksData([...booksData]);
  };

  const handleOpenDialog = () => {
    showDialog(
      "Are you sure want to edit this?",
      "These changes will be permanent.",
      "Confirm",
      handleSave
    );
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        {isEdit ? (
          <>
            <TableCell>
              <TextField
                id={`title-${index}`}
                label="Enter Title"
                variant="standard"
                defaultValue={row.title}
                required
              />
            </TableCell>
            <TableCell>
              <TextField
                id={`author-${index}`}
                label="Enter Author"
                variant="standard"
                defaultValue={row.author}
                required
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                id={`copies-${index}`}
                label="Enter Copies"
                variant="standard"
                type="number"
                defaultValue={row.copies}
                required
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                id={`available-${index}`}
                label="Enter Available"
                variant="standard"
                type="number"
                defaultValue={row.available}
                required
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.author}</TableCell>
            <TableCell align="right">{row.copies}</TableCell>
            <TableCell align="right">{row.available}</TableCell>
          </>
        )}

        <TableCell align="right">
          {isEdit ? (
            <div style={{ display: "flex" }}>
              <IconButton color="success" onClick={handleOpenDialog}>
                <Save />
              </IconButton>
              <IconButton color="error" onClick={() => setIsEdit(false)}>
                <Close />
              </IconButton>
            </div>
          ) : (
            <>
              <IconButton onClick={() => setIsEdit(true)}>
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => {
                  setRowId(row.id);
                  showDialog(
                    "Are you sure want to issue this book?",
                    "This book will be issued to the student.",
                    "Confirm",
                    handleIssueBook
                  );
                }}
              >
                <Publish />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
      {/* <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow> */}
    </>
  );
}
