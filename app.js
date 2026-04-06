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
    effect: "Unlocks a visual timeline ribbon and deeper unit notes."
  },
  {
    id: "debate-studio",
    name: "Debate Studio",
    cost: 180,
    effect: "Adds bonus argument prompts and thesis drills."
  },
  {
    id: "source-lens",
    name: "Source Lens",
    cost: 240,
    effect: "Shows sourcing hints and stimulus analysis cues."
  },
  {
    id: "streak-shield",
    name: "Streak Shield",
    cost: 320,
    effect: "Protects one daily streak miss each week."
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
  answers: [
    {
      id: "seed-answer",
      body: "Start with the cause-and-effect chain: new maritime technology enabled oceanic expansion, which shifted trade routes, intensified empire-building, and transformed labor systems like the Atlantic slave trade.",
      createdAt: new Date().toISOString(),
      authorName: "Chronicle Coach"
    }
  ]
};

const timelineEvents = [
  { label: "Mongol Empire facilitates exchange across Eurasia", year: 1206 },
  { label: "Zheng He's voyages project Ming power", year: 1405 },
  { label: "Columbus reaches the Americas", year: 1492 },
  { label: "Haitian Revolution begins", year: 1791 }
];

const rapidQuestions = [
  {
    prompt: "Which empire relied on the devshirme system to staff parts of its administration and military?",
    answers: ["Mughal Empire", "Ottoman Empire", "Qing Dynasty", "Songhai Empire"],
    correct: 1
  },
  {
    prompt: "What was a major effect of the Columbian Exchange?",
    answers: ["The collapse of Silk Road trade", "Widespread transfer of crops, animals, and diseases", "The end of Atlantic slavery", "The invention of steam power"],
    correct: 1
  },
  {
    prompt: "Which ideology most directly challenged monarchies during the Age of Revolutions?",
    answers: ["Humanism", "Mercantilism", "Enlightenment thought", "Social Darwinism"],
    correct: 2
  },
  {
    prompt: "Which development most shaped the Cold War after 1945?",
    answers: ["Competition between capitalist and communist blocs", "Collapse of all empires", "End of decolonization", "Disappearance of proxy wars"],
    correct: 0
  }
];

const connectionRounds = [
  {
    clue: "Railroads, steamships, and telegraphs accelerating exchange",
    answer: "TEC"
  },
  {
    clue: "Nationalism reshaping anti-colonial independence movements",
    answer: "GOV"
  },
  {
    clue: "Buddhism, Islam, and Christianity spreading through trade routes",
    answer: "CDI"
  },
  {
    clue: "Industrial capitalism reorganizing labor and class structures",
    answer: "SIO"
  }
];

const palette = ["#f97316", "#ef4444", "#0ea5e9", "#14b8a6", "#eab308"];
const config = window.CHRONICLE_CONFIG || {};
const hasSupabaseConfig =
  Boolean(config.supabaseUrl) &&
  Boolean(config.supabaseAnonKey) &&
  !config.supabaseUrl.includes("PASTE_YOUR_SUPABASE") &&
  !config.supabaseAnonKey.includes("PASTE_YOUR_SUPABASE");

const supabase = hasSupabaseConfig
  ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
  : null;

