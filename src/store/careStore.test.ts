import { OPENING } from "@/lib/care";
import { useCareStore } from "./careStore";

test("Alessandro claiming groceries marks the row", () => {
  useCareStore.setState({ tasks: OPENING, actor: "alessandro" });
  useCareStore.getState().claimTask("groceries");
  expect(useCareStore.getState().tasks.find((task) => task.id === "groceries")?.doneBy).toBe(
    "alessandro",
  );
});
