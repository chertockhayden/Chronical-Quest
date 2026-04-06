const curriculum = {
  source: {
    title: "AP World History: Modern Course and Exam Description",
    publisher: "College Board",
    effective: "Fall 2023",
    url: "https://apcentral.collegeboard.org/media/pdf/ap-world-history-modern-course-and-exam-description.pdf"
  },
  exam: {
    units: [
      { id: "unit1", name: "The Global Tapestry", era: "c. 1200 to c. 1450", weighting: "8-10%" },
      { id: "unit2", name: "Networks of Exchange", era: "c. 1200 to c. 1450", weighting: "8-10%" },
      { id: "unit3", name: "Land-Based Empires", era: "c. 1450 to c. 1750", weighting: "12-15%" },
      { id: "unit4", name: "Transoceanic Interconnections", era: "c. 1450 to c. 1750", weighting: "12-15%" },
      { id: "unit5", name: "Revolutions", era: "c. 1750 to c. 1900", weighting: "12-15%" },
      { id: "unit6", name: "Consequences of Industrialization", era: "c. 1750 to c. 1900", weighting: "12-15%" },
      { id: "unit7", name: "Global Conflict", era: "c. 1900 to the present", weighting: "8-10%" },
      { id: "unit8", name: "Cold War and Decolonization", era: "c. 1900 to the present", weighting: "8-10%" },
      { id: "unit9", name: "Globalization", era: "c. 1900 to the present", weighting: "8-10%" }
    ],
    formats: [
      "Section I, Part A: 55 multiple-choice questions",
      "Section I, Part B: 3 short-answer responses",
      "Section II: 1 document-based question and 1 long essay selected from 3 prompts"
    ],
    skills: [
      "Developments and Processes",
      "Sourcing and Situation",
      "Claims and Evidence in Sources",
      "Contextualization",
      "Making Connections",
      "Argumentation"
    ],
    themes: [
      { code: "ENV", name: "Humans and the Environment" },
      { code: "CDI", name: "Cultural Developments and Interactions" },
      { code: "GOV", name: "Governance" },
      { code: "ECN", name: "Economic Systems" },
      { code: "SIO", name: "Social Interactions and Organization" },
      { code: "TEC", name: "Technology and Innovation" }
    ]
  }
};

const upgrades = [
  {
    id: "memory-atlas",
    name: "Memory Atlas",
    cost: 120,
    effect: "Reveals memory anchors in the curriculum and gives one timeline hint per run."
  },
  {
    id: "debate-studio",
    name: "Debate Studio",
    cost: 180,
    effect: "Unlocks LEQ Lab and upgrades answer-writing prompts with thesis support."
  },
  {
    id: "source-lens",
    name: "Source Lens",
    cost: 240,
    effect: "Adds clue powers in Rapid Recall+ by eliminating bad options and surfacing sourcing cues."
  },
  {
    id: "streak-shield",
    name: "Streak Shield",
    cost: 320,
    effect: "Protects one bad game result per session by raising it to a safe floor score."
  }
];

const unitAnchors = {
  unit1: "Compare governance and belief systems across Dar al-Islam, Song China, and state building in Africa and the Americas.",
  unit2: "Trade routes matter because they moved goods, religions, technologies, diseases, and diasporic communities together.",
  unit3: "Gunpowder states centralized power while adapting bureaucracy, religion, and military recruitment to local conditions.",
  unit4: "Maritime empires changed labor systems, trade routes, and ecological exchange at the same time.",
  unit5: "Revolutions spread through shared ideals but produced very different outcomes in state power and citizenship.",
  unit6: "Industrialization transformed labor, migration, empire, and class structures more than any single invention alone.",
  unit7: "Total war and ideological conflict linked nationalism, industrial capacity, and mass political mobilization.",
  unit8: "Cold War competition and decolonization overlapped, so independence movements were often shaped by global superpower pressure.",
  unit9: "Globalization is about compression of space and time through technology, finance, migration, culture, and environmental consequences."
};

const timelineRounds = [
  [
    { label: "Mongol Empire facilitates exchange across Eurasia", year: 1206, unitId: "unit2" },
    { label: "Zheng He's voyages project Ming power", year: 1405, unitId: "unit4" },
    { label: "Columbus reaches the Americas", year: 1492, unitId: "unit4" },
    { label: "Tokugawa shogunate consolidates control in Japan", year: 1603, unitId: "unit3" },
    { label: "Haitian Revolution begins", year: 1791, unitId: "unit5" }
  ],
  [
    { label: "Delhi Sultanate expands Islamic rule in South Asia", year: 1206, unitId: "unit1" },
    { label: "Printing press spreads in Europe", year: 1440, unitId: "unit4" },
    { label: "The Ottoman conquest of Constantinople", year: 1453, unitId: "unit3" },
    { label: "The Seven Years' War ends", year: 1763, unitId: "unit5" },
    { label: "Berlin Conference formalizes European claims in Africa", year: 1884, unitId: "unit6" }
  ],
  [
    { label: "Russian Revolution topples the tsarist regime", year: 1917, unitId: "unit7" },
    { label: "India achieves independence from Britain", year: 1947, unitId: "unit8" },
    { label: "The Chinese Communist Revolution succeeds", year: 1949, unitId: "unit8" },
    { label: "The Berlin Wall falls", year: 1989, unitId: "unit9" },
    { label: "World Trade Organization is established", year: 1995, unitId: "unit9" }
  ]
];