const state = {
  questions: [seedQuestion],
  session: null,
  authUser: null,
  user: null,
  authMode: "login"
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
  curriculumGrid: document.getElementById("curriculumGrid"),
  timelineGame: document.getElementById("timelineGame"),
  rapidGame: document.getElementById("rapidGame"),
  connectionsGame: document.getElementById("connectionsGame"),
  profileCard: document.getElementById("profileCard"),
  welcomeCopy: document.getElementById("welcomeCopy"),
  communityFeed: document.getElementById("communityFeed"),
  questionForm: document.getElementById("questionForm"),
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
    email: authUser?.email || ""
  };
}

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, points, coins, streak, unlocked_upgrades, completed_games, avatar_color, created_at")
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
  const setupDetail = hasSupabaseConfig ? "Live Supabase backend connected" : "Add your Supabase keys in public/config.js";
  const metrics = user
    ? [
        { label: "Experience", value: user.points, detail: "Earned by games and discussion" },
        { label: "Coins", value: user.coins, detail: "Spend them in the upgrade shop" },
        { label: "Streak", value: `${user.streak} day`, detail: "Built through consistent practice" },
        { label: "Upgrades", value: user.unlockedUpgrades.length, detail: "Toolkit items collected" }
      ]
    : [
        { label: "Mode", value: hasSupabaseConfig ? "Guest" : "Setup", detail: setupDetail },
        { label: "Units", value: curriculum.exam.units.length, detail: "Official AP World structure" },
        { label: "Games", value: 3, detail: "Quiz, chronology, and theme matching" },
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
        </article>
      `
    )
    .join("");

  dom.welcomeCopy.textContent = user ? `Signed in as ${user.displayName}` : hasSupabaseConfig ? "Guest mode" : "Setup mode";
}

function renderProfile() {
  if (!hasSupabaseConfig) {
    dom.profileCard.innerHTML = `
      <p>Before sign-in can work, add your Supabase project URL and anon key in <strong>public/config.js</strong>.</p>
      <p class="muted">The README walks you through it step by step.</p>
    `;
    dom.openAuthButton.classList.remove("hidden");
    dom.logoutButton.classList.add("hidden");
    return;
  }

  if (!state.user) {
    dom.profileCard.innerHTML = "<p>Sign in with email to save progress, collect points, and join peer Q&A.</p>";
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
      <div><p class="small-label">Streak</p><strong>${state.user.streak}</strong></div>
      <div><p class="small-label">Best Rounds</p><strong>${Object.keys(state.user.completedGames || {}).length}</strong></div>
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
        </article>
      `
    )
    .join("");

  dom.questionUnit.innerHTML = curriculum.exam.units
    .map((unit) => `<option value="${unit.id}">${unit.name}</option>`)
    .join("");
}

