"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FundingNotificationContextType {
  isUpcomingBotVisible: boolean;
  setIsUpcomingBotVisible: (visible: boolean) => void;
}

const FundingNotificationContext = createContext<FundingNotificationContextType | undefined>(undefined);

export function FundingNotificationProvider({ children }: { children: ReactNode }) {
  const [isUpcomingBotVisible, setIsUpcomingBotVisible] = useState(false);

  return (
    <FundingNotificationContext.Provider value={{ isUpcomingBotVisible, setIsUpcomingBotVisible }}>
      {children}
    </FundingNotificationContext.Provider>
  );
}

export function useFundingNotification() {
  const context = useContext(FundingNotificationContext);
  if (context === undefined) {
    throw new Error("useFundingNotification must be used within a FundingNotificationProvider");
  }
  return context;
}