const rapidQuestions = [
  {
    prompt: "Which empire relied on the devshirme system to staff parts of its administration and military?",
    answers: ["Mughal Empire", "Ottoman Empire", "Qing Dynasty", "Songhai Empire"],
    correct: 1,
    explanation: "The Ottoman Empire used the devshirme system to recruit Christian boys for state service, including the Janissaries.",
    clue: "Think gunpowder empire plus Janissaries."
  },
  {
    prompt: "What was a major effect of the Columbian Exchange?",
    answers: ["The collapse of Silk Road trade", "Widespread transfer of crops, animals, and diseases", "The end of Atlantic slavery", "The invention of steam power"],
    correct: 1,
    explanation: "The Columbian Exchange connected Afro-Eurasia and the Americas through the transfer of plants, animals, pathogens, and people.",
    clue: "Focus on biological exchange, not political revolution."
  },
  {
    prompt: "Which ideology most directly challenged monarchies during the Age of Revolutions?",
    answers: ["Humanism", "Mercantilism", "Enlightenment thought", "Social Darwinism"],
    correct: 2,
    explanation: "Enlightenment thinkers emphasized rights, consent, and critique of absolutism, helping inspire revolutionary challenges to monarchy.",
    clue: "Look for the intellectual movement tied to rights and reason."
  },
  {
    prompt: "Which development most shaped the Cold War after 1945?",
    answers: ["Competition between capitalist and communist blocs", "Collapse of all empires", "End of decolonization", "Disappearance of proxy wars"],
    correct: 0,
    explanation: "The Cold War centered on ideological, military, and political rivalry between capitalist and communist blocs.",
    clue: "The answer should explain the basic structure of global rivalry."
  },
  {
    prompt: "Which change best explains the rise of European imperialism in the nineteenth century?",
    answers: ["Decline of industrial production", "Need for raw materials and new markets", "Collapse of nationalism", "End of scientific racism"],
    correct: 1,
    explanation: "Industrial capitalism pushed European states to seek resources, labor, and markets through imperial expansion.",
    clue: "Connect factories to empire."
  },
  {
    prompt: "What is the strongest contextualization for a DBQ on decolonization after World War II?",
    answers: ["The spread of the Black Death", "Industrial Revolution alone", "Weakening of European empires after the world wars", "Mongol rule of Eurasia"],
    correct: 2,
    explanation: "European empires were weakened by two world wars, opening space for nationalist movements and independence struggles.",
    clue: "Think what changed imperial strength before decolonization accelerated."
  }
];

const themeRounds = [
  {
    clue: "Railroads, steamships, and telegraphs accelerating exchange",
    answer: "TEC",
    explanation: "These technologies compressed space and time, making technology and innovation the clearest theme."
  },
  {
    clue: "Nationalism reshaping anti-colonial independence movements",
    answer: "GOV",
    explanation: "Nationalism changed political legitimacy, state formation, and governance."
  },
  {
    clue: "Buddhism, Islam, and Christianity spreading through trade routes",
    answer: "CDI",
    explanation: "Religious diffusion sits most directly under cultural developments and interactions."
  },
  {
    clue: "Industrial capitalism reorganizing labor and class structures",
    answer: "SIO",
    explanation: "Class and labor changes most directly affect social interactions and organization."
  },
  {
    clue: "Cash crops exhausting soils and changing local ecologies",
    answer: "ENV",
    explanation: "Environmental consequences belong first to humans and the environment."
  },
  {
    clue: "Mercantilism and global silver flows binding economies together",
    answer: "ECN",
    explanation: "Trade systems, bullion, and state-controlled commerce point to economic systems."
  }
];

const debateRounds = [
  {
    prompt: "Evaluate the extent to which industrialization changed social structures from 1750 to 1900.",
    options: [
      {
        thesis: "Industrialization radically changed class relations and urban life, although older hierarchies persisted in gender and empire.",
        correct: true
      },
      {
        thesis: "Industrialization happened because kings liked factories, which is why all societies industrialized at the same speed.",
        correct: false
      },
      {
        thesis: "Industrialization was important and there were many changes in many places over time.",
        correct: false
      }
    ],
    explanation: "The strongest thesis makes a clear argument, names the historical process, and adds complexity instead of being vague."
  },
  {
    prompt: "Evaluate the most significant effect of maritime exploration in the period 1450 to 1750.",
    options: [
      {
        thesis: "The most significant effect was the creation of new interregional connections that transformed labor, trade, and biological exchange across the Atlantic.",
        correct: true
      },
      {
        thesis: "Maritime exploration was interesting because sailors traveled and discovered things.",
        correct: false
      },
      {
        thesis: "The only effect of maritime exploration was better maps in Europe.",
        correct: false
      }
    ],
    explanation: "A strong LEQ thesis explains significance and names more than one transformed system."
  },
  {
    prompt: "Evaluate the extent to which decolonization transformed political power after 1900.",
    options: [
      {
        thesis: "Decolonization transformed formal sovereignty in Asia and Africa, but Cold War pressure and economic dependence limited how fully power shifted.",
        correct: true
      },
      {
        thesis: "Decolonization ended all foreign influence immediately after independence.",
        correct: false
      },
      {
        thesis: "Decolonization was when old empires became modern, so it was mostly cultural rather than political.",
        correct: false
      }
    ],
    explanation: "The best answer argues both transformation and limitation, which is exactly the kind of nuance AP readers reward."
  }
];

const seedQuestion = {
  id: "seed-question",
  title: "What is the biggest Unit 4 pattern I should remember?",
  body: "I keep mixing up maritime empires and land empires. What should I focus on before the exam?",
  unitId: "unit4",
  tags: ["unit-4", "exam-prep", "comparison"],
  createdAt: new Date().toISOString(),
  authorName: "Chronicle Coach",
  isApproved: true,
  answers: [
    {
      id: "seed-answer",
      body: "Start with the cause-and-effect chain: new maritime technology enabled oceanic expansion, which shifted trade routes, intensified empire-building, and transformed labor systems like the Atlantic slave trade.",
      createdAt: new Date().toISOString(),
      authorName: "Chronicle Coach",
      isApproved: true
    }
  ]
};

const palette = ["#f97316", "#ef4444", "#0ea5e9", "#14b8a6", "#eab308"];
const config = window.CHRONICLE_CONFIG || {};
const hasSupabaseConfig =
  Boolean(config.supabaseUrl) &&
  Boolean(config.supabaseAnonKey) &&
  !config.supabaseUrl.includes("PASTE_YOUR_SUPABASE") &&
  !config.supabaseAnonKey.includes("PASTE_YOUR_SUPABASE");

const supabase = hasSupabaseConfig ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey) : null;

const state = {
  questions: [seedQuestion],
  session: null,
  authUser: null,
  user: null,
  authMode: "login",
  shieldUsed: false
};

