import React, { FC, useEffect, useState } from "react";
import FormCheckbox from "./FormCheckbox";
import FormTextarea from "./FormTextarea";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import { useUser } from "components/UserContext";
import FormRadio from "./FormRadio";
import {
  diurnalOptions,
  familyHistoryOptions,
  genderOptions,
  medicalHistoryOptions,
  occupationOptions,
  otherComplaintsOptions,
  painOptions,
  personalHistoryOptions,
  referrerOptions,
  surgicalHistoryOptions,
} from "./constants";
import { Alert, Snackbar } from "@mui/material";
import Input from "./Input";

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
}

const Profile = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<Profile | null>({});
  const [formData, setFormData] = useState<Profile | null>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeOccupation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      occupation: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeReferrer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      referredBy: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeChiefComplaint = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      chiefComplaint: e.target.value,
    }));
    setIsEditing(true);
  };



  const onChangeOtherComplaints = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      otherComplaints: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeProblemInGait = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      problemInGait: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeMedicalHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangePersonalHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      personalHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeFamilyHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      familyHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeSurgicalHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      surgicalHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  // get the profile data from the database and set the profileData state and formData state
  const getProfileData = async () => {
    const docRef = doc(db, "Userdata", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
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

  // trigger this function on any input change and set the value of corresponding state
  const handleProfileDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsEditing(true);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // update the data and store in the firebase database
  const handleProfileSave = async () => {
    await setDoc(doc(db, "Userdata", user.uid), formData, { merge: true });
    setIsEditing(false);

    // get the latest data
    await getProfileData();
    setIsSnackbarOpen(true);
  };

  return (
    <div className="px-4 py-8 md:p-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[42px] font-bold">Profile Details</h2>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="mb-4">
          <h3 className="text-[20px] font-semibold mb-2">PERSONAL DETAILS</h3>
          <div className="flex flex-col gap-8 border-[2px] p-4">
            <div className="grid justify-between align-start grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="text-[18px] font-semibold text-[#333]">
                  First Name
                </div>
                <Input
                  type="text"
                  value={formData?.fname}
                  name="fname"
                  onChange={handleProfileDataChange}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="font-semibold text-[18px] text-[#333]">
                  Last Name
                </div>
                <Input
                  type="text"
                  value={formData?.lname}
                  name="lname"
                  onChange={handleProfileDataChange}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="font-semibold text-[18px] text-[#333]">
                  Email
                </div>
                <Input
                  type="email"
                  value={formData?.email}
                  name="email"
                  onChange={handleProfileDataChange}
                  disabled
                />
              </div>
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="font-semibold text-[18px] text-[#333]">Age</div>
                <Input
                  type="number"
                  value={Number(formData?.age)}
                  name="age"
                  onChange={handleProfileDataChange}
                  min="0"
                  max="150"
                />
              </div>
              <FormRadio
                options={genderOptions}
                label="Gender"
                name="gender"
                checkedValue={formData?.gender || ""}
                onChange={onChangeGender}
              />
              <FormRadio
                options={occupationOptions}
                label="Occupation"
                name="occupation"
                checkedValue={formData?.occupation || ""}
                onChange={onChangeOccupation}
              />
              <FormRadio
                options={referrerOptions}
                label="Referred By"
                name="referrer"
                checkedValue={formData?.referredBy || ""}
                onChange={onChangeReferrer}
              />
              <FormTextarea
                label="Chief Complaint"
                value={formData?.chiefComplaint || ""}
                onChange={onChangeChiefComplaint}
              />
            </div>
          </div>
        </div>
        



        <div className="mb-4">
          <h3 className="text-[20px] font-semibold mb-2">HISTORY</h3>
          <div className="grid border-[2px] p-4 justify-between align-start grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <FormCheckbox
              options={medicalHistoryOptions}
              label="Medical History"
              checkedValues={formData?.medicalHistory || []}
              onChange={onChangeMedicalHistory}
              otherOption={true}
            />
            <FormCheckbox
              options={personalHistoryOptions}
              label="Personal History"
              checkedValues={formData?.personalHistory || []}
              onChange={onChangePersonalHistory}
              otherOption={true}
            />
            <FormCheckbox
              options={familyHistoryOptions}
              label="Family History"
              checkedValues={formData?.familyHistory || []}
              onChange={onChangeFamilyHistory}
              otherOption={true}
            />
            <FormCheckbox
              options={surgicalHistoryOptions}
              label="Surgical History"
              checkedValues={formData?.surgicalHistory || []}
              onChange={onChangeSurgicalHistory}
              otherOption={true}
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-[20px] font-semibold mb-2">OTHER</h3>
          <div className="grid border-[2px] p-4 justify-between align-start grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <FormCheckbox
              options={otherComplaintsOptions}
              label="Other Complaints"
              checkedValues={formData?.otherComplaints || []}
              onChange={onChangeOtherComplaints}
            />
            <FormTextarea
              label="Problem in Gait"
              value={formData?.problemInGait || ""}
              onChange={onChangeProblemInGait}
            />
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="sticky bottom-[60px] md:bottom-[20px] right-0 flex gap-2 justify-end">
          <button
            className="px-4 py-1 border-[1px] border-gray-300 hover:border-gray-600 text-[#000] text-[20px] font-semibold rounded-[10px]"
            onClick={() => {
              setIsEditing(false);
              // reset the form data
              setFormData(profileData);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-[#000] border-[1px] text-[#fff] text-[20px] font-semibold rounded-[10px]"
            onClick={handleProfileSave}
          >
            Save
          </button>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
        variant="filled"
          onClose={() => setIsSnackbarOpen(false)}
          // onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile Saved Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
