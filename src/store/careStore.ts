import { create } from "zustand";
import { OPENING, SIBLINGS, claim, type SiblingId, type Task } from "@/lib/care";

export type CareScreen = "log" | "fair";

interface CareState {
  screen: CareScreen;
  actor: SiblingId;
  tasks: Task[];
  setScreen: (screen: CareScreen) => void;
  setActor: (actor: SiblingId) => void;
  claimTask: (taskId: string) => void;
  reset: () => void;
}

export const useCareStore = create<CareState>((set, get) => ({
  screen: "log",
  actor: "alessandro",
  tasks: OPENING,
  setScreen: (screen) => set({ screen }),
  setActor: (actor) => set({ actor }),
  claimTask: (taskId) => set({ tasks: claim(get().tasks, taskId, get().actor) }),
  reset: () => set({ tasks: OPENING, screen: "log" }),
}));

export { SIBLINGS };
