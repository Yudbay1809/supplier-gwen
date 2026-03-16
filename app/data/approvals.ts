export type ApprovalStep = {
  title: string;
  actor: string;
  date: string;
  status: "done" | "pending" | "rejected";
};

type ApprovalHistory = {
  kontrabonId: string;
  steps: ApprovalStep[];
};

export const approvalHistories: ApprovalHistory[] = [
  {
    kontrabonId: "KB-2403-001",
    steps: [
      { title: "Submit dokumen", actor: "Supplier Gwen", date: "12 Mar 2026", status: "done" },
      { title: "Review finance", actor: "Finance Team", date: "13 Mar 2026", status: "pending" },
      { title: "Approve pembayaran", actor: "Manager", date: "-", status: "pending" },
    ],
  },
  {
    kontrabonId: "KB-2402-007",
    steps: [
      { title: "Submit dokumen", actor: "Supplier Gwen", date: "10 Feb 2026", status: "done" },
      { title: "Review finance", actor: "Finance Team", date: "12 Feb 2026", status: "done" },
      { title: "Approve pembayaran", actor: "Manager", date: "13 Feb 2026", status: "done" },
    ],
  },
];
