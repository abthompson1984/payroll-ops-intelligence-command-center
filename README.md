# Payroll Ops Intelligence Command Center

A one-day MVP showcase for a Strategic Initiatives Principal role at Check.

This is a mock, synthetic-data simulation of an AI-first operating system for ambiguous embedded payroll operations problems. It demonstrates how I would go from messy operational signal to root-cause analysis, workflow design, executive recommendation, and durable operating model.

## Why This Exists

The Strategic Initiatives Principal role calls for someone who can get deep into the mechanics of a problem, simplify ambiguity, work across ops/product/engineering/revenue, deploy AI into operating workflows, and turn hard problems into scalable systems.

This demo is built around that exact pattern:

1. Ingest operational signals from payroll runs, support tickets, tax notices, onboarding status, and configuration changes.
2. Classify root causes and distinguish blockers from warnings.
3. Generate an action queue with owners, impact, and recommended next steps.
4. Produce an executive brief and target operating model.
5. Track the initiative through an MBR-style dashboard.

## Demo Scenario

A high-growth embedded payroll partner is seeing rising payroll blockers, tax notice escalations, and manual interventions. Leadership needs a clear diagnosis, a sequenced fix plan, and an operating model that can scale beyond heroics.

The app simulates how I would structure the problem and build the first version of an AI-assisted workflow to attack it.

## What It Shows

- **Command Center:** initiative-level metrics, root-cause mix, and weekly operating trend.
- **Work Queue:** AI-classified operational issues with severity, owner, source, impact, root cause, and recommendation.
- **Run Triage:** mock payroll approval review that flags blockers and warnings before approval.
- **Follow-Up Agent:** deterministic mock Q&A for explaining risk, drafting partner updates, and guiding first checks.
- **Strategic Brief:** generated problem statement, quantified impact, root causes, recommendation, and 30-day plan.
- **Operating Model:** draft workflow and SOP for making the process durable.

## Design Principles

- Mock mode only.
- Synthetic data only.
- No real Check data, customer data, or confidential employer/employee information.
- AI-first workflow design, but grounded in deterministic controls for known operational blockers.
- Built as a practical internal ops tool, not a marketing page.

## How To Run

Open `index.html` in a browser.

No dependencies, build step, API key, or backend required.

For a local server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://127.0.0.1:8080
```

## How I Would Extend This In Production

- Replace synthetic data with read-only integrations to payroll previews, support tickets, tax notice intake, onboard statuses, and configuration audit logs.
- Keep hard approval blockers deterministic and auditable.
- Use LLMs for narrative-heavy classification, summarization, partner updates, SOP selection, and executive brief generation.
- Add human-in-the-loop approval for partner communications and workflow changes.
- Track weekly outcomes through an MBR: blocker rate, manual intervention rate, resolution SLA, tax notice backlog, partner concentration, product defect conversion, and AI-assisted resolution rate.
- Feed repeated issue patterns back into product, engineering, and partner enablement roadmaps.

## Suggested Walkthrough

1. Start on the Command Center and explain the ambiguous business problem.
2. Open the Work Queue and show how messy signals become owned work.
3. Open Run Triage and show how the system prevents approval risk before payroll moves.
4. Ask the mock agent to draft a partner-facing update.
5. Open the Strategic Brief and explain how the same source of truth becomes an executive recommendation.
6. End on the Operating Model to show how the fix becomes a durable process.

## Personal Note To Customize

I built this as a fast, synthetic-data simulation of the kind of AI-first operating system I would want when taking on a messy strategic initiative at Check. My background sits at the intersection of operations transformation, AI agents, analytics, people leadership, and 0-to-1 program building, so I wanted the artifact to show how I think and build rather than only describe it.

Adam Brett Thompson  
abthompson1984@gmail.com
