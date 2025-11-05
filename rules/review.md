# Rule: REVIEW (Wrap & Handoff)

**Purpose**  
Validate the work, clean up context, and leave behind a clear trail for the next session or reviewer.

**When to use**  
- After completing implementation for a task  
- Before requesting review, opening a PR, or ending the day  
- When transitioning ownership to another collaborator

**Checklist**
1. Verify acceptance criteria and success metrics in `memory/active_context.md` are satisfied.
2. Run or re-run required checks (tests, lint, build) and record outcomes or gaps.
3. Summarize results in `memory/progress.md`:
   - What changed (files/modules, high-level behavior)
   - Testing performed and outcomes
   - Follow-up tasks, bugs, or questions
4. Update `memory/tasks.md`:
   - Mark completed tasks as `done`.
   - Add new tasks for discovered follow-ups.
5. Reset `memory/active_context.md`:
   - Either set a new focus or leave a note pointing to the next priority.
6. Capture any communication notes (PR URL, reviewer instructions) in `progress.md` or the task notes.

**Exit Conditions**
- Documentation and task states match reality.
- Next steps (if any) are explicit with owners.
- No critical context remains only in your head—everything needed for continuity lives in the memory files.