const dom = {
  railLinks: [...document.querySelectorAll(".rail-link")],
  panels: [...document.querySelectorAll(".panel")],
  jumpButtons: [...document.querySelectorAll("[data-section-jump]")],
  openAuthButton: document.getElementById("openAuthButton"),
  logoutButton: document.getElementById("logoutButton"),
  authDialog: document.getElementById("authDialog"),
  authTabs: [...document.querySelectorAll(".auth-tab")],
  authSubmitButton: document.getElementById("authSubmitButton"),
  authMessage: document.getElementById("authMessage"),
  usernameField: document.getElementById("usernameField"),
  displayNameField: document.getElementById("displayNameField"),
  emailInput: document.getElementById("emailInput"),
  usernameInput: document.getElementById("usernameInput"),
  displayNameInput: document.getElementById("displayNameInput"),
  passwordInput: document.getElementById("passwordInput"),
  examSummary: document.getElementById("examSummary"),
  guideLink: document.getElementById("guideLink"),
  metricsGrid: document.getElementById("metricsGrid"),
  unitPreview: document.getElementById("unitPreview"),
  perkPanel: document.getElementById("perkPanel"),
  curriculumGrid: document.getElementById("curriculumGrid"),
  timelineGame: document.getElementById("timelineGame"),
  rapidGame: document.getElementById("rapidGame"),
  connectionsGame: document.getElementById("connectionsGame"),
  debateGame: document.getElementById("debateGame"),
  profileCard: document.getElementById("profileCard"),
  welcomeCopy: document.getElementById("welcomeCopy"),
  moderationPanel: document.getElementById("moderationPanel"),
  communityFeed: document.getElementById("communityFeed"),
  questionForm: document.getElementById("questionForm"),
  questionHelp: document.getElementById("questionHelp"),
  questionUnit: document.getElementById("questionUnit"),
  questionTitle: document.getElementById("questionTitle"),
  questionBody: document.getElementById("questionBody"),
  questionTags: document.getElementById("questionTags"),
  shopGrid: document.getElementById("shopGrid")
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function initials(name) {
  return String(name || "Scholar")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function normalizeUsername(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");
}

function hasUpgrade(id) {
  return Boolean(state.user?.unlockedUpgrades?.includes(id));
}

function isStaff() {
  return ["teacher", "moderator"].includes(state.user?.role);
}

function getVisibleQuestions() {
  return state.questions.filter((question) => question.isApproved);
}

function getPendingQuestions() {
  return state.questions.filter((question) => !question.isApproved || question.answers.some((answer) => !answer.isApproved));
}

function profileFromRow(row, authUser) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    points: row.points,
    coins: row.coins,
    streak: row.streak,
    unlockedUpgrades: row.unlocked_upgrades || [],
    completedGames: row.completed_games || {},
    avatarColor: row.avatar_color,
    joinedAt: row.created_at,
    role: row.role || "student",
    email: authUser?.email || ""
  };
}

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, points, coins, streak, unlocked_upgrades, completed_games, avatar_color, created_at, role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function isUsernameTaken(username) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .ilike("username", username)
    .limit(1);

  if (error) {
    throw error;
  }

  return data.length > 0;
}

async function ensureProfile(authUser, fallback = {}) {
  let profile = await fetchProfile(authUser.id);
  if (profile) {
    return profile;
  }

  const emailPrefix = normalizeUsername((authUser.email || "scholar").split("@")[0]) || `scholar${String(authUser.id).slice(0, 4)}`;
  const username = normalizeUsername(authUser.user_metadata?.username || fallback.username || emailPrefix);
  const displayName = String(authUser.user_metadata?.display_name || fallback.displayName || username || "New Scholar").trim();
  const avatarColor = authUser.user_metadata?.avatar_color || fallback.avatarColor || palette[Math.floor(Math.random() * palette.length)];

  const { error } = await supabase.rpc("create_profile", {
    p_username: username,
    p_display_name: displayName,
    p_avatar_color: avatarColor
  });

  if (error) {
    throw error;
  }

  profile = await fetchProfile(authUser.id);
  return profile;
}

async function refreshUser() {
  if (!supabase || !state.authUser) {
    state.user = null;
    return;
  }

  const profile = await ensureProfile(state.authUser);
  state.user = profileFromRow(profile, state.authUser);
}

function switchPanel(sectionId) {
  dom.railLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });
  dom.panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === sectionId);
  });
}

function renderExamSummary() {
  const { exam } = curriculum;
  dom.examSummary.innerHTML = `
    <div class="metric-card">
      <p class="small-label">Units</p>
      <strong>${exam.units.length}</strong>
      <span class="muted">Official AP World sequence</span>
    </div>
    <div class="metric-card">
      <p class="small-label">Thinking Skills</p>
      <strong>${exam.skills.length}</strong>
      <span class="muted">${exam.skills[0]} to ${exam.skills[5]}</span>
    </div>
    <div class="metric-card">
      <p class="small-label">Themes</p>
      <strong>${exam.themes.length}</strong>
      <span class="muted">ENV, CDI, GOV, ECN, SIO, TEC</span>
    </div>
  `;
}

