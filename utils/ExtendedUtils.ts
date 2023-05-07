import { fbStorage } from "components/general/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function returnFileSize(number: number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

const fileTypes = ["image/jpeg", "image/png"];

export function validFileType(file: File): boolean{
  return fileTypes.includes(file.type);
}

export const uploadFileToFirebaseAndGetUrl = async (file: File | null) => {
  if (!file) {
    return { uploadedToUrl: "", path: "" };
  }

  const newFile = new File([file], file?.name.replace(/\s/g, "_"), {
    type: file?.type,
  });
  let type = newFile.type.split("/")[0];
  if (!type) {
    type = "other";
  }
  const path = `UserProfiles/${type}/${newFile.name}`;
  const storageRef = ref(fbStorage, path);

  const uploadedToUrl = await uploadBytes(storageRef, newFile).then(
    async (snapshot) => {
      //return newFile url
      const url = await getDownloadURL(snapshot.ref).then((url) => {
        return url;
      });
      return url;
    }
  );
  return { uploadedToUrl, path };
};
