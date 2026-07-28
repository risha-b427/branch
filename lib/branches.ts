import type { SavedBranch } from "@/lib/types";

const STORAGE_KEY = "branches";

export function getBranches(): SavedBranch[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedBranches = localStorage.getItem(STORAGE_KEY);

    return savedBranches ? JSON.parse(savedBranches) : [];
  } catch {
    return [];
  }
}

export function saveBranches(branches: SavedBranch[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(branches));
}

export function addBranch(branch: SavedBranch) {
  const branches = getBranches();
  saveBranches([...branches, branch]);
}

export function getBranchById(id: string) {
  const branches = getBranches();

  return branches.find((branch) => branch.id === id);
}

export function removeBranch(id: string) {
  const branches = getBranches();
  const updatedBranches = branches.filter((branch) => branch.id !== id);

  saveBranches(updatedBranches);

  return updatedBranches;
}