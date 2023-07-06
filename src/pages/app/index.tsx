import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import BooksTable from "components/app/BooksTable/BooksTable";
import GPBackdrop from "components/general/GeneralPurpose/GPBackdrop";
import GPErrorBox from "components/general/GeneralPurpose/GPErrorBox";
import GPSnackbar from "components/general/GeneralPurpose/GPSnackbar";
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";

const BookData = {
  book1: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Chamber of Secrets",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book2: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Prisoner of Azkaban",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book3: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Goblet of Fire",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book4: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Order of the Phoenix",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book5: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Half-Blood Prince",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book6: {
    id: "book-6",
    author: "J.K. Rowling",
    title: "Harry Potter and the Deathly Hallows",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book7: {
    id: "book-7",
    author: "J.K. Rowling",
    title: "Harry Potter and the Philosopher's Stone",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book8: {
    id: "book-8",
    author: "J.K. Rowling",
    title: "Harry Potter and the Chamber of Secrets",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
};

const App = ({ booksDataString }: { booksDataString: string }) => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [backdropMessage, setBackdropMessage] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState("");
  const [booksData, setBooksData] = useState(JSON.parse(booksDataString));
  const [qrcode, setQrcode] = useState("");
  const uid = getCookie("uid") as string;
  const [rowId, setRowId] = useState("");
  const { showBackdrop, closeBackdrop, showError } = useContext(GPCContext);

  const handleSendData = async () => {
    setLoading(true);
    setBackdropMessage("Sending Data...");
    try {
      await setDoc(doc(db, "idk", "idk"), { books: BookData }, { merge: true });
      setSnackbarMessage("Data Sent Successfully!");
    } catch (e: any) {
      setError("Please try again later.");
      console.log(e);
    }
    setLoading(false);
    setBackdropMessage("");
  };

  useEffect(() => {
    if(qrcode==="") return;
    if (qrcode) setOpenDialog(true);
  }, [qrcode]);

  const handleIssueBook = async () => {
    const docRef = collection(db, "qrcodes");

    showBackdrop("Generating QR Code...");
    const docSnap = await addDoc(docRef, { bookId: rowId });
    setQrcode(docSnap.id);
    closeBackdrop();

    const qrRef = doc(db, "qrcodes", docSnap.id);
    const unsubscribe = onSnapshot(qrRef, async (document) => {
      if (document.data()?.uid === uid) {
        try {
          setOpenDialog(false);
          showBackdrop("Issuing Book...");
          const batch = writeBatch(db);
          const userRef = doc(db, "Userdata", uid);
          const historyRef = doc(db, "history", rowId);
          
          const userDoc = await getDoc(userRef);
          batch.set(
            historyRef,
            {
              history: arrayUnion(
                {
                  uid: uid,
                  username: userDoc.data()?.fname + " " + userDoc.data()?.lname,
                  issueDate: new Date(),
                  returnDate: null,
                },
              ),
            },
            { merge: true }
          )
          batch.delete(qrRef)
          await batch.commit();
        } catch (e: any) {
          showError("Please try again later.");
          console.log(e);
        }



        unsubscribe();
        closeBackdrop();
      }
    });
  };

  const trial = async () => {
    // set doc
    const historyRef = doc(db, "history", "book7");
    // append the new data to the existing data field as an array
    await setDoc(
      historyRef,
      {
        history: arrayUnion(
          {
            uid: uid,
            username: "Anas",
            issueDate: new Date(),
            returnDate: null,
          },
        ),
      },
      { merge: true }
    );
  };

  return (
    <>
      <BooksTable
        booksData={booksData}
        setBooksData={setBooksData}
        setQrCode={setQrcode}
        setRowId={setRowId}
        handleIssueBook={handleIssueBook}
      />

      {/* <GPDialog
        title="Are you sure you want to Delete this Event?"
        contentText="This will permanantely delete this Event."
        buttons={[
          { text: "Cancel" },
          { text: "Delete", color: "error", onClick: handleDelete },
        ]}
        open={dialogOpen}
        setOpen={setDialogOpen}
      /> */}
      <GPSnackbar message={snackbarMessage} />
      <GPBackdrop loading={loading} message={backdropMessage} />
      <GPErrorBox message={error} />

      <Button color="primary" onClick={handleSendData}>
        Send Data
      </Button>
      <Button color="primary" onClick={trial}>
        Test
      </Button>

      <Dialog open={openDialog}>
        <DialogTitle>Scan the QR Code</DialogTitle>
        <DialogContent>
          <QRCode value={qrcode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const booksDataString = await getDoc(doc(db, "idk", "idk"));
  // turn into array and add key as id
  const booksDataArray = Object.entries(booksDataString.data()?.books).map(
    ([key, value]) => {
      // @ts-ignore
      return { ...value, id: key };
    }
  );

  return {
    props: {
      booksDataString: JSON.stringify(booksDataArray),
    },
  };
};