function renderCommunity() {
  if (!state.questions.length) {
    dom.communityFeed.innerHTML = `<p class="muted">No questions yet. Start the conversation.</p>`;
    return;
  }

  dom.communityFeed.innerHTML = state.questions
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
            <textarea name="answer" placeholder="Write a helpful answer, comparison, or source tip."></textarea>
            <button class="button secondary" type="submit">Answer</button>
          </form>
        </article>
      `
    )
    .join("");
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

function renderTimelineGame() {
  const shuffled = [...timelineEvents].sort(() => Math.random() - 0.5);
  dom.timelineGame.innerHTML = `
    <div class="score-line">
      <span>Pick the events in chronological order.</span>
      <span>4 rounds</span>
    </div>
    ${shuffled
      .map((event) => `<button class="choice" data-year="${event.year}">${event.label}</button>`)
      .join("")}
    <p class="form-message" data-game-message="timeline"></p>
  `;

  const picks = [];
  [...dom.timelineGame.querySelectorAll(".choice")].forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      picks.push(Number(button.dataset.year));
      if (picks.length === timelineEvents.length) {
        const sorted = [...picks].every((year, index, array) => index === 0 || array[index - 1] <= year);
        const score = sorted ? 100 : 45;
        dom.timelineGame.querySelector("[data-game-message='timeline']").textContent = sorted
          ? "Perfect chronology. You nailed the sequence."
          : "Close. Try again and watch the turning points more carefully.";
        await submitGameResult("timeline", score);
      }
    });
  });
}

function renderRapidGame() {
  let index = 0;
  let correct = 0;

  const renderRound = () => {
    const round = rapidQuestions[index];
    dom.rapidGame.innerHTML = `
      <div class="score-line">
        <span>Question ${index + 1} of ${rapidQuestions.length}</span>
        <span>${correct} correct</span>
      </div>
      <strong>${round.prompt}</strong>
      ${round.answers.map((answer, answerIndex) => `<button class="choice" data-answer="${answerIndex}">${answer}</button>`).join("")}
      <p class="form-message" data-game-message="rapid"></p>
    `;

    [...dom.rapidGame.querySelectorAll(".choice")].forEach((button) => {
      button.addEventListener("click", async () => {
        if (Number(button.dataset.answer) === round.correct) {
          correct += 1;
        }

        index += 1;
        if (index < rapidQuestions.length) {
          renderRound();
          return;
        }

        const score = Math.round((correct / rapidQuestions.length) * 100);
        dom.rapidGame.innerHTML = `
          <div class="score-line">
            <span>Round finished</span>
            <span>${correct}/${rapidQuestions.length} correct</span>
          </div>
          <strong>Your recall score: ${score}</strong>
          <button class="button primary" type="button">Play again</button>
          <p class="form-message">${score >= 75 ? "Strong exam pacing. Keep building." : "Solid start. Run it again to sharpen recall."}</p>
        `;
        dom.rapidGame.querySelector(".button").addEventListener("click", renderRapidGame);
        await submitGameResult("rapid", score);
      });
    });
  };

  renderRound();
}

function renderConnectionsGame() {
  const themeChoices = curriculum.exam.themes.map((theme) => theme.code);
  let index = 0;
  let correct = 0;

  const renderRound = () => {
    const round = connectionRounds[index];
    dom.connectionsGame.innerHTML = `
      <div class="score-line">
        <span>Theme match ${index + 1} of ${connectionRounds.length}</span>
        <span>${correct} correct</span>
      </div>
      <strong>${round.clue}</strong>
      ${themeChoices.map((theme) => `<button class="choice" data-theme="${theme}">${theme}</button>`).join("")}
      <p class="form-message"></p>
    `;

    [...dom.connectionsGame.querySelectorAll(".choice")].forEach((button) => {
      button.addEventListener("click", async () => {
        if (button.dataset.theme === round.answer) {
          correct += 1;
        }
        index += 1;
        if (index < connectionRounds.length) {
          renderRound();
          return;
        }

        const score = Math.round((correct / connectionRounds.length) * 100);
        dom.connectionsGame.innerHTML = `
          <div class="score-line">
            <span>Forge complete</span>
            <span>${correct}/${connectionRounds.length} correct</span>
          </div>
          <strong>Your theme score: ${score}</strong>
          <button class="button primary" type="button">Play again</button>
          <p class="form-message">${score === 100 ? "Excellent. Your big-picture framing is AP ready." : "Good work. Push for cleaner theme recognition next round."}</p>
        `;
        dom.connectionsGame.querySelector(".button").addEventListener("click", renderConnectionsGame);
        await submitGameResult("connections", score);
      });
    });
  };

  renderRound();
}

async function submitGameResult(gameId, score) {
  if (!state.user || !supabase) {
    renderProfile();
    return;
  }

  const { error } = await supabase.rpc("submit_game_result", {
    p_game_id: gameId,
    p_score: score
  });

  if (error) {
    console.error(error);
    return;
  }

  await refreshUser();
  renderDashboard();
  renderProfile();
  renderShop();
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
      supabase.from("questions").select("id, user_id, title, body, unit_id, tags, created_at").order("created_at", { ascending: false }),
      supabase.from("answers").select("id, question_id, user_id, body, created_at").order("created_at", { ascending: true }),
      supabase.from("profiles").select("id, display_name, username")
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
      body: answer.body,
      createdAt: answer.created_at,
      authorName: profile?.display_name || "Anonymous Scholar"
    });
    answersByQuestion.set(answer.question_id, bucket);
  });

  const liveQuestions = questions.map((question) => {
    const profile = profilesById.get(question.user_id);
    return {
      id: question.id,
      title: question.title,
      body: question.body,
      unitId: question.unit_id,
      tags: question.tags || [],
      createdAt: question.created_at,
      authorName: profile?.display_name || "Anonymous Scholar",
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
  renderShop();
}

async function handleSession(session) {
  state.session = session;
  state.authUser = session?.user || null;

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

function bindEvents() {
  dom.railLinks.forEach((link) => {
    link.addEventListener("click", () => switchPanel(link.dataset.section));
  });

  dom.jumpButtons.forEach((button) => {
    button.addEventListener("click", () => switchPanel(button.dataset.sectionJump));
  });

  dom.openAuthButton.addEventListener("click", () => {
    if (!hasSupabaseConfig) {
      dom.authMessage.textContent = "First add your Supabase URL and anon key to public/config.js.";
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
      dom.authMessage.textContent = "Add your Supabase project details in public/config.js first.";
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
  bindEvents();
  await initializeSupabase();
  await loadQuestions();
}

initialize();
