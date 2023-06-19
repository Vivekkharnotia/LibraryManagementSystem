import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import { useUser } from "components/UserContext";
import FormCheckbox from "components/app/profile/Profile/FormCheckbox";
import FormTextarea from "components/app/profile/Profile/FormTextarea";
import {
  diurnalOptions,
  painOptions,
} from "components/app/profile/Profile/constants";
import { db } from "components/general/firebase-config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useState } from "react";
import style from "./NewAppointmentForm.module.css";
import { NewAppointmentFormData } from "types/appointments";

export default function NewAppointmentForm({
  handleClose,
  setSnackbarMessage,
  getAppointmentData,
}: {
  handleClose: () => void;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  getAppointmentData: () => void;
}) {
  const { user } = useUser();

  const initialState: NewAppointmentFormData = {
    caseName: "",
    painType: [],
    diurnal: [],
    whenBad: "",
    whenBetter: "",
  };

  const [formData, setFormData] =
    useState<NewAppointmentFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChangePainOptions = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      painType: newCheckedValues,
    }));
  };

  const onChangeCaseName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(false);
    setFormData((prev) => ({
      ...prev,
      caseName: e.target.value,
    }));
  };

  const onChangeDiurnal = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      diurnal: newCheckedValues,
    }));
  };

  const onChangeWhenBad = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBad: e.target.value,
    }));
  };

  const onChangeWhenBetter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBetter: e.target.value,
    }));
  };

  const handleProfileSave = async () => {
    try {
      if (formData.caseName.trim().length === 0) {
        setError(true);
        alert("Please enter a case name");
        return;
      }

      setLoading(true);

      // create a new case
      await addDoc(collection(db, `Userdata/${user.uid}/cases`), {
        ...formData,
        createdAt: Timestamp.now(),
        numberOfSessions: 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getAppointmentData();
      setLoading(false);
      setSnackbarMessage("New case created successfully");
      handleClose();
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className={style.container}>
          <IconButton onClick={handleClose} className={style.cancelButton}>
            <CloseIcon />
          </IconButton>

          <div className={style.right}>
            <div className="mb-4">
              <TextField
                variant="standard"
                onChange={onChangeCaseName}
                label="Enter Case Name"
                value={formData?.caseName || ""}
                sx={{ marginY: "1rem" }}
                error={error}
                fullWidth
                helperText={error ? "Please enter a case name" : ""}
                style={{ marginBottom: "3rem" }}
              />
              <div className="grid justify-between align-start grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
                <FormCheckbox
                  options={painOptions}
                  label="Type"
                  checkedValues={formData?.painType || []}
                  onChange={onChangePainOptions}
                  otherOption={true}
                />
                <FormCheckbox
                  options={diurnalOptions}
                  label="Diurnal"
                  checkedValues={formData?.diurnal || []}
                  onChange={onChangeDiurnal}
                  otherOption={true}
                />
                <FormTextarea
                  label="When is it bad"
                  value={formData?.whenBad || ""}
                  onChange={onChangeWhenBad}
                />
                <FormTextarea
                  label="When is it better"
                  value={formData?.whenBetter || ""}
                  onChange={onChangeWhenBetter}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleClose}
              variant="outlined"
              disableElevation
              className="bg-[white!important] text-[#B4B4B4!important] border-[#B4B4B4!important] hover:bg-[white]"
            >
              Cancel
            </Button>

            <Button
              onClick={handleProfileSave}
              className="bg-[#fab700!important]"
              variant="contained"
              disableElevation
            >
              Create
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
