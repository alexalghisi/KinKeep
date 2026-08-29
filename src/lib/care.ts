export type SiblingId = "alessandro" | "ioana" | "luca";

export type TaskKind = "meds" | "clinic" | "home";

export type Task = {
  id: string;
  title: string;
  kind: TaskKind;
  doneBy: SiblingId | null;
};

export const SIBLINGS: { id: SiblingId; name: string }[] = [
  { id: "alessandro", name: "Alessandro" },
  { id: "ioana", name: "Ioana" },
  { id: "luca", name: "Luca" },
];

export const OPENING: Task[] = [
  { id: "enapril-am", title: "Enalapril 8:00", kind: "meds", doneBy: "ioana" },
  { id: "cardio", title: "Cardiology, Cluj Heart", kind: "clinic", doneBy: "alessandro" },
  { id: "groceries", title: "Groceries for Elena", kind: "home", doneBy: null },
  { id: "enapril-pm", title: "Enalapril 20:00", kind: "meds", doneBy: null },
  { id: "pharmacy", title: "Refill at Catena", kind: "meds", doneBy: null },
  { id: "walk", title: "Afternoon walk", kind: "home", doneBy: "luca" },
];

export function load(tasks: Task[], sibling: SiblingId): number {
  return tasks.filter((task) => task.doneBy === sibling).length;
}

export function nextUp(tasks: Task[]): SiblingId {
  const ranked = SIBLINGS.map((sibling) => ({
    id: sibling.id,
    count: load(tasks, sibling.id),
  }));
  ranked.sort((a, b) => a.count - b.count || a.id.localeCompare(b.id));
  return ranked[0]?.id ?? "alessandro";
}

export function claim(tasks: Task[], taskId: string, sibling: SiblingId): Task[] {
  return tasks.map((task) =>
    task.id === taskId && task.doneBy === null ? { ...task, doneBy: sibling } : task,
  );
}
