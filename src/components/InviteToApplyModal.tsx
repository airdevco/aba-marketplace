"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Job {
  id: number | string;
  title: string;
  location: string;
}

interface InviteToApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateLabel: string; // e.g., "RBT Candidate" or "Sarah Williams"
  candidateId: string;
  jobs: Job[];
  onSend: (jobId: string | number, message: string) => void;
}

export function InviteToApplyModal({
  isOpen,
  onClose,
  candidateLabel,
  candidateId,
  jobs,
  onSend,
}: InviteToApplyModalProps) {
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!selectedJobId || !message.trim()) return;

    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSend(selectedJobId, message);
    
    // Reset form
    setSelectedJobId("");
    setMessage("");
    setIsSending(false);
    onClose();
  };

  const handleCancel = () => {
    setSelectedJobId("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent overlayClassName="bg-black/40" className="sm:max-w-lg bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle>Invite {candidateLabel} to Apply</DialogTitle>
          <DialogDescription>
            Select a job posting and send a personalized invitation. Your full company profile will be visible to the candidate.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Candidate Info */}
          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Candidate ID:</span> #{candidateId}
            </p>
          </div>

          {/* Job Selection */}
          <div className="space-y-2">
            <Label htmlFor="job-select">Select a Job</Label>
            <Select value={selectedJobId || undefined} onValueChange={setSelectedJobId}>
              <SelectTrigger id="job-select">
                <SelectValue placeholder="Choose a job posting..." />
              </SelectTrigger>
              <SelectContent>
                {jobs.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">
                    No active jobs available
                  </div>
                ) : (
                  jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id.toString()}>
                      {job.title} - {job.location}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="invite-message">Your Message</Label>
            <Textarea
              id="invite-message"
              placeholder="Hi, we came across your profile and think you'd be a great fit for this position..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/500
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isSending}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="cursor-pointer"
          >
            {isSending ? "Sending..." : "Send Invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
