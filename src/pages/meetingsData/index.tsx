import { db } from "components/general/firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const MeetingsData = () => {
  const [meetingsData, setMeetingsData] = useState<any[]>([]);

  const getMeetingsData = async () => {
    const meetingCollectionRef = collection(db, "Meetings");
    const querySnapshot = await getDocs(meetingCollectionRef);
    setMeetingsData(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMeetingsData();
  }, []);

  return (
    <div>
      {meetingsData.map((meeting) => {
        return (
          <div key={meeting}>
            <h1>{meeting.age}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default MeetingsData;
