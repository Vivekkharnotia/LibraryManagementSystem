import { Chart, ChartTypeRegistry } from "chart.js/auto";
import { _DeepPartialArray } from "chart.js/dist/types/utils";
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

export const uploadFileToFirebaseAndGetUrl = async (file: File | null, path: string) => {
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
  const storagePath = path ? `${path}/${type}/${newFile.name}` : `${type}/${newFile.name}`;
  const storageRef = ref(fbStorage, storagePath);

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

export const chartMaker = (
  id: string,
  type: keyof ChartTypeRegistry,
  data: any,
  title: string | _DeepPartialArray<string>,
  label: string
) => {

  new Chart(document.getElementById(id) as HTMLCanvasElement, {
    type: type,
    data: {
      datasets: [
        {
          label: label,
          data: data[1],
          backgroundColor: data[2] ? data[2] : null,
          
        },
      ],
      labels: data[0],
    },
    options: {
      plugins: {
        title: {
          font:{
            size: 20
          },
          display: true,
          text: title,
        },
      },
    },
  });
};

export const timeMiner = (time: string) => {
  const timeArray = time.split(":");
  const hours = parseInt(timeArray[0]);

  if (hours >= 5 && hours < 12) return "at morning";
  else if (hours >= 12 && hours < 4) return "at afternoon";
  else return "at evening";
};