const state = {
  selectedRunId: "run-1042",
  severity: "all",
  owner: "all",
  impactSort: false,
};

const metrics = [
  {
    label: "Payroll blocker rate",
    value: "14.6%",
    note: "Target operating threshold: below 6%",
    delta: "+5.8 pts vs prior 8 weeks",
    bad: true,
  },
  {
    label: "Tax notice backlog",
    value: "31",
    note: "18 are connected to agency registration gaps",
    delta: "+11 open notices",
    bad: true,
  },
  {
    label: "Manual intervention rate",
    value: "18%",
    note: "Driven by setup defects and late run changes",
    delta: "+7 pts vs baseline",
    bad: true,
  },
  {
    label: "AI-assisted resolution",
    value: "42%",
    note: "Triage drafts, SOP selection, partner updates",
    delta: "+24 pts after pilot",
    bad: false,
  },
];

const issueMix = [
  { label: "Onboarding gap", count: 14, color: "#2559d6" },
  { label: "Agency registration", count: 11, color: "#b42318" },
  { label: "Payroll anomaly", count: 8, color: "#a76112" },
  { label: "Integration defect", count: 6, color: "#147d86" },
  { label: "Process gap", count: 4, color: "#1f7a4d" },
];

const weeklyTrend = [
  { week: "W1", blockers: 27, manual: 31 },
  { week: "W2", blockers: 25, manual: 30 },
  { week: "W3", blockers: 24, manual: 28 },
  { week: "W4", blockers: 22, manual: 25 },
  { week: "W5", blockers: 18, manual: 21 },
  { week: "W6", blockers: 16, manual: 19 },
  { week: "W7", blockers: 13, manual: 16 },
  { week: "W8", blockers: 10, manual: 13 },
];

const priorities = [
  {
    title: "Pause approval on companies with blocking onboard status and new-state workplaces.",
    impact: "Estimated 38% of preventable escalations",
    why: "The largest cluster is companies that were previously cleared, then became blocked after a new workplace triggered missing state-specific setup.",
    owner: "Ops + Product",
    tags: ["Critical", "Onboard status", "Workflow"],
  },
  {
    title: "Create a pre-payroll registration gate for agency accounts and power-of-attorney forms.",
    impact: "18 tax notices tied to the same setup failure mode",
    why: "Tax notice handling is currently downstream and reactive. The failure should be prevented before the first impacted run.",
    owner: "Risk + Ops",
    tags: ["High", "Tax notices", "SOP"],
  },
  {
    title: "Ship partner-facing payroll readiness score and action queue.",
    impact: "Reduces manual chasing across support and partner success",
    why: "Partner teams need a single view of what is blocking payroll, who owns it, and what can be automated.",
    owner: "Product + Engineering",
    tags: ["High", "Partner experience", "AI workflow"],
  },
];

const workItems = [
  {
    id: "ISS-117",
    title: "New CA workplace created after onboarding completion, state forms unsigned",
    source: "support ticket + onboard status change",
    severity: "Critical",
    owner: "Ops",
    impact: 94,
    rootCause: "Onboarding gap",
    recommendation: "Block approval, surface Onboard Component, and notify partner owner with required forms.",
  },
  {
    id: "ISS-121",
    title: "Quarterly tax notice received for employer with missing agency account mapping",
    source: "tax notice intake",
    severity: "High",
    owner: "Risk",
    impact: 88,
    rootCause: "Agency registration",
    recommendation: "Create registration task, attach notice, and include in weekly tax notice review until closed.",
  },
  {
    id: "ISS-125",
    title: "Hourly employee shows 73 hours after averaging 38 hours across prior runs",
    source: "payroll preview",
    severity: "High",
    owner: "Ops",
    impact: 77,
    rootCause: "Payroll anomaly",
    recommendation: "Verify timesheet import and require partner confirmation before approval.",
  },
  {
    id: "ISS-128",
    title: "Contractor payment included with missing bank account validation",
    source: "contractor payment payload",
    severity: "Critical",
    owner: "Engineering",
    impact: 91,
    rootCause: "Integration defect",
    recommendation: "Add validation before payload submission and backfill existing affected contractors.",
  },
  {
    id: "ISS-132",
    title: "Manual support escalation opened after product already displayed a blocking payroll state",
    source: "support ticket audit",
    severity: "Medium",
    owner: "Product",
    impact: 56,
    rootCause: "Process gap",
    recommendation: "Update partner messaging and route known blocker states to self-serve remediation.",
  },
  {
    id: "ISS-140",
    title: "Pay schedule changed without corresponding payroll calendar review",
    source: "configuration audit",
    severity: "Medium",
    owner: "Ops",
    impact: 49,
    rootCause: "Process gap",
    recommendation: "Add pay schedule change checklist and owner approval for affected companies.",
  },
];

