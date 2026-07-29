export type BranchCategory = "Housing" | "Career" | "Major Purchase";

export type BranchMetric = {
  label: string;
  value: number;
  format: "currency" | "number" | "percentage";
};

export type BranchAssumption = {
  label: string;
  value: string;
};

export type SavedBranch = {
  id: string;
  title: string;
  category: BranchCategory;
  createdAt: string;
  years: number;
  description: string;
  projectedSavings: number;
  monthlyRemaining: number;
  metrics: BranchMetric[];
  assumptions: BranchAssumption[];
};