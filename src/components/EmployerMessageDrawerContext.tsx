"use client";

import { createContext, useContext, useState } from "react";
import { EmployerMessageDrawer } from "@/components/EmployerMessageDrawer";
import { getMessageForWorkerId, type MessageListItem } from "@/lib/employer-messages";

type MessageDrawerWorker = { id: string; name: string; image: string };

type EmployerMessageDrawerContextValue = {
  openDrawer: (workerId: string) => void;
  openDrawerWithMessage: (message: MessageListItem) => void;
  openMessageDrawer: (worker: MessageDrawerWorker, jobTitle: string) => void;
};

const EmployerMessageDrawerContext = createContext<EmployerMessageDrawerContextValue | null>(null);

export function useEmployerMessageDrawer() {
  return useContext(EmployerMessageDrawerContext);
}

export function EmployerMessageDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageListItem | null>(null);

  const openDrawer = (workerId: string) => {
    const message = getMessageForWorkerId(workerId);
    if (message) {
      setSelectedMessage(message);
      setIsOpen(true);
    }
  };

  const openDrawerWithMessage = (message: MessageListItem) => {
    setSelectedMessage(message);
    setIsOpen(true);
  };

  const openMessageDrawer = (worker: MessageDrawerWorker, jobTitle: string) => {
    setSelectedMessage({
      id: 0,
      workerId: worker.id,
      workerName: worker.name,
      workerImage: worker.image,
      jobTitle: jobTitle || "Application",
      lastMessage: "",
      time: "",
      unread: false,
    });
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setSelectedMessage(null);
  };

  return (
    <EmployerMessageDrawerContext.Provider
      value={{ openDrawer, openDrawerWithMessage, openMessageDrawer }}
    >
      {children}
      <EmployerMessageDrawer
        open={isOpen}
        onOpenChange={handleOpenChange}
        selectedMessage={selectedMessage}
      />
    </EmployerMessageDrawerContext.Provider>
  );
}
