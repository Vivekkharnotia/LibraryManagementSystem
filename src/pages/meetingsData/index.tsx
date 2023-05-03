import { db } from "components/general/firebase-config";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface MeetingType {
  userId: string;
  meetingId: string;
  userData?: any;
}

interface MeetingsDataProps {
  meetingsData: MeetingType[];
}

const MeetingsData = ({ meetingsData }: MeetingsDataProps) => {
  // const [meetingsData, setMeetingsData] = useState<MeetingType[]>([]);

  // const getMeetingsData = async () => {
  //   const meetingCollectionRef = collection(db, "Meetings");
  //   const querySnapshot = await getDocs(meetingCollectionRef);
  //   setMeetingsData(querySnapshot.docs.map((doc) => doc.data() as MeetingType));
  // };

  // fetch the user info using meetingsData.userId from firebase and add that data to the meetingsData array
  // const addUserDataInMeeting = async (meeting: MeetingType) => {
  //   const docRef = doc(db, "Userdata", meeting?.userId);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     const userData = docSnap.data();
  //     const updatedMeeting = { ...meeting, userData };
  //     return updatedMeeting;
  //   } else {
  //     console.log("No such document!");
  //     return meeting;
  //   }
  // };

  // const addUserDataInMeetings = async () => {
  //   const updatedMeetings = await Promise.all(
  //     meetingsData.map(addUserDataInMeeting)
  //   );
  //   setMeetingsData(updatedMeetings);
  // };

  // useEffect(() => {
  //   getMeetingsData();

  //   // fetch info about users and add to meetingsData
  //   if (meetingsData.length > 0) {
  //     addUserDataInMeetings();
  //   }
  // }, []);

  // get the user id from active and set its activeMeetingId field to null
  const handleMeetingSuccess = async (userId: string, meetingId: string) => {
    const docRef = doc(db, "Userdata", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { activeMeetingId: null }, { merge: true });
      await deleteDoc(doc(db, "Meetings", meetingId));
    } else {
      console.log("No such document!");
    }
  };

  return (
    <div>
      {meetingsData.map((meeting) => {
        return (
          <>
            <div
              key={meeting.meetingId}
              className="flex p-1 items-center gap-2 bg-white"
            >
              <h1>
                {meeting.userId} - {meeting.meetingId}
              </h1>
              <button
                className="p-1 border-[1px] border-black rounded-lg"
                onClick={() =>
                  handleMeetingSuccess(meeting.userId, meeting.meetingId)
                }
              >
                Success
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MeetingsData;

export async function getStaticProps() {
  const meetingCollectionRef = collection(db, "Meetings");
  const querySnapshot = await getDocs(meetingCollectionRef);
  const meetingsData = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), meetingId: doc.id } as MeetingType)
  );

  const updatedMeetings = await Promise.all(
    meetingsData.map(async (meeting) => {
      const docRef = doc(db, "Userdata", meeting?.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        return { ...meeting, userData };
      } else {
        console.log("No such document!");
        return meeting;
      }
    })
  );

  return { props: { meetingsData: updatedMeetings } };
}