function renderDashboard() {
  const user = state.user;
  const setupDetail = hasSupabaseConfig ? "Live Supabase backend connected" : "Add your Supabase keys in config.js";
  const metrics = user
    ? [
        { label: "Experience", value: user.points, detail: "Earned by games and discussion" },
        { label: "Coins", value: user.coins, detail: "Spend them in the upgrade shop" },
        { label: "Role", value: user.role, detail: isStaff() ? "Can review community submissions" : "Student account" },
        { label: "Upgrades", value: user.unlockedUpgrades.length, detail: "Toolkit items collected" }
      ]
    : [
        { label: "Mode", value: hasSupabaseConfig ? "Guest" : "Setup", detail: setupDetail },
        { label: "Units", value: curriculum.exam.units.length, detail: "Official AP World structure" },
        { label: "Games", value: hasUpgrade("debate-studio") ? 4 : 3, detail: "Chronology, recall, themes, and argumentation" },
        { label: "Community", value: state.questions.length, detail: "Shared study questions" }
      ];

  dom.metricsGrid.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <p class="small-label">${metric.label}</p>
          <strong>${metric.value}</strong>
          <span class="muted">${metric.detail}</span>
        </article>
      `
    )
    .join("");

  dom.unitPreview.innerHTML = curriculum.exam.units
    .slice(0, 4)
    .map(
      (unit) => `
        <article class="unit-card">
          <p class="eyebrow">${unit.id.toUpperCase()}</p>
          <h4>${unit.name}</h4>
          <div class="unit-meta">
            <span class="chip">${unit.era}</span>
            <span class="chip">${unit.weighting}</span>
          </div>
          ${hasUpgrade("memory-atlas") ? `<p class="atlas-note">${unitAnchors[unit.id]}</p>` : ""}
        </article>
      `
    )
    .join("");

  const perks = user
    ? upgrades
        .filter((upgrade) => user.unlockedUpgrades.includes(upgrade.id))
        .map(
          (upgrade) => `
            <article class="perk-card">
              <p class="eyebrow">Unlocked</p>
              <h4>${upgrade.name}</h4>
              <p>${upgrade.effect}</p>
            </article>
          `
        )
        .join("")
    : "";

  dom.perkPanel.innerHTML = perks || `
    <article class="perk-card">
      <p class="eyebrow">No upgrades yet</p>
      <h4>Start with Memory Atlas</h4>
      <p>Upgrades now unlock real gameplay tools, support cards, and argument drills instead of acting like simple collectibles.</p>
    </article>
  `;

  dom.welcomeCopy.textContent = user ? `Signed in as ${user.displayName}` : hasSupabaseConfig ? "Guest mode" : "Setup mode";
}

function renderProfile() {
  if (!hasSupabaseConfig) {
    dom.profileCard.innerHTML = `
      <p>Before sign-in can work, add your Supabase project URL and anon key in <strong>config.js</strong>.</p>
      <p class="muted">The README walks you through it step by step.</p>
    `;
    dom.openAuthButton.classList.remove("hidden");
    dom.logoutButton.classList.add("hidden");
    return;
  }

  if (!state.user) {
    dom.profileCard.innerHTML = "<p>Sign in with email to save progress, collect points, and join peer Q&amp;A.</p>";
    dom.openAuthButton.classList.remove("hidden");
    dom.logoutButton.classList.add("hidden");
    return;
  }

  dom.profileCard.innerHTML = `
    <div class="profile-top">
      <div class="avatar" style="background:${state.user.avatarColor}">${initials(state.user.displayName)}</div>
      <div>
        <strong>${state.user.displayName}</strong>
        <p class="muted">@${state.user.username}</p>
      </div>
    </div>
    <div class="profile-stats">
      <div><p class="small-label">XP</p><strong>${state.user.points}</strong></div>
      <div><p class="small-label">Coins</p><strong>${state.user.coins}</strong></div>
      <div><p class="small-label">Role</p><strong>${state.user.role}</strong></div>
      <div><p class="small-label">Protected Run</p><strong>${hasUpgrade("streak-shield") && !state.shieldUsed ? "Ready" : "Used"}</strong></div>
    </div>
  `;
  dom.openAuthButton.classList.add("hidden");
  dom.logoutButton.classList.remove("hidden");
}

function renderCurriculum() {
  dom.guideLink.href = curriculum.source.url;
  dom.curriculumGrid.innerHTML = curriculum.exam.units
    .map(
      (unit, index) => `
        <article class="unit-card">
          <p class="eyebrow">Unit ${index + 1}</p>
          <h4>${unit.name}</h4>
          <div class="unit-meta">
            <span class="chip">${unit.era}</span>
            <span class="chip">${unit.weighting} of exam</span>
          </div>
          <p class="muted">Aligned to the official College Board AP World History: Modern framework.</p>
          ${hasUpgrade("memory-atlas") ? `<p class="atlas-note">${unitAnchors[unit.id]}</p>` : ""}
        </article>
      `
    )
    .join("");

  dom.questionUnit.innerHTML = curriculum.exam.units
    .map((unit) => `<option value="${unit.id}">${unit.name}</option>`)
    .join("");

  dom.questionHelp.textContent = isStaff()
    ? "Staff posts publish immediately. Student submissions enter the review queue until approved."
    : hasUpgrade("debate-studio")
      ? "Debate Studio tip: ask for comparison, causation, or continuity directly so answers become more AP-ready."
      : "Questions from student accounts go into the moderation queue before the public feed sees them.";
}

function renderModerationPanel() {
  const pending = getPendingQuestions();
  const canModerate = isStaff();
  const hasPersonalPending = pending.some((question) => question.authorId === state.user?.id || question.answers.some((answer) => answer.authorId === state.user?.id && !answer.isApproved));

  if (!pending.length || (!canModerate && !hasPersonalPending)) {
    dom.moderationPanel.classList.add("hidden");
    dom.moderationPanel.innerHTML = "";
    return;
  }

  dom.moderationPanel.classList.remove("hidden");
  dom.moderationPanel.innerHTML = `
    <article class="queue-card">
      <p class="eyebrow">${canModerate ? "Moderator Queue" : "Awaiting Approval"}</p>
      <h4>${canModerate ? "Review submissions before they go public" : "Your pending submissions"}</h4>
      ${pending
        .map((question) => {
          const pendingAnswers = question.answers.filter((answer) => !answer.isApproved);
          const showQuestion = !question.isApproved && (canModerate || question.authorId === state.user?.id);
          const showAnswers = pendingAnswers.filter((answer) => canModerate || answer.authorId === state.user?.id);
          if (!showQuestion && !showAnswers.length) {
            return "";
          }
          return `
            <div class="stack-block">
              ${showQuestion ? `
                <div class="moderation-note">
                  <strong>Question: ${question.title}</strong>
                  <p>${question.body}</p>
                  <div class="button-row">
                    ${canModerate ? `<button class="button primary" data-approve-question="${question.id}">Approve question</button>` : ""}
                    ${canModerate ? `<button class="button danger" data-hide-question="${question.id}">Keep hidden</button>` : ""}
                  </div>
                </div>
              ` : ""}
              ${showAnswers
                .map(
                  (answer) => `
                    <div class="moderation-note">
                      <strong>Pending answer for "${question.title}"</strong>
                      <p>${answer.body}</p>
                      <div class="button-row">
                        ${canModerate ? `<button class="button primary" data-approve-answer="${answer.id}">Approve answer</button>` : ""}
                        ${canModerate ? `<button class="button danger" data-hide-answer="${answer.id}">Keep hidden</button>` : ""}
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          `;
        })
        .join("")}
    </article>
  `;
}

function renderCommunity() {
  const visibleQuestions = getVisibleQuestions();
  if (!visibleQuestions.length) {
    dom.communityFeed.innerHTML = `<p class="muted">No approved questions yet. Start the conversation.</p>`;
  } else {
    dom.communityFeed.innerHTML = visibleQuestions
      .map(
        (question) => `
          <article class="question-card" data-question-id="${question.id}">
            <div class="question-meta">
              <span class="chip">${question.unitId.toUpperCase()}</span>
              ${question.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
            </div>
            <h4>${question.title}</h4>
            <p>${question.body}</p>
            <div class="score-line">
              <span>Asked by ${question.authorName}</span>
              <span>${formatDate(question.createdAt)}</span>
            </div>
            <div class="answer-list">
              ${question.answers
                .filter((answer) => answer.isApproved)
                .map(
                  (answer) => `
                    <article class="answer">
                      <strong>${answer.authorName}</strong>
                      <p>${answer.body}</p>
                      <span class="muted">${formatDate(answer.createdAt)}</span>
                    </article>
                  `
                )
                .join("")}
            </div>
            <form class="answer-form">
              <textarea name="answer" placeholder="${hasUpgrade("debate-studio") ? "Support your answer with comparison, causation, or contextualization." : "Write a helpful answer, comparison, or source tip."}"></textarea>
              <button class="button secondary" type="submit">Answer</button>
            </form>
          </article>
        `
      )
      .join("");
  }

  renderModerationPanel();
}

function renderShop() {
  dom.shopGrid.innerHTML = upgrades
    .map((upgrade) => {
      const owned = Boolean(state.user?.unlockedUpgrades?.includes(upgrade.id));
      return `
        <article class="shop-card ${owned ? "owned" : "locked"}">
          <p class="eyebrow">Upgrade</p>
          <h4>${upgrade.name}</h4>
          <p class="muted">${upgrade.effect}</p>
          <div class="score-line">
            <span>${upgrade.cost} coins</span>
            <span>${owned ? "Owned" : "Available"}</span>
          </div>
          <button class="button ${owned ? "ghost" : "primary"}" data-upgrade-id="${upgrade.id}" ${owned ? "disabled" : ""}>
            ${owned ? "Unlocked" : "Buy upgrade"}
          </button>
        </article>
      `;
    })
    .join("");
}

async function submitGameResult(gameId, score) {
  if (!state.user || !supabase) {
    renderProfile();
    return { savedScore: score, bonusMessage: "" };
  }

  let savedScore = score;
  let bonusMessage = "";

  if (hasUpgrade("streak-shield") && score < 60 && !state.shieldUsed) {
    state.shieldUsed = true;
    savedScore = 60;
    bonusMessage = "Streak Shield activated and raised this run to a protected 60 score.";
  }

  const { error } = await supabase.rpc("submit_game_result", {
    p_game_id: gameId,
    p_score: savedScore
  });

  if (error) {
    console.error(error);
    return { savedScore: score, bonusMessage: "" };
  }

  await refreshUser();
  renderDashboard();
  renderProfile();
  renderShop();

  return { savedScore, bonusMessage };
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function renderTimelineGame() {
  const rounds = timelineRounds.map((round) => shuffle(round));
  let roundIndex = 0;
  let selected = [];
  let usedHint = false;
  const roundScores = [];

  const renderRound = () => {
    const round = rounds[roundIndex];
    const available = round.filter((event) => !selected.includes(event.label));
    const earliestRemaining = [...available].sort((a, b) => a.year - b.year)[0];

    dom.timelineGame.innerHTML = `
      <div class="score-line">
        <span>Round ${roundIndex + 1} of ${rounds.length}</span>
        <span>${hasUpgrade("memory-atlas") ? "Atlas hint ready" : "No hint equipped"}</span>
      </div>
      ${hasUpgrade("memory-atlas") ? `<div class="atlas-note">Memory Atlas lets you reveal the earliest remaining event once per round.</div>` : ""}
      <div class="timeline-selected">
        ${selected.length
          ? selected
              .map((label, index) => {
                const event = round.find((entry) => entry.label === label);
                return `<div class="timeline-slot">${index + 1}. ${label}${hasUpgrade("memory-atlas") ? ` <span class="muted">(${event.year})</span>` : ""}</div>`;
              })
              .join("")
          : `<p class="muted">Tap the events below in the order you believe they happened.</p>`}
      </div>
      <div class="choice-grid">
        ${available
          .map((event) => `<button class="choice" data-event="${event.label}">${event.label}${hasUpgrade("memory-atlas") ? ` <span class="muted">| ${event.unitId.toUpperCase()}</span>` : ""}</button>`)
          .join("")}
      </div>
      <div class="game-actions">
        <button class="button ghost" type="button" data-action="reset">Reset order</button>
        ${hasUpgrade("memory-atlas") ? `<button class="button secondary" type="button" data-action="hint" ${usedHint ? "disabled" : ""}>Use Atlas Hint</button>` : ""}
        <button class="button primary" type="button" data-action="submit" ${selected.length !== round.length ? "disabled" : ""}>Lock round</button>
      </div>
      <p class="form-message" data-role="message"></p>
    `;

    dom.timelineGame.querySelectorAll("[data-event]").forEach((button) => {
      button.addEventListener("click", () => {
        selected.push(button.dataset.event);
        renderRound();
      });
    });

    dom.timelineGame.querySelector("[data-action='reset']").addEventListener("click", () => {
      selected = [];
      usedHint = false;
      renderRound();
    });

    if (hasUpgrade("memory-atlas")) {
      dom.timelineGame.querySelector("[data-action='hint']").addEventListener("click", () => {
        usedHint = true;
        dom.timelineGame.querySelector("[data-role='message']").textContent = `Atlas hint: the earliest remaining event is "${earliestRemaining.label}".`;
        dom.timelineGame.querySelector("[data-action='hint']").disabled = true;
      });
    }

    dom.timelineGame.querySelector("[data-action='submit']").addEventListener("click", async () => {
      const expected = [...round].sort((a, b) => a.year - b.year).map((event) => event.label);
      const correctPlacements = selected.reduce((total, label, index) => total + Number(expected[index] === label), 0);
      const score = Math.round((correctPlacements / round.length) * 100);
      roundScores.push(score);

      if (roundIndex < rounds.length - 1) {
        roundIndex += 1;
        selected = [];
        usedHint = false;
        renderRound();
        return;
      }

      const finalScore = Math.round(roundScores.reduce((total, value) => total + value, 0) / roundScores.length);
      const result = await submitGameResult("timeline", finalScore);
      dom.timelineGame.innerHTML = `
        <div class="feedback-card">
          <p class="eyebrow">Timeline Tactician Complete</p>
          <h4>Chronology score: ${finalScore}</h4>
          <p>${finalScore >= 80 ? "Strong sequencing. You are recognizing turning points instead of memorizing isolated facts." : "Good start. Focus on how one event creates conditions for the next."}</p>
          ${result.bonusMessage ? `<p class="upgrade-note">${result.bonusMessage}</p>` : ""}
          <button class="button primary" type="button">Play again</button>
        </div>
      `;
      dom.timelineGame.querySelector(".button").addEventListener("click", renderTimelineGame);
    });
  };

  renderRound();
}

function renderRapidGame() {
  const rounds = shuffle(rapidQuestions).slice(0, 5);
  let index = 0;
  let correct = 0;
  let streak = 0;
  let usedLens = false;

  const renderRound = () => {
    const round = rounds[index];
    const disabledChoices = new Set();
    let locked = false;

    const draw = (message = "") => {
      dom.rapidGame.innerHTML = `
        <div class="score-line">
          <span>Question ${index + 1} of ${rounds.length}</span>
          <span>${correct} correct | streak ${streak}</span>
        </div>
        <div class="game-panel">
          <strong>${round.prompt}</strong>
          <div class="choice-grid">
            ${round.answers
              .map((answer, answerIndex) => `<button class="choice ${disabledChoices.has(answerIndex) ? "dimmed" : ""}" data-answer="${answerIndex}" ${disabledChoices.has(answerIndex) || locked ? "disabled" : ""}>${answer}</button>`)
              .join("")}
          </div>
          <div class="game-actions">
            ${hasUpgrade("source-lens") ? `<button class="button secondary" type="button" data-action="lens" ${usedLens || locked ? "disabled" : ""}>Use Source Lens</button>` : ""}
            ${locked ? `<button class="button primary" type="button" data-action="next">${index === rounds.length - 1 ? "Finish round" : "Next question"}</button>` : ""}
          </div>
          <p class="form-message">${message}</p>
        </div>
      `;

      dom.rapidGame.querySelectorAll("[data-answer]").forEach((button) => {
        button.addEventListener("click", () => {
          locked = true;
          const chosen = Number(button.dataset.answer);
          const isCorrect = chosen === round.correct;
          if (isCorrect) {
            correct += 1;
            streak += 1;
          } else {
            streak = 0;
          }

          draw(`${isCorrect ? "Correct." : "Not quite."} ${round.explanation}`);
          dom.rapidGame.querySelectorAll("[data-answer]").forEach((choice) => {
            const indexValue = Number(choice.dataset.answer);
            if (indexValue === round.correct) {
              choice.classList.add("correct");
            } else if (indexValue === chosen) {
              choice.classList.add("incorrect");
            }
            choice.disabled = true;
          });
        });
      });

      if (hasUpgrade("source-lens")) {
        dom.rapidGame.querySelector("[data-action='lens']")?.addEventListener("click", () => {
          usedLens = true;
          const wrongChoices = round.answers
            .map((_, answerIndex) => answerIndex)
            .filter((answerIndex) => answerIndex !== round.correct)
            .slice(0, 2);
          wrongChoices.forEach((answerIndex) => disabledChoices.add(answerIndex));
          draw(`Source Lens clue: ${round.clue}`);
        });
      }

      dom.rapidGame.querySelector("[data-action='next']")?.addEventListener("click", async () => {
        index += 1;
        usedLens = false;
        if (index < rounds.length) {
          renderRound();
          return;
        }

        const baseScore = Math.round((correct / rounds.length) * 100);
        const streakBonus = Math.min(20, streak * 4);
        const finalScore = Math.min(100, baseScore + streakBonus);
        const result = await submitGameResult("rapid", finalScore);
        dom.rapidGame.innerHTML = `
          <div class="feedback-card">
            <p class="eyebrow">Rapid Recall+ Complete</p>
            <h4>Recall score: ${finalScore}</h4>
            <p>${correct}/${rounds.length} correct with a streak bonus of ${streakBonus}.</p>
            ${result.bonusMessage ? `<p class="upgrade-note">${result.bonusMessage}</p>` : ""}
            <button class="button primary" type="button">Play again</button>
          </div>
        `;
        dom.rapidGame.querySelector(".button").addEventListener("click", renderRapidGame);
      });
    };

    draw();
  };

  renderRound();
}

function renderConnectionsGame() {
  const rounds = shuffle(themeRounds).slice(0, 5);
  let index = 0;
  let correct = 0;

  const renderRound = () => {
    const round = rounds[index];
    let locked = false;

    const draw = (message = "") => {
      dom.connectionsGame.innerHTML = `
        <div class="score-line">
          <span>Theme ${index + 1} of ${rounds.length}</span>
          <span>${correct} correct</span>
        </div>
        <div class="game-panel">
          <strong>${round.clue}</strong>
          <div class="choice-grid">
            ${shuffle(curriculum.exam.themes)
              .map((theme) => `<button class="choice" data-theme="${theme.code}" ${locked ? "disabled" : ""}>${theme.code} | ${theme.name}</button>`)
              .join("")}
          </div>
          ${locked ? `<button class="button primary" type="button" data-action="next">${index === rounds.length - 1 ? "Finish forge" : "Next theme"}</button>` : ""}
          <p class="form-message">${message}</p>
        </div>
      `;

      dom.connectionsGame.querySelectorAll("[data-theme]").forEach((button) => {
        button.addEventListener("click", () => {
          locked = true;
          const chosen = button.dataset.theme;
          if (chosen === round.answer) {
            correct += 1;
          }
          draw(`${chosen === round.answer ? "Correct." : "Not this one."} ${round.explanation}`);
          dom.connectionsGame.querySelectorAll("[data-theme]").forEach((choice) => {
            if (choice.dataset.theme === round.answer) {
              choice.classList.add("correct");
            } else if (choice.dataset.theme === chosen) {
              choice.classList.add("incorrect");
            }
            choice.disabled = true;
          });
        });
      });

      dom.connectionsGame.querySelector("[data-action='next']")?.addEventListener("click", async () => {
        index += 1;
        if (index < rounds.length) {
          renderRound();
          return;
        }

        const finalScore = Math.round((correct / rounds.length) * 100);
        const result = await submitGameResult("debate", finalScore);
        dom.connectionsGame.innerHTML = `
          <div class="feedback-card">
            <p class="eyebrow">Theme Forge Complete</p>
            <h4>Theme score: ${finalScore}</h4>
            <p>${correct}/${rounds.length} accurate theme calls. This is the skill that makes SAQs and LEQs feel easier.</p>
            ${result.bonusMessage ? `<p class="upgrade-note">${result.bonusMessage}</p>` : ""}
            <button class="button primary" type="button">Play again</button>
          </div>
        `;
        dom.connectionsGame.querySelector(".button").addEventListener("click", renderConnectionsGame);
      });
    };

    draw();
  };

  renderRound();
}

function renderDebateGame() {
  if (!hasUpgrade("debate-studio")) {
    dom.debateGame.innerHTML = `
      <div class="game-panel locked-game">
        <div class="warning-note">
          <strong>Debate Studio required</strong>
          <p>Buy Debate Studio in the Upgrade Shop to unlock LEQ Lab and get extra AP writing support.</p>
        </div>
      </div>
    `;
    return;
  }

  let index = 0;
  let correct = 0;

  const renderRound = () => {
    const round = debateRounds[index];
    let locked = false;

    const draw = (message = "") => {
      dom.debateGame.innerHTML = `
        <div class="score-line">
          <span>Prompt ${index + 1} of ${debateRounds.length}</span>
          <span>${correct} strong theses</span>
        </div>
        <div class="game-panel">
          <strong>${round.prompt}</strong>
          <div class="choice-grid">
            ${round.options.map((option, optionIndex) => `<button class="choice" data-option="${optionIndex}" ${locked ? "disabled" : ""}>${option.thesis}</button>`).join("")}
          </div>
          ${locked ? `<button class="button primary" type="button" data-action="next">${index === debateRounds.length - 1 ? "Finish lab" : "Next prompt"}</button>` : ""}
          <p class="form-message">${message}</p>
        </div>
      `;

      dom.debateGame.querySelectorAll("[data-option]").forEach((button) => {
        button.addEventListener("click", () => {
          locked = true;
          const chosen = Number(button.dataset.option);
          if (round.options[chosen].correct) {
            correct += 1;
          }
          draw(`${round.options[chosen].correct ? "Best choice." : "Not the strongest thesis."} ${round.explanation}`);
          dom.debateGame.querySelectorAll("[data-option]").forEach((choice, optionIndex) => {
            if (round.options[optionIndex].correct) {
              choice.classList.add("correct");
            } else if (optionIndex === chosen) {
              choice.classList.add("incorrect");
            }
            choice.disabled = true;
          });
        });
      });

      dom.debateGame.querySelector("[data-action='next']")?.addEventListener("click", async () => {
        index += 1;
        if (index < debateRounds.length) {
          renderRound();
          return;
        }

        const finalScore = Math.round((correct / debateRounds.length) * 100);
        const result = await submitGameResult("connections", finalScore);
        dom.debateGame.innerHTML = `
          <div class="feedback-card">
            <p class="eyebrow">LEQ Lab Complete</p>
            <h4>Argument score: ${finalScore}</h4>
            <p>${correct}/${debateRounds.length} strong theses chosen. Debate Studio is now doing real work for your writing prep.</p>
            ${result.bonusMessage ? `<p class="upgrade-note">${result.bonusMessage}</p>` : ""}
            <button class="button primary" type="button">Run LEQ Lab again</button>
          </div>
        `;
        dom.debateGame.querySelector(".button").addEventListener("click", renderDebateGame);
      });
    };

    draw();
  };

  renderRound();
}

async function loadQuestions() {
  if (!supabase) {
    state.questions = [seedQuestion];
    renderCommunity();
    renderDashboard();
    return;
  }

  const [{ data: questions, error: questionsError }, { data: answers, error: answersError }, { data: profiles, error: profilesError }] =
    await Promise.all([
      supabase.from("questions").select("id, user_id, title, body, unit_id, tags, created_at, is_approved").order("created_at", { ascending: false }),
      supabase.from("answers").select("id, question_id, user_id, body, created_at, is_approved").order("created_at", { ascending: true }),
      supabase.from("profiles").select("id, display_name, username, role")
    ]);

  if (questionsError || answersError || profilesError) {
    console.error(questionsError || answersError || profilesError);
    state.questions = [seedQuestion];
    renderCommunity();
    return;
  }

  const profilesById = new Map(profiles.map((profile) => [profile.id, profile]));
  const answersByQuestion = new Map();

  answers.forEach((answer) => {
    const profile = profilesById.get(answer.user_id);
    const bucket = answersByQuestion.get(answer.question_id) || [];
    bucket.push({
      id: answer.id,
      authorId: answer.user_id,
      body: answer.body,
      createdAt: answer.created_at,
      authorName: profile?.display_name || "Anonymous Scholar",
      isApproved: answer.is_approved ?? true
    });
    answersByQuestion.set(answer.question_id, bucket);
  });

  const liveQuestions = questions.map((question) => {
    const profile = profilesById.get(question.user_id);
    return {
      id: question.id,
      authorId: question.user_id,
      title: question.title,
      body: question.body,
      unitId: question.unit_id,
      tags: question.tags || [],
      createdAt: question.created_at,
      authorName: profile?.display_name || "Anonymous Scholar",
      isApproved: question.is_approved ?? true,
      answers: answersByQuestion.get(question.id) || []
    };
  });

  state.questions = liveQuestions.length ? liveQuestions : [seedQuestion];
  renderCommunity();
  renderDashboard();
}

function syncUserRendering() {
  renderDashboard();
  renderProfile();
  renderCurriculum();
  renderShop();
  renderDebateGame();
}

async function handleSession(session) {
  state.session = session;
  state.authUser = session?.user || null;
  state.shieldUsed = false;

  if (!state.authUser || !supabase) {
    state.user = null;
    syncUserRendering();
    return;
  }

  try {
    await refreshUser();
  } catch (error) {
    console.error(error);
    dom.authMessage.textContent = error.message || "We couldn't load your profile.";
  }

  syncUserRendering();
}

async function moderateQuestion(questionId, isApproved) {
  const { error } = await supabase.rpc("moderate_question", {
    p_question_id: questionId,
    p_is_approved: isApproved
  });

  if (error) {
    alert(error.message);
    return;
  }

  await loadQuestions();
}

async function moderateAnswer(answerId, isApproved) {
  const { error } = await supabase.rpc("moderate_answer", {
    p_answer_id: answerId,
    p_is_approved: isApproved
  });

  if (error) {
    alert(error.message);
    return;
  }

  await loadQuestions();
}

function bindEvents() {
  dom.railLinks.forEach((link) => {
    link.addEventListener("click", () => switchPanel(link.dataset.section));
  });

  dom.jumpButtons.forEach((button) => {
    button.addEventListener("click", () => switchPanel(button.dataset.sectionJump));
  });

  dom.openAuthButton.addEventListener("click", () => {
    if (!hasSupabaseConfig) {
      dom.authMessage.textContent = "First add your Supabase URL and anon key to config.js.";
    }
    dom.authDialog.showModal();
  });

  dom.logoutButton.addEventListener("click", async () => {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
  });

  dom.authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.authMode = tab.dataset.mode;
      dom.authTabs.forEach((button) => button.classList.toggle("active", button === tab));
      dom.usernameField.classList.toggle("hidden", state.authMode !== "register");
      dom.displayNameField.classList.toggle("hidden", state.authMode !== "register");
      dom.authSubmitButton.textContent = state.authMode === "register" ? "Create account" : "Sign in";
      dom.authMessage.textContent = "";
    });
  });

  dom.authSubmitButton.addEventListener("click", async () => {
    if (!supabase) {
      dom.authMessage.textContent = "Add your Supabase project details in config.js first.";
      return;
    }

    const email = dom.emailInput.value.trim();
    const password = dom.passwordInput.value;

    try {
      if (state.authMode === "register") {
        const username = normalizeUsername(dom.usernameInput.value);
        const displayName = dom.displayNameInput.value.trim();
        const avatarColor = palette[Math.floor(Math.random() * palette.length)];

        if (username.length < 3) {
          throw new Error("Pick a username with at least 3 letters or numbers.");
        }
        if (displayName.length < 2) {
          throw new Error("Add a display name so classmates know who you are.");
        }
        if (await isUsernameTaken(username)) {
          throw new Error("That username is already taken.");
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              display_name: displayName,
              avatar_color: avatarColor
            }
          }
        });

        if (error) {
          throw error;
        }

        if (data.session && data.user) {
          await ensureProfile(data.user, { username, displayName, avatarColor });
          dom.authDialog.close();
          dom.authMessage.textContent = "";
        } else {
          dom.authMessage.textContent = "Account created. Check your email for the confirmation link, then sign in.";
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw error;
        }

        dom.authDialog.close();
      }
    } catch (error) {
      dom.authMessage.textContent = error.message || "Something went wrong while signing in.";
    }
  });

  dom.questionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!supabase || !state.user) {
      alert("Sign in first so we know which profile is posting.");
      return;
    }

    const tags = dom.questionTags.value
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 4);

    const { error } = await supabase.rpc("create_question", {
      p_title: dom.questionTitle.value,
      p_body: dom.questionBody.value,
      p_unit_id: dom.questionUnit.value,
      p_tags: tags
    });

    if (error) {
      alert(error.message);
      return;
    }

    dom.questionForm.reset();
    await refreshUser();
    syncUserRendering();
    await loadQuestions();
  });

  dom.communityFeed.addEventListener("submit", async (event) => {
    event.preventDefault();
    const card = event.target.closest("[data-question-id]");
    if (!card) {
      return;
    }

    if (!supabase || !state.user) {
      alert("Sign in first so you can post an answer.");
      return;
    }

    const textarea = event.target.querySelector("textarea");
    const { error } = await supabase.rpc("create_answer", {
      p_question_id: card.dataset.questionId,
      p_body: textarea.value
    });

    if (error) {
      alert(error.message);
      return;
    }

    textarea.value = "";
    await refreshUser();
    syncUserRendering();
    await loadQuestions();
  });

  dom.moderationPanel.addEventListener("click", async (event) => {
    const approveQuestionButton = event.target.closest("[data-approve-question]");
    if (approveQuestionButton) {
      await moderateQuestion(approveQuestionButton.dataset.approveQuestion, true);
      return;
    }

    const hideQuestionButton = event.target.closest("[data-hide-question]");
    if (hideQuestionButton) {
      await moderateQuestion(hideQuestionButton.dataset.hideQuestion, false);
      return;
    }

    const approveAnswerButton = event.target.closest("[data-approve-answer]");
    if (approveAnswerButton) {
      await moderateAnswer(approveAnswerButton.dataset.approveAnswer, true);
      return;
    }

    const hideAnswerButton = event.target.closest("[data-hide-answer]");
    if (hideAnswerButton) {
      await moderateAnswer(hideAnswerButton.dataset.hideAnswer, false);
    }
  });

  dom.shopGrid.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-upgrade-id]");
    if (!button) {
      return;
    }

    if (!supabase || !state.user) {
      alert("Sign in first so your purchases save.");
      return;
    }

    const { error } = await supabase.rpc("purchase_upgrade", {
      p_upgrade_id: button.dataset.upgradeId
    });

    if (error) {
      alert(error.message);
      return;
    }

    await refreshUser();
    syncUserRendering();
  });
}

async function initializeSupabase() {
  if (!supabase) {
    return;
  }

  const {
    data: { session }
  } = await supabase.auth.getSession();
  await handleSession(session);

  supabase.auth.onAuthStateChange(async (_event, nextSession) => {
    await handleSession(nextSession);
    await loadQuestions();
  });
}

async function initialize() {
  renderExamSummary();
  renderDashboard();
  renderProfile();
  renderCurriculum();
  renderCommunity();
  renderShop();
  renderTimelineGame();
  renderRapidGame();
  renderConnectionsGame();
  renderDebateGame();
  bindEvents();
  await initializeSupabase();
  await loadQuestions();
}

initialize();
