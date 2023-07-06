import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  IconButton
} from "@mui/material";
import { useUser } from "components/UserContext";
import FormCheckbox from "components/app/profile/Profile/FormCheckbox";
import FormTextarea from "components/app/profile/Profile/FormTextarea";
import {
  diurnalOptions,
  painOptions,
} from "components/app/profile/Profile/constants";
import { db } from "components/general/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import style from "./CurrentCaseContent.module.css";

interface Profile {
  fname?: string;
  lname?: string;
  email?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  referredBy?: string;
  painType?: string[];
  chiefComplaint?: string;
  diurnal?: string[];
  otherComplaints?: string[];
  problemInGait?: string;
  medicalHistory?: string[];
  personalHistory?: string[];
  familyHistory?: string[];
  surgicalHistory?: string[];
  whenBad?: string;
  whenBetter?: string;
  slot?: string;
  caseName?: string;
}

function CurrentCaseContent({
  handleClose,
  toggleSlot,
  id,
}: {
  handleClose: () => void;
  toggleSlot: () => void;
  id: string;
}) {
  const [formData, setFormData] = useState<Profile | null>({});
  const [profileData, setProfileData] = useState<Profile | null>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, userLoading } = useUser();

  const onChangePainOptions = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      painType: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeDiurnal = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      diurnal: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeWhenBad = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBad: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeWhenBetter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBetter: e.target.value,
    }));
    setIsEditing(true);
  };

  const getProfileData = async () => {
    setLoading(true);
    if (userLoading === "loaded") {
      const docRef = doc(db, `Userdata/${user.uid}/cases`, id);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
        setFormData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  };

  const handleBookSlot = () => {
    toggleSlot();
    handleClose();
  };

  // load the data on page load
  useEffect(() => {
    getProfileData();
  }, []);

  const handleProfileSave = async () => {
    await setDoc(doc(db, `Userdata/${user.uid}/cases`, id), formData, {
      merge: true,
    });
    setIsEditing(false);

    // get the latest data
    await getProfileData();
    // setIsSnackbarOpen(true);
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

          <div className={style.seperator} />

          <div className={style.right}>
            <div className="mb-4">
              <div className="grid justify-between align-start grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
              <div className="grid justify-between align-start grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 mb-6">
                <FormCheckbox
                  options={painOptions}
                  label="Type of Event"
                  checkedValues={formData?.eventType || []}
                  onChange={onChangePainOptions}
                  otherOption={true}
                />
                <FormCheckbox
                  options={diurnalOptions}
                  label="Diurnal"
                  checkedValues={formData?.eventLevel || []}
                  onChange={onChangeDiurnal}
                  otherOption={true}
                />
              </div>
              <FormTextarea
                label="Descripton of Event"
                value={formData?.description || ""}
                onChange={onChangeWhenBad}
              />
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="sticky w-max md:absolute  md:bottom-[0.5rem] md:left-[auto] md:right-[2rem] bottom-[-3rem] left-[100rem] flex gap-4">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  // reset the form data
                  setFormData(profileData);
                }}
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
                Save
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CurrentCaseContent;
