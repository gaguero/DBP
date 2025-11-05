# Codex Memory Bank Rules

These rule profiles keep the assistant aligned while working on the Dolphin Blue Paradise project. Load the rule that matches the current phase and keep the files in `memory/` up to date as you go.

## Memory Files
- `memory/product_context.md`: Constant background—review when joining the project or if product direction shifts.
- `memory/active_context.md`: Live focus for the open task. Update whenever goals, constraints, or success criteria change.
- `memory/tasks.md`: Running ledger of work. Add/edit rows as tasks evolve; avoid deleting history.
- `memory/progress.md`: Append timestamped summaries when meaningful progress happens or when you close out a focus area.

## Workflow
1. **Start / Reset** → load `rules/init.md` to ground yourself, refresh the memory files, and clarify objectives.
2. **Planning** → switch to `rules/plan.md` when turning a request into a concrete approach or updating the task ledger.
3. **Implementation** → use `rules/build.md` for heads-down coding, keeping `active_context.md` and `progress.md` in sync.
4. **Review & Handoff** → activate `rules/review.md` before handing work back or when wrapping a session to ensure documentation is current.

You can loop between PLAN ↔ BUILD as needed. Always check `progress.md` after each cycle so the next run starts with accurate history.

> Tip: When context becomes stale in `active_context.md`, move it into a dated entry in `progress.md` and replace it with the new focus rather than piling on bullets.
