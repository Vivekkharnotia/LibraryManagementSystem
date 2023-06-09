import { useMeeting } from "components/MeetingContext";
import MeetingsTable from "components/general/MeetingsTable/MeetingsTable";
import { MeetingType } from "components/general/TableComponents/Table.interface";
import { db } from "components/general/firebase-config";
import { endMeeting, getToken } from "controllers/meeting";
import {
    Timestamp,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";





function index({ meetingsDataString }: {meetingsDataString: string}) {
    
  const router = useRouter();
  const { updateToken } = useMeeting();
  const rows = JSON.parse(meetingsDataString);

  console.log(rows);

  // get the user id from active and set its activeMeetingId field to null
  const handleMeetingSuccess = async (userId: string, meetingId: string) => {
    const docRef = doc(db, "Userdata", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      // if meetings field exists in docData append the cuurent timestamp in it if not create and append
      await setDoc(
        docRef,
        {
          meetings: docData.meetings
            ? [...docData.meetings, Timestamp.now()]
            : [Timestamp.now()],
          activeMeetingId: null,
        },
        { merge: true }
      );

      // await setDoc(docRef, { activeMeetingId: null }, { merge: true });
      await deleteDoc(doc(db, "Meetings", meetingId));

      // end the meeting
      const token = await getToken();
      const res = await endMeeting({ roomId: meetingId, token });
      updateToken(token);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <>
        <MeetingsTable rows={rows} />   
    </>
    );
}

export default index;




export async function getStaticProps() {
  const querySnapshot = await getDocs(collection(db, "Meetings"));
  const meetingsData = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), meetingId: doc.id } as MeetingType)
  );

  const updatedMeetings = await Promise.all(
    meetingsData.map(async (meeting) => {

        const docSnap = await getDoc(doc(collection(db, `Userdata/${meeting.userId}/cases`), meeting.caseId));

        if (docSnap.exists()) {
            return { ...meeting, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return meeting;
        }
    })
  );

  const meetingsDataString = JSON.stringify(updatedMeetings);


  return { props: { meetingsDataString: meetingsDataString } };
}
