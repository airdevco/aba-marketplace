/**
 * Shared employer message/conversation data and helpers.
 * Used by employer-portal layout, profile page, and EmployerMessageDrawer.
 */

import { getInviteConversation, getThreadsForEmployer } from "./invite-store";

export const EMPLOYER_ID = "E1";
export const EMPLOYER_COMPANY_LOGO =
  "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769558510329x965473798247719000/1024favicon.png";

export type MessageItem = {
  id: number;
  sender: "employer" | "worker";
  senderName?: string;
  senderCompany?: string;
  senderCompanyLogo?: string;
  senderImage?: string;
  text: string;
  time: string;
};

export type MessageListItem = {
  id: number;
  workerId: string;
  workerName: string;
  workerImage: string;
  jobTitle: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

export const unreadMessages: MessageListItem[] = [
  {
    id: 1,
    workerId: "EF454GR",
    workerName: "Sarah Williams",
    workerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    jobTitle: "RBT - Full Time",
    lastMessage: "Hi, I'm very interested in this position.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    workerId: "XY987ZW",
    workerName: "Jessica Davis",
    workerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    jobTitle: "BCBA - Clinic Director",
    lastMessage: "Thank you! I've been working in the field...",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    workerId: "LM456OP",
    workerName: "David Wilson",
    workerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    jobTitle: "RBT - Part Time",
    lastMessage: "Yes, I am available tomorrow afternoon.",
    time: "3 hours ago",
    unread: true,
  },
];

export const applicantDisplayInfo: Record<
  string,
  { workerName: string; jobTitle: string; workerImage: string }
> = {
  EF454GR: {
    workerName: "Sarah Williams",
    jobTitle: "RBT - Full Time",
    workerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  AB123CD: {
    workerName: "Michael Chen",
    jobTitle: "RBT - Part Time",
    workerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  XY987ZW: {
    workerName: "Jessica Davis",
    jobTitle: "BCBA - Clinic Director",
    workerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  LM456OP: {
    workerName: "David Wilson",
    jobTitle: "RBT - Part Time",
    workerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  QR789ST: {
    workerName: "Emily Johnson",
    jobTitle: "BCBA Application",
    workerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  UV321WX: {
    workerName: "Robert Taylor",
    jobTitle: "RBT Application",
    workerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  JK654MN: {
    workerName: "Jennifer Brown",
    jobTitle: "Clinical Supervisor",
    workerImage: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=400&h=400&fit=crop",
  },
  GH987IJ: {
    workerName: "James Miller",
    jobTitle: "RBT Application",
    workerImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
  },
  DE123FG: {
    workerName: "Ashley Moore",
    jobTitle: "BCBA Position",
    workerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  BC456HI: { workerName: "Candidate", jobTitle: "RBT Application", workerImage: "" },
};

const workerConversationsByWorkerId: Record<
  string,
  Array<{ sender: "employer" | "worker"; text: string; time: string }>
> = {
  EF454GR: [
    { sender: "employer", text: "Hi {name}, thanks for your application to our RBT - Full Time role. Are you available for a quick call this week?", time: "Jan 28, 2:30 PM" },
    { sender: "worker", text: "Hi! Yes, I'm very interested. I have 3 years of experience in center-based and in-home ABA. I'm available Tuesday or Wednesday afternoon.", time: "Jan 28, 3:45 PM" },
    { sender: "employer", text: "Great. Let's schedule for Tuesday at 2 PM. I'll send a calendar invite. Do you have any questions about the role?", time: "Jan 28, 4:15 PM" },
    { sender: "worker", text: "Thank you! I'd like to know more about the caseload and supervision structure. Looking forward to Tuesday.", time: "Jan 29, 9:00 AM" },
  ],
  AB123CD: [
    { sender: "employer", text: "Hi {name}, we received your application for our RBT - Part Time position. Can you tell us more about your availability?", time: "Jan 27, 11:00 AM" },
    { sender: "worker", text: "Hi! I'm available weekdays after 2 PM and some weekends. I have one year of experience in school-based settings.", time: "Jan 27, 2:20 PM" },
    { sender: "employer", text: "That works well for us. We have afternoon sessions open. When could you start?", time: "Jan 28, 10:00 AM" },
  ],
  XY987ZW: [
    { sender: "employer", text: "Hi {name}, thank you for applying to our BCBA - Clinic Director role. Your experience looks like a great fit. Are you available for a video call?", time: "Jan 26, 3:00 PM" },
    { sender: "worker", text: "Thank you! I've been working in the field for 5 years and am very interested in the Clinic Director opportunity. I'm free Thursday or Friday this week.", time: "Jan 26, 5:30 PM" },
    { sender: "employer", text: "Perfect. Let's do Friday at 10 AM. I'll send the Zoom link. We'll discuss the team structure and your vision for the role.", time: "Jan 27, 9:00 AM" },
    { sender: "worker", text: "Sounds great. I'll prepare some questions about the clinic and caseload. Talk Friday!", time: "Jan 27, 11:00 AM" },
  ],
  LM456OP: [
    { sender: "employer", text: "Hi {name}, thanks for your interest in our RBT - Part Time position. Are you still available for afternoon and weekend hours?", time: "Jan 29, 1:00 PM" },
    { sender: "worker", text: "Yes, I am available tomorrow afternoon. I have 2 years of experience and am looking for a part-time role to balance with grad school.", time: "Jan 29, 2:45 PM" },
    { sender: "employer", text: "Great, I'll have our coordinator reach out to schedule an interview. We'd love to have you on the team.", time: "Jan 29, 3:30 PM" },
  ],
  QR789ST: [
    { sender: "employer", text: "Hi {name}, we'd like to discuss your BCBA application. Your background in telehealth is a plus. When are you free for a call?", time: "Jan 25, 4:00 PM" },
    { sender: "worker", text: "Thank you! I'm very interested. I have 4 years of post-certification experience. I'm free Monday or Wednesday next week.", time: "Jan 26, 10:00 AM" },
  ],
  UV321WX: [
    { sender: "employer", text: "Hi {name}, we've reviewed your application. Unfortunately we've decided to move forward with other candidates for this role. We'll keep your resume on file.", time: "Jan 28, 11:00 AM" },
    { sender: "worker", text: "I understand. Thank you for letting me know. I'd appreciate being considered for future openings.", time: "Jan 28, 2:00 PM" },
  ],
  JK654MN: [
    { sender: "employer", text: "Hi {name}, thanks for applying. We'd like to schedule a call to discuss your experience with clinical supervision. Are you available this week?", time: "Jan 27, 3:00 PM" },
    { sender: "worker", text: "Hi, I'd love to learn more about the position. I have 7 years of experience. I'm available Thursday afternoon or Friday morning.", time: "Jan 28, 9:00 AM" },
  ],
  GH987IJ: [
    { sender: "employer", text: "Hi {name}, we liked your profile for our RBT role. Can you tell us about your availability for weekdays and weekends?", time: "Jan 29, 10:00 AM" },
    { sender: "worker", text: "Hi! I'm available weekdays and some weekends. I have 2 years of experience in center-based ABA. When would be a good time to talk?", time: "Jan 29, 12:30 PM" },
  ],
  DE123FG: [
    { sender: "employer", text: "Hi {name}, thank you for your application. We're scheduling interviews for our BCBA position. Are you available next week?", time: "Jan 26, 2:00 PM" },
    { sender: "worker", text: "Thanks for reaching out! I'm definitely interested. I have 3 years of experience. I can do Tuesday or Wednesday.", time: "Jan 26, 4:00 PM" },
  ],
  BC456HI: [
    { sender: "employer", text: "Hi {name}, we received your application for our RBT role. We'd like to invite you for an interview. Are you available this week?", time: "Jan 28, 9:00 AM" },
    { sender: "worker", text: "Yes! I have 1.5 years of experience and am very interested. I'm free Thursday or Friday. Thank you!", time: "Jan 28, 11:00 AM" },
  ],
};

export function getMessagesForWorker(worker: {
  workerId: string;
  workerName: string;
  workerImage: string;
}): MessageItem[] {
  if (!worker) return [];
  const invite = getInviteConversation(EMPLOYER_ID, worker.workerId);
  if (invite) {
    return [
      {
        id: 1,
        sender: "employer",
        senderName: "Andrew Johnson",
        senderCompany: "Airdev",
        senderCompanyLogo: EMPLOYER_COMPANY_LOGO,
        text: invite.message,
        time: invite.time,
      },
    ];
  }
  const firstName = worker.workerName.split(" ")[0];
  const conversation = workerConversationsByWorkerId[worker.workerId];
  if (conversation) {
    return conversation.map((msg, i) => ({
      id: i + 1,
      sender: msg.sender as "employer" | "worker",
      senderName: msg.sender === "employer" ? "Andrew Johnson" : worker.workerName,
      senderCompany: msg.sender === "employer" ? "Airdev" : undefined,
      senderCompanyLogo: msg.sender === "employer" ? EMPLOYER_COMPANY_LOGO : undefined,
      senderImage: msg.sender === "worker" ? worker.workerImage : undefined,
      text: msg.sender === "employer" ? msg.text.replace(/\{name\}/g, firstName) : msg.text,
      time: msg.time,
    }));
  }
  return [
    {
      id: 1,
      sender: "employer",
      senderName: "Andrew Johnson",
      senderCompany: "Airdev",
      senderCompanyLogo: EMPLOYER_COMPANY_LOGO,
      text: `Hi ${firstName}, thanks for your application. Are you available for a quick call?`,
      time: "Yesterday 2:30 PM",
    },
    {
      id: 2,
      sender: "worker",
      senderName: worker.workerName,
      senderImage: worker.workerImage,
      text: (worker as { lastMessage?: string }).lastMessage || "Thanks for reaching out! I'd love to connect.",
      time: (worker as { time?: string }).time || "Yesterday 3:00 PM",
    },
  ];
}

export function getAllMessages(): MessageListItem[] {
  const inviteThreads = getThreadsForEmployer(EMPLOYER_ID);
  const fromInvites: MessageListItem[] = inviteThreads.map((t, i) => ({
    id: 1000 + i,
    workerId: t.workerId,
    workerName: t.workerName,
    workerImage: "",
    jobTitle: t.jobTitle,
    lastMessage: t.message,
    time: t.time,
    unread: true,
  }));
  return [...unreadMessages, ...fromInvites];
}

export function getMessageForWorkerId(workerId: string): MessageListItem {
  const invite = getInviteConversation(EMPLOYER_ID, workerId);
  const applicant = applicantDisplayInfo[workerId];
  return {
    id: -1,
    workerId,
    workerName: invite?.workerName ?? applicant?.workerName ?? "Candidate",
    workerImage: applicant?.workerImage ?? "",
    jobTitle: invite?.jobTitle ?? applicant?.jobTitle ?? "Application",
    lastMessage: invite?.message ?? "",
    time: invite?.time ?? "",
    unread: false,
  };
}
