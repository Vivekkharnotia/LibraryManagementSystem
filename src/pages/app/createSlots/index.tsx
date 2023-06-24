import { withAdmin } from "ProtectedRoutes/AdminRoute";
import SlotGrid from "components/app/createSlots/SlotGrid/SlotGrid";
import { db } from "components/general/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import {
  getDateArray,
  getDaysofWeek,
  getSlotMatrix,
  getTimings,
} from "utils/ExtendedUtils";

interface CreateSlotsProps {
  slotsString: string;
  timings: string[];
  daysOfWeekString: string;
  dateArray: string[];
}

function CreateSlotsPage({
  slotsString,
  timings,
  daysOfWeekString,
  dateArray,
}: CreateSlotsProps) {
  const slots = JSON.parse(slotsString);
  const daysOfWeek = JSON.parse(daysOfWeekString);
  const slotMatrix = getSlotMatrix(slots, timings);

  return (
    <SlotGrid
      slotMatrix={slotMatrix}
      daysOfWeek={daysOfWeek}
      dateArray={dateArray}
    />
  );
}

export default withAdmin(CreateSlotsPage);

export async function getStaticProps() {
  const date = new Date();
  const day = date.getDay();
  const timings = getTimings();
  const dateArray = getDateArray(date);
  const daysOfWeek = getDaysofWeek(day);
  const daysOfWeekString = JSON.stringify(daysOfWeek);

  async function getSlots(dateArray: string[]) {
    try {
      const promises = dateArray.map(async (date) => {
        const docRef = doc(db, "Slots", date);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { ...docSnap.data(), date };
        } else {
          return null;
        }
      });

      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const result = await getSlots(dateArray);

  // remove all null values from slots
  const slots = result.filter((slot) => slot !== null);
  const slotsString = JSON.stringify(slots);

  return {
    props: {
      slotsString,
      timings,
      daysOfWeekString,
      dateArray,
    },
  };
}
