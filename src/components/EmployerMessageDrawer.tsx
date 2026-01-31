"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  getMessagesForWorker,
  type MessageItem,
  type MessageListItem,
} from "@/lib/employer-messages";

type EmployerMessageDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMessage: MessageListItem | null;
};

export function EmployerMessageDrawer({
  open,
  onOpenChange,
  selectedMessage,
}: EmployerMessageDrawerProps) {
  const [messageInput, setMessageInput] = useState("");
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const adjustMessageInputHeight = () => {
    const textarea = messageInputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const lineHeight = 20;
    const maxHeight = lineHeight * 3;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  useEffect(() => {
    adjustMessageInputHeight();
  }, [messageInput]);

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) setMessageInput("");
  };

  const currentMessages: MessageItem[] = selectedMessage
    ? getMessagesForWorker(selectedMessage)
    : [];

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col h-full">
        <SheetHeader className="border-b pb-4">
          <VisuallyHidden>
            <SheetTitle>Conversation with {selectedMessage?.workerName}</SheetTitle>
            <SheetDescription>Messages regarding {selectedMessage?.jobTitle}</SheetDescription>
          </VisuallyHidden>
          {selectedMessage && (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border">
                <img
                  src={selectedMessage.workerImage || ""}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="font-semibold text-sm truncate w-full">
                  {selectedMessage.workerName}
                </span>
                <span className="text-xs text-foreground truncate">{selectedMessage.jobTitle}</span>
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "employer" ? "items-end" : "items-start"}`}
              >
                {msg.sender === "employer" && msg.senderName && (
                  <div className="text-xs font-medium text-black mb-1 px-1">
                    {msg.senderName} from {msg.senderCompany}
                  </div>
                )}
                <div
                  className={`flex ${msg.sender === "employer" ? "flex-col items-end" : "items-end gap-2"} max-w-[85%]`}
                >
                  {msg.sender === "worker" && "senderImage" in msg && msg.senderImage && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white border self-end">
                      <img src={msg.senderImage} alt="" className="w-full h-full object-cover" />
                    </span>
                  )}
                  <div
                    className={`flex flex-col ${msg.sender === "employer" ? "items-end" : "items-start"} flex-1 min-w-0`}
                  >
                    {msg.sender === "worker" && msg.senderName && (
                      <div className="text-xs font-medium text-black mb-1">{msg.senderName}</div>
                    )}
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        msg.sender === "employer"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === "employer" && (
                      <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                    )}
                  </div>
                </div>
                {msg.sender === "worker" && (
                  <span className="text-[10px] text-muted-foreground mt-1 px-1 max-w-[85%] ml-10">
                    {msg.time}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="pt-4 mt-auto">
          <div className="relative w-full">
            <Textarea
              ref={messageInputRef}
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onInput={adjustMessageInputHeight}
              rows={1}
              className="w-full min-h-[48px] max-h-[60px] overflow-y-auto resize-none py-3 pr-12"
            />
            <Button
              size="icon"
              className="absolute bottom-2.5 right-2.5 h-8 w-8 shrink-0"
              onClick={() => setMessageInput("")}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
