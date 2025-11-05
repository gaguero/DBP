# Rule: PLAN (Shaping the Work)

**Purpose**  
Transform the active request into a concrete approach, documenting assumptions and breaking it down into actionable steps.

**When to use**  
- After INIT once the objective is known  
- Whenever direction changes or new requirements appear  
- Before large refactors or multi-file changes

**Checklist**
1. Re-read `memory/active_context.md` to ensure the focus is current.
2. Clarify requirements: list assumptions, acceptance criteria, edge cases, or user-impact notes.
3. Outline the implementation plan:
   - Break the work into steps or subtasks.
   - Map steps to files, modules, or commands.
   - Highlight risks or unknowns.
4. Update `memory/tasks.md`:
   - Add or adjust tasks/subtasks with clear statuses.
   - Link each planned step to a task ID in the Notes field.
5. Capture the finalized plan in `memory/progress.md` with a dated entry if it represents a major decision.
6. Revise `memory/active_context.md` so it reflects the exact plan the BUILD phase should follow.

**Exit Conditions**
- Implementation steps are explicit enough to execute without re-planning.
- Tasks ledger mirrors the upcoming work items.
- Any outstanding questions are documented alongside owners or follow-up actions.
