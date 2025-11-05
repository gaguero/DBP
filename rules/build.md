# Rule: BUILD (Implementation)

**Purpose**  
Execute the planned changes while keeping shared memory accurate and lightweight.

**When to use**  
- After completing PLAN  
- While actively coding, refactoring, or writing tests  
- During iterative fixes on the same task

**Checklist**
1. Follow the sequence documented in `memory/active_context.md`.
2. As you modify files:
   - Keep commits or code blocks scoped to the plan.
   - Note deviations or discoveries so they can be logged later.
3. Run relevant commands (formatters, tests, builds) and capture outcomes.
4. Update `memory/tasks.md` statuses as subtasks complete or new work emerges.
5. If the plan changes, pause BUILD, switch back to PLAN, and revise the memory files before continuing.
6. Add succinct entries to `memory/progress.md` once a meaningful chunk of work lands (especially bugs fixed, tests run, blockers found).

**Exit Conditions**
- Code matches the agreed plan or updated plan.
- Tests/linters relevant to the change set have been run or a reason for omission is documented.
- `tasks.md` and `active_context.md` reflect the current state (e.g., task moved to `done`, new follow-up task added).