const payrollRuns = [
  {
    id: "run-1042",
    company: "Brightline Field Services",
    partner: "Vertical Workforce Platform",
    payday: "2026-05-22",
    employees: 42,
    contractors: 6,
    grossPay: "$118,430",
    previousGrossPay: "$92,210",
    status: "Review required",
    findings: [
      {
        severity: "Critical",
        title: "Company onboard status is blocking after a new CA workplace was added.",
        explanation: "The run includes earnings tied to a workplace that appears to require additional state setup before payroll should be approved.",
        action: "Pause approval, surface the onboarding flow, and confirm state forms are complete.",
      },
      {
        severity: "High",
        title: "Gross payroll increased 28% run-over-run without matching headcount change.",
        explanation: "The increase is concentrated in overtime for six hourly workers and one rate change.",
        action: "Ask partner to confirm imported hours and approval trail before processing.",
      },
      {
        severity: "Medium",
        title: "Two contractors have payments but incomplete bank validation status.",
        explanation: "Contractor payments should not advance until payment method readiness is confirmed.",
        action: "Route to payment setup remediation and exclude affected payments if needed.",
      },
    ],
  },
  {
    id: "run-1043",
    company: "Northstar Clinics",
    partner: "Healthcare Scheduling SaaS",
    payday: "2026-05-24",
    employees: 19,
    contractors: 1,
    grossPay: "$64,100",
    previousGrossPay: "$63,870",
    status: "Ready with warnings",
    findings: [
      {
        severity: "Medium",
        title: "One employee address update occurred inside payroll close window.",
        explanation: "Address changes near payroll approval can affect tax setup checks and downstream employee communications.",
        action: "Confirm employee profile update was intentional and captured before approval.",
      },
      {
        severity: "Low",
        title: "Payroll amount is consistent with prior run.",
        explanation: "Gross pay variance is below 1%, and no unusual contractor payments were detected.",
        action: "Proceed after address confirmation.",
      },
    ],
  },
  {
    id: "run-1044",
    company: "Cedar Room Hospitality",
    partner: "Restaurant Operations Platform",
    payday: "2026-05-24",
    employees: 67,
    contractors: 0,
    grossPay: "$152,880",
    previousGrossPay: "$148,920",
    status: "Review required",
    findings: [
      {
        severity: "High",
        title: "Payroll contains tipped employees in a newly active workplace.",
        explanation: "The location is new to payroll and the tipped workforce pattern increases setup sensitivity.",
        action: "Verify workplace setup, employee tax elections, and imported tips before approval.",
      },
      {
        severity: "Medium",
        title: "Seven employees have missing emergency contact fields.",
        explanation: "Not an approval blocker, but it indicates onboarding completeness is drifting.",
        action: "Add to partner readiness queue and resolve outside the approval path.",
      },
    ],
  },
];

const workflowSteps = [
  {
    title: "Ingest the messy signal",
    body: "Pull support tickets, payroll previews, tax notices, onboard statuses, partner notes, and configuration changes into one review surface.",
  },
  {
    title: "Classify root cause",
    body: "Use deterministic rules for known blockers and LLM-assisted classification for narrative-heavy tickets and tax notice descriptions.",
  },
  {
    title: "Route by decision type",
    body: "Separate approval blockers, partner remediations, product defects, and process gaps so every issue has a clear owner and service level.",
  },
  {
    title: "Generate the operating artifact",
    body: "Produce the brief, SOP, partner note, and MBR metric deltas from the same source of truth.",
  },
  {
    title: "Measure and harden",
    body: "Track blocker rate, tax notice backlog, manual intervention rate, time to resolution, and AI-assisted resolution share weekly.",
  },
];

