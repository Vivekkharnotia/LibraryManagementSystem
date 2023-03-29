import { Button } from "@mui/material";
import { db } from "components/general/firebase-config";
import {
  diurnalOptions,
  painOptions,
} from "components/general/Profile/constants";
import FormCheckbox from "components/general/Profile/FormCheckbox";
import FormTextarea from "components/general/Profile/FormTextarea";
import { useUser } from "components/UserContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import style from "./CurrentCaseContent.module.css";
import Session from "./Session/Session";

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
  slots?: string[];
}

function CurrentCaseContent() {
  const [formData, setFormData] = useState<Profile | null>({});
  const [profileData, setProfileData] = useState<Profile | null>({});
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

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
    const docRef = doc(db, "Userdata", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProfileData(docSnap.data());
      setFormData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  // load the data on page load
  useEffect(() => {
    getProfileData();
  }, []);

  const handleProfileSave = async () => {
    await setDoc(doc(db, "Userdata", user.uid), formData, { merge: true });
    setIsEditing(false);

    // get the latest data
    await getProfileData();
    // setIsSnackbarOpen(true);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <h3 className={style.mainHeading}>Case: myCase</h3>
          <div className={style.leftContent}>
            <h4 className={style.sessionMainHeading}>Session Details:</h4>

            <div>
              {
                profileData?.slots?.map((slot, index) => (
                  <Session key={`session_${index}`} slot={slot} index={index} />
                ))
              }
            </div>
          </div>
        </div>

        <div className={style.seperator} />

        <div className={style.right}>
          <div className="mb-4">
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
        {isEditing && (

          <div className="absolute bottom-[3rem] right-[3rem] flex gap-4">
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
    </>
  );
}

export default CurrentCaseContent;
