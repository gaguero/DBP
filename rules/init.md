# Rule: INIT (Session Kickoff)

**Purpose**  
Ground the assistant at the start of a session or after a long break so the current focus, tasks, and constraints are accurate.

**When to use**  
- Before starting new work  
- After context loss or switching to a different feature/bug  
- When onboarding another collaborator

**Checklist**
1. Review `memory/product_context.md` for high-level guardrails.
2. Scan the latest entries in `memory/progress.md` to understand recent changes and open questions.
3. Read `memory/tasks.md` and identify which task(s) should be active. If none apply, add a new row.
4. Update `memory/active_context.md`:
   - Describe the immediate goal and why it matters.
   - Capture relevant files/commands.
   - Note success criteria and constraints.
5. Confirm tooling or environment requirements (commands to run, services to start).
6. If scope is unclear, document open questions in `active_context.md` and plan to resolve them during PLAN.

**Exit Conditions**
- `active_context.md` accurately reflects the current objective.
- `tasks.md` has a clear “next task” marked as `in-progress`.
- Any gaps or risks are written down for follow-up during planning.