const sopItems = [
  {
    title: "Payroll approval gate",
    body: "No run advances when company or employee onboard status is blocking, payment readiness is incomplete, or a new-state workplace lacks required setup.",
  },
  {
    title: "Tax notice intake",
    body: "Every notice receives a root-cause category, agency/account mapping check, owner, due date, and linked prevention task.",
  },
  {
    title: "Partner communication",
    body: "Partner-facing updates should state the blocker, required action, business impact, deadline, and the specific workflow where remediation happens.",
  },
  {
    title: "Weekly operating review",
    body: "Review trend metrics, top partners by issue volume, unresolved blockers over SLA, product defects, and automation opportunities.",
  },
];

function severityClass(value) {
  return value.toLowerCase();
}

function renderMetrics() {
  const grid = document.querySelector("#metricGrid");
  grid.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric">
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
          <span>${metric.note}</span>
          <div class="delta ${metric.bad ? "bad" : ""}">${metric.delta}</div>
        </article>
      `,
    )
    .join("");
}

function drawIssueChart() {
  const canvas = document.querySelector("#issueChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const max = Math.max(...issueMix.map((item) => item.count));
  const barHeight = 28;
  const gap = 18;
  const labelWidth = 178;
  const chartWidth = width - labelWidth - 64;

  ctx.font = "14px Inter, sans-serif";
  issueMix.forEach((item, index) => {
    const y = 28 + index * (barHeight + gap);
    const barWidth = (item.count / max) * chartWidth;
    ctx.fillStyle = "#5f6b7a";
    ctx.fillText(item.label, 0, y + 19);
    ctx.fillStyle = item.color;
    ctx.fillRect(labelWidth, y, barWidth, barHeight);
    ctx.fillStyle = "#19202a";
    ctx.font = "700 14px Inter, sans-serif";
    ctx.fillText(String(item.count), labelWidth + barWidth + 12, y + 19);
    ctx.font = "14px Inter, sans-serif";
  });
}

function drawTrendChart() {
  const canvas = document.querySelector("#trendChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = { top: 22, right: 26, bottom: 42, left: 42 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const max = 36;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#d9dee7";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (plotH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  function point(value, index) {
    return {
      x: padding.left + (plotW / (weeklyTrend.length - 1)) * index,
      y: padding.top + plotH - (value / max) * plotH,
    };
  }

  function drawLine(key, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    weeklyTrend.forEach((week, index) => {
      const p = point(week[key], index);
      if (index === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    weeklyTrend.forEach((week, index) => {
      const p = point(week[key], index);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawLine("blockers", "#b42318");
  drawLine("manual", "#2559d6");

  ctx.fillStyle = "#5f6b7a";
  ctx.font = "13px Inter, sans-serif";
  weeklyTrend.forEach((week, index) => {
    const x = padding.left + (plotW / (weeklyTrend.length - 1)) * index;
    ctx.fillText(week.week, x - 8, height - 16);
  });

  ctx.fillStyle = "#b42318";
  ctx.fillText("Blocker rate", padding.left, 16);
  ctx.fillStyle = "#2559d6";
  ctx.fillText("Manual intervention", padding.left + 112, 16);
}

function renderPriorities() {
  const list = document.querySelector("#priorityList");
  list.innerHTML = priorities
    .map(
      (item, index) => `
        <article class="priority-item">
          <div class="rank">${index + 1}</div>
          <div>
            <strong>${item.title}</strong>
            <p>${item.why}</p>
            <div class="tag-row">${item.tags.map((tag) => `<span class="tag ${severityClass(tag)}">${tag}</span>`).join("")}</div>
          </div>
          <div>
            <span class="eyebrow">Impact</span>
            <strong>${item.impact}</strong>
            <p>${item.owner}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function filteredWorkItems() {
  let items = [...workItems];
  if (state.severity !== "all") {
    items = items.filter((item) => item.severity === state.severity);
  }
  if (state.owner !== "all") {
    items = items.filter((item) => item.owner === state.owner);
  }
  if (state.impactSort) {
    items.sort((a, b) => b.impact - a.impact);
  }
  return items;
}

function renderWorkQueue() {
  const queue = document.querySelector("#workQueue");
  const items = filteredWorkItems();
  queue.innerHTML = items
    .map(
      (item) => `
        <article class="queue-item">
          <div>
            <div class="tag-row">
              <span class="tag ${severityClass(item.severity)}">${item.severity}</span>
              <span class="tag">${item.id}</span>
              <span class="tag">${item.rootCause}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.recommendation}</p>
          </div>
          <div class="queue-meta">
            <span class="tag">${item.owner}</span>
            <span class="tag">Impact ${item.impact}</span>
            <span class="tag">${item.source}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderRunSelector() {
  const selector = document.querySelector("#runSelector");
  selector.innerHTML = payrollRuns
    .map((run) => `<option value="${run.id}">${run.company}</option>`)
    .join("");
  selector.value = state.selectedRunId;
}

function selectedRun() {
  return payrollRuns.find((run) => run.id === state.selectedRunId) || payrollRuns[0];
}

function renderTriage() {
  const run = selectedRun();
  document.querySelector("#runSummary").innerHTML = `
    <div><strong>${run.partner}</strong><span>Partner</span></div>
    <div><strong>${run.payday}</strong><span>Payday</span></div>
    <div><strong>${run.employees} employees</strong><span>${run.contractors} contractors</span></div>
    <div><strong>${run.status}</strong><span>${run.grossPay} gross pay</span></div>
  `;

  document.querySelector("#triageFindings").innerHTML = run.findings
    .map(
      (finding) => `
        <article class="finding">
          <span class="status-dot ${finding.severity}"></span>
          <div>
            <div class="tag-row">
              <span class="tag ${severityClass(finding.severity)}">${finding.severity}</span>
            </div>
            <h3>${finding.title}</h3>
            <p>${finding.explanation}</p>
            <p><strong>Recommended action:</strong> ${finding.action}</p>
          </div>
        </article>
      `,
    )
    .join("");

  renderInitialChat(run);
}

function renderInitialChat(run) {
  const chat = document.querySelector("#chatLog");
  chat.innerHTML = `
    <div class="message">
      <strong>Agent</strong>
      <p>I reviewed ${run.company}. Current recommendation: ${run.status}. The highest-severity finding is ${run.findings[0].title.toLowerCase()}</p>
    </div>
  `;
}

function agentAnswer(question) {
  const run = selectedRun();
  const lower = question.toLowerCase();
  if (lower.includes("pause") || lower.includes("why")) {
    return `${run.company} should be held if any critical finding remains unresolved. The approval risk is not the payroll math itself; it is approving a run when setup, payment readiness, or workplace state configuration is incomplete.`;
  }
  if (lower.includes("partner") || lower.includes("draft")) {
    return `Draft: We found a payroll readiness issue that needs action before the ${run.payday} run can be approved. Please complete the required setup item in the payroll workflow and confirm imported hours/payment details. We will re-review once the blocker is cleared.`;
  }
  if (lower.includes("data") || lower.includes("inspect") || lower.includes("first")) {
    return "Inspect onboard status history, workplace state changes, payment method readiness, payroll item deltas, and any support tickets opened in the payroll close window.";
  }
  return `For ${run.company}, I would classify the run as "${run.status}" and work the findings from highest to lowest severity. Start with: ${run.findings[0].action}`;
}

function appendChat(role, text) {
  const chat = document.querySelector("#chatLog");
  const div = document.createElement("div");
  div.className = `message ${role === "User" ? "user" : ""}`;
  div.innerHTML = `<strong>${role}</strong><p>${text}</p>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function renderBrief() {
  document.querySelector("#briefContent").innerHTML = `
    <section>
      <h3>Problem Statement</h3>
      <p>
        Payroll blockers, tax notice escalations, and manual interventions are rising because readiness signals
        are fragmented across onboarding, tax setup, payroll preview, support, and partner operations. The current
        workflow catches too many issues after the partner expects payroll to move.
      </p>
    </section>
    <section>
      <h3>Quantified Impact</h3>
      <ul>
        <li>14.6% blocker rate across the reviewed payroll population, with a target threshold below 6%.</li>
        <li>31 open tax notices, 18 tied to agency registration or account mapping gaps.</li>
        <li>18% of payroll runs require manual intervention, creating execution risk during payroll close windows.</li>
      </ul>
    </section>
    <section>
      <h3>Root Causes</h3>
      <ol>
        <li>Onboard status changes are not consistently converted into pre-payroll approval gates.</li>
        <li>Agency registration and authorization prerequisites are discovered too late.</li>
        <li>Partners lack a consolidated readiness queue that explains what is blocked, why, and who owns it.</li>
      </ol>
    </section>
    <section>
      <h3>Recommendation</h3>
      <p>
        Stand up a payroll readiness operating model: a single AI-assisted intake surface, deterministic approval
        blockers for known risk states, LLM-assisted root-cause classification for messy tickets/notices, and an MBR
        loop that measures blocker rate, backlog, resolution time, partner concentration, and automation coverage.
      </p>
    </section>
    <section>
      <h3>30-Day Action Plan</h3>
      <ol>
        <li>Define the blocker taxonomy and map each category to an owner, SLA, and remediation workflow.</li>
        <li>Launch a mock-to-production pilot for the top two partner cohorts by issue volume.</li>
        <li>Ship partner-facing readiness queue and internal MBR dashboard.</li>
        <li>Convert repeated manual interventions into product fixes, SOP updates, or AI-assisted workflows.</li>
      </ol>
    </section>
  `;
}

function renderOperatingModel() {
  document.querySelector("#workflowSteps").innerHTML = workflowSteps
    .map(
      (step, index) => `
        <article class="workflow-step">
          <span class="step-number">${index + 1}</span>
          <div>
            <h3>${step.title}</h3>
            <p>${step.body}</p>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelector("#sopList").innerHTML = sopItems
    .map(
      (item) => `
        <article class="sop-item">
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `,
    )
    .join("");
}

function exportBrief() {
  const briefText = document.querySelector("#briefContent").innerText;
  const blob = new Blob([briefText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "payroll-ops-strategic-brief.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`#${tab.dataset.view}`).classList.add("active");
    });
  });

  document.querySelector("#severityFilter").addEventListener("change", (event) => {
    state.severity = event.target.value;
    renderWorkQueue();
  });

  document.querySelector("#ownerFilter").addEventListener("change", (event) => {
    state.owner = event.target.value;
    renderWorkQueue();
  });

  document.querySelector("#sortQueueBtn").addEventListener("click", () => {
    state.impactSort = !state.impactSort;
    renderWorkQueue();
  });

  document.querySelector("#runSelector").addEventListener("change", (event) => {
    state.selectedRunId = event.target.value;
    renderTriage();
  });

  document.querySelectorAll(".prompt-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.dataset.question;
      appendChat("User", question);
      appendChat("Agent", agentAnswer(question));
    });
  });

  document.querySelector("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#chatInput");
    const question = input.value.trim();
    if (!question) return;
    appendChat("User", question);
    appendChat("Agent", agentAnswer(question));
    input.value = "";
  });

  document.querySelector("#refreshBriefBtn").addEventListener("click", renderBrief);
  document.querySelector("#exportBriefBtn").addEventListener("click", exportBrief);
}

function init() {
  renderMetrics();
  drawIssueChart();
  drawTrendChart();
  renderPriorities();
  renderWorkQueue();
  renderRunSelector();
  renderTriage();
  renderBrief();
  renderOperatingModel();
  bindEvents();
}

init();
