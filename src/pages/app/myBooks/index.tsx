import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const { showBackdrop, closeBackdrop, showError } = useContext(GPCContext);
  const uid = getCookie("uid") as string;

  const handleQrCodeScanner = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    if (qrCode === "") return;
    if (qrCode) {
      setDialogOpen(false);
      showBackdrop("Processing QR Code...");
      const qrcode = qrCode.split(" ")[0];
      addingUidToQr(qrcode);
    }
  }, [qrCode]);

  const addingUidToQr = async (qrcode: string) => {
    try{
      const docRef = doc(db, "qrcodes", qrcode);
      await updateDoc(docRef, { uid: uid });
    }
    catch(err){
      showError("QR Code not found!");
      console.log(err);
    }

    closeBackdrop();
    setQrCode("");
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "2rem",
          "@media (max-width:768px)": { paddingInline: "2rem" },
        }}
      >
        <Button
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px",
            padding: "0.5rem 1rem",
          }}
          onClick={handleQrCodeScanner}
        >
          Open Scanner
        </Button>

        <Divider sx={{ marginTop: "2rem", marginBottom: "3rem" }} />
      </Box>

      <Dialog open={dialogOpen} sx={{ display: "auto!important" }}>
        <DialogContent sx={{ overflow: "hidden" }}>
          <QrReader
            onResult={(data) => {
              if (data) {
                // @ts-ignore
                const text = data.text + " " + Math.random();
                setQrCode(text);
              }
            }}
            constraints={{
              facingMode: "environment",
            }}
          />
          <div style={{ width: "100vw" }}></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
