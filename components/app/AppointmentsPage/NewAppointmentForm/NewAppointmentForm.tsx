import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useUser } from "components/UserContext";
import FormCheckbox from "components/app/profile/Profile/FormCheckbox";
import FormTextarea from "components/app/profile/Profile/FormTextarea";
import {
  diurnalOptions,
  painOptions,
} from "components/app/profile/Profile/constants";
import { db } from "components/general/firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { NewAppointmentFormData } from "types/appointments";
import { returnFileSize, validFileType } from "utils/ExtendedUtils";
import style from "./NewAppointmentForm.module.css";

export default function NewAppointmentForm({
  handleClose,
  setSnackbarMessage,
  data,
  setEventsData,
}: {
  handleClose: () => void;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  data: any;
  setEventsData: Dispatch<SetStateAction<any>>;
}) {
  const { user } = useUser();

  const initialState: NewAppointmentFormData = {
    eventName: "",
    eventType: [],
    eventLevel: [],
    description: "",
  };

  const [formData, setFormData] =
    useState<NewAppointmentFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChangePainOptions = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      eventType: newCheckedValues,
    }));
  };

  const onChangeCaseName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(false);
    setFormData((prev) => ({
      ...prev,
      eventName: e.target.value,
    }));
  };

  const onChangeDiurnal = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      eventLevel: newCheckedValues,
    }));
  };

  const onChangeWhenBad = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleProfileSave = async () => {
    try {
      if (formData.eventName.trim().length === 0) {
        setError(true);
        alert("Please enter an event name");
        return;
      }

      setLoading(true);

      // write blog to firestore in batch
      const batch = writeBatch(db);
      const eventRef = doc(collection(db, "Events"));
      const eventId = eventRef.id;
      const events = data.events ? [...data.events, eventId] : [eventId];
      const userRef = doc(collection(db, "Userdata"), user.uid);

      batch.set(userRef, { events: events }, { merge: true });
      batch.set(eventRef, {
        ...formData,
        eventId,
        userId: user.uid,
        createdAt: new Date(),
        isPublished: true
      });
      await batch.commit();
      setEventsData((prev: any) => [
        ...prev,
        { ...formData, eventId, userId: user.uid, createdAt: new Date() },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSnackbarMessage("New case created successfully");
      handleClose();
    }
  };

  const [tooltipTitle, setTooltipTitle] = useState("Edit Image");
  const blogCoverImageRef = useRef<HTMLInputElement>(null);
  const [blogCoverImage, setBlogCoverImage] = useState<string>("");
  const [blogCoverImageFile, setBlogCoverImageFile] = useState<File | null>(
    null
  );

  const handleBlogCoverImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e?.target?.files) return;

    const file = e.target?.files[0];

    if (file) {
      if (!validFileType(file)) {
        alert("Invalid File Type");
      } else {
        const src = URL.createObjectURL(file);
        setTooltipTitle(`${file.name} (${returnFileSize(file.size)})`);
        setBlogCoverImage(src);
        setBlogCoverImageFile(file);
      }
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

          <div
            className="relative mt-[40px] md:mt-[70px] w-full text-center"
            id="blogCoverImage"
          >
            <div className="relative m-auto overflow-auto w-[90%] h-[260px] sm:max-w-[900px] sm:h-[350px] md:h-[450px] lg:h-[600px] px-4">
              <Tooltip title={tooltipTitle} TransitionComponent={Zoom}>
                <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden cursor-pointer">
                  {blogCoverImageFile ? (
                    <img
                      src={URL.createObjectURL(blogCoverImageFile)}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : blogCoverImage ? (
                    <Image
                      src={blogCoverImage}
                      fill={true}
                      alt="Blog Cover Image"
                      className="object-cover cursor-pointer rounded-[10px] transition-all duration-150"
                    />
                  ) : (
                    <div
                      onClick={() => blogCoverImageRef.current?.click()}
                      className="flex flex-col gap-4 items-center justify-center w-full h-full"
                    >
                      <AddPhotoAlternateOutlinedIcon className="text-white text-6xl" />
                      <span className="text-xl md:text-2xl font-semibold text-white">
                        Upload Blog Cover Image
                      </span>
                    </div>
                  )}
                </div>
              </Tooltip>

              <IconButton className="absolute right-6 top-2 z-40 w-12 h-12 cursor-pointer bg-black flex items-center justify-center hover:bg-gray-400">
                <input
                  ref={blogCoverImageRef}
                  type="file"
                  name=""
                  id="file"
                  className={style.file}
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={handleBlogCoverImageChange}
                />
                <EditIcon
                  onClick={() => blogCoverImageRef.current?.click()}
                  style={{ color: "white" }}
                />
              </IconButton>
            </div>
          </div>

          <div className={style.right}>
            <div className="mb-4">
              <TextField
                variant="standard"
                onChange={onChangeCaseName}
                label="Enter Event Name"
                value={formData?.eventName || ""}
                sx={{ marginY: "1rem" }}
                error={error}
                fullWidth
                helperText={error ? "Please enter a case name" : ""}
                style={{ marginBottom: "3rem" }}
              />
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
              className="bg-[black!important]"
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
