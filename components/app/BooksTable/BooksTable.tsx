import { TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Dispatch, SetStateAction, useState } from "react";
import Row from "./Row";

export default function BooksTable({
  booksData,
  setBooksData,
  setQrCode,
  setRowId,
  handleIssueBook,
}: {
  booksData: any;
  setBooksData: any;
  setQrCode: Dispatch<SetStateAction<string>>;
  setRowId: Dispatch<SetStateAction<string>>;
  handleIssueBook: () => void;
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Copies</TableCell>
              <TableCell align="right">Available</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booksData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book: any, index: number) => (
                <Row
                  key={`book-${index}`}
                  row={book}
                  index={index}
                  setBooksData={setBooksData}
                  booksData={booksData}
                  setQrCode={setQrCode}
                  setRowId={setRowId}
                  handleIssueBook={handleIssueBook}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[3, 10, 25, 100]}
        component="div"
        count={booksData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
