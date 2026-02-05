/**
 * In-memory store for directory "Invite to Apply" threads.
 * On send: creates a message thread attached to the job and unlocks full profile for that employer.
 */

export type InviteThread = {
  employerId: string;
  workerId: string;
  jobId: string | number;
  jobTitle: string;
  message: string;
  workerName: string;
  time: string;
};

const inviteThreads: InviteThread[] = [];

export function addInvite(
  employerId: string,
  workerId: string,
  jobId: string | number,
  jobTitle: string,
  message: string,
  workerName: string
) {
  inviteThreads.push({
    employerId,
    workerId,
    jobId,
    jobTitle,
    message,
    workerName,
    time: "Just now",
  });
}

export function getThreadsForEmployer(employerId: string): InviteThread[] {
  return inviteThreads.filter((t) => t.employerId === employerId);
}

export function getUnlockedEmployerIds(workerId: string): string[] {
  return [...new Set(inviteThreads.filter((t) => t.workerId === workerId).map((t) => t.employerId))];
}

export function getInviteConversation(employerId: string, workerId: string): InviteThread | undefined {
  return inviteThreads.find((t) => t.employerId === employerId && t.workerId === workerId);
}
