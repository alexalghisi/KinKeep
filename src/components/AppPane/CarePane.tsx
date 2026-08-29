import { Button } from "@/components/ui/button";
import { SIBLINGS, load, nextUp } from "@/lib/care";
import { useCareStore } from "@/store/careStore";

export function CarePane() {
  const screen = useCareStore((state) => state.screen);
  const actor = useCareStore((state) => state.actor);
  const tasks = useCareStore((state) => state.tasks);
  const setActor = useCareStore((state) => state.setActor);
  const claimTask = useCareStore((state) => state.claimTask);
  const suggested = nextUp(tasks);

  if (screen === "fair") {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-5">
        <p className="text-[13px] text-muted-foreground">
          Next up is <span className="font-medium text-foreground">{suggested}</span> — fewest done
          tasks, then name order.
        </p>
        {SIBLINGS.map((sibling) => (
          <div key={sibling.id} data-testid={`fair-${sibling.id}`}>
            <div className="mb-1 flex justify-between text-[13px]">
              <span>{sibling.name}</span>
              <span className="tabular-nums">{String(load(tasks, sibling.id))}</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${String((load(tasks, sibling.id) / Math.max(1, tasks.length)) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex gap-1 border-b border-border px-4 py-2">
        {SIBLINGS.map((sibling) => (
          <Button
            key={sibling.id}
            variant={actor === sibling.id ? "default" : "outline"}
            size="sm"
            className="h-7 rounded-md px-2 text-[12px]"
            data-testid={`actor-${sibling.id}`}
            onClick={() => setActor(sibling.id)}
          >
            {sibling.name}
          </Button>
        ))}
      </div>
      <ul className="min-h-0 flex-1 overflow-auto p-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            data-testid={`task-${task.id}`}
            className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 hover:bg-muted/60"
          >
            <div>
              <p className="text-[14px] font-medium">{task.title}</p>
              <p className="text-[12px] text-muted-foreground">
                {task.doneBy === null ? "Open" : `Done · ${task.doneBy}`}
              </p>
            </div>
            {task.doneBy === null ? (
              <Button
                size="sm"
                className="h-8 rounded-full px-3 text-[12px]"
                data-testid={`claim-${task.id}`}
                onClick={() => claimTask(task.id)}
              >
                I did this
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
