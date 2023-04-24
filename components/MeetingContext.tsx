import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextType {
  token: string | null;
  meetingId: string | null;
  updateToken: (newToken: string | null) => void;
  updateMeetingId: (newMeetingId: string | null) => void;
}

interface MeetingProviderProps {
  children: React.ReactNode;
}

export const MeetingContext = createContext<ContextType>({
  token: null,
  meetingId: null,
  updateToken: () => {},
  updateMeetingId: () => {},
});

export const MeetingProvider = ({ children }: MeetingProviderProps) => {
  const [token, setToken] = useState<string | null>("");
  const [meetingId, setMeetingId] = useState<string | null>("");

  console.log(token, meetingId);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
  };

  const updateMeetingId = (newMeetingId: string | null) => {
    setMeetingId(newMeetingId);
  };

  return (
    <MeetingContext.Provider
      value={{ token, meetingId, updateToken, updateMeetingId }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => useContext(MeetingContext);
