# auto-tasks

Manifests that drive the **sequential auto-task dispatcher** (`.github/workflows/task-dispatcher.yml`).

Each plan lives in its own subdirectory:

```
.github/auto-tasks/<slug>/
  plan.md      # the approved plan (provenance)
  tasks.json   # ordered, atomic task manifest
```

`tasks.json` schema:

```json
{
  "slug": "<kebab-slug>",
  "paused": false,
  "max_tasks": 20,
  "tasks": [
    { "id": 1, "order": 1, "title": "…", "body": "…", "depends_on": [], "status": "pending" }
  ]
}
```

## How it works

1. Generate a manifest with the `/split-task` skill (after `/claudex` review of the plan).
2. Commit `<slug>/` to the default branch (or merge a PR adding it). That starts the chain.
3. The dispatcher opens the next eligible task as an `@claude` issue — one at a time, in dependency
   order, only when no task is in flight — and advances one task per merged PR.
4. Each issue runs the normal build loop (draft PR → `@codex review` → bridge). A human reviews and
   merges every PR; nothing is auto-merged.

## Controls

- **Stop:** set `"paused": true` in the manifest, or set repo variable `AUTO_TASKS_ENABLED=false`.
- **Cap:** `max_tasks` limits how many tasks the dispatcher will ever dispatch for a manifest.
- The `id`, `status`, and `issue` fields are managed by the dispatcher once a chain is running — set
  only `status: "pending"` when authoring; leave `issue` unset.

Only one manifest progresses at a time (the first active one found).
