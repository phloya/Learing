const ROADMAP_PATHS = {
  uz: ["./RoadMAP.uz.md", "./Roadmap.uz.md", "./roadmap.uz.md"],
  ru: ["./RoadMAP.md", "./Roadmap.md", "./roadmap.md"],
};

const STORAGE_KEY = "backend-roadmap-progress-v2";
const LOCALE_STORAGE_KEY = "backend-roadmap-locale-v1";
const DEFAULT_LOCALE = "uz";
const HIDDEN_SECTIONS = new Set([19]);

const LOCALES = {
  uz: {
    pageTitle: "Backend o'quv yo'li",
    pageLabel: "Backend o'quv yo'li",
    resetProgress: "Progressni tozalash",
    resetConfirm: "Barcha checkboxlarni tozalab, boshidan boshlaysizmi?",
    loadingEyebrow: "Tayyorlanmoqda",
    loadingTitle: "Roadmap yuklanmoqda...",
    loadingText: "Yuklangach, bu yerda bosqichlar, mavzular va brauzerda saqlanadigan progress bilan checkboxlar ko'rinadi.",
    errorEyebrow: "Yuklash xatosi",
    errorTitle: "Roadmap faylini o'qib bo'lmadi",
    errorText: "Brauzer bu katalogdagi Markdown faylni yuklashiga ruxsat berishi uchun saytni lokal server orqali oching.",
    overallProgress: "Umumiy progress",
    markedTopics: (completed, total) => `${completed} / ${total} mavzu belgilandi`,
    progressNote: "Checkboxlar brauzerda lokal saqlanadi, shuning uchun roadmap bo'ylab bosqichma-bosqich yurish mumkin.",
    completedSections: "Tugatilgan",
    completedSectionsMeta: (completed, total) => `${total} ta bo'limdan ${completed} tasi to'liq yopilgan`,
    learnBlock: "Nimani o'rganish kerak",
    laterBlock: "Keyinroq / chuqurlashtirish",
    practiceBlock: "Amaliyot",
    readinessBlock: "DoD",
    summaryFallback: "Mavzular va checkboxlarni ko'rish uchun bo'limni oching.",
    notStarted: "Boshlanmagan",
    done: "Tayyor",
    inProgress: "Jarayonda",
  },
  ru: {
    pageTitle: "Путь в backend",
    pageLabel: "Путь в backend",
    resetProgress: "Сбросить прогресс",
    resetConfirm: "Сбросить все чекбоксы и начать заново?",
    loadingEyebrow: "Подготовка",
    loadingTitle: "Загружаю roadmap...",
    loadingText: "После загрузки здесь появятся этапы, темы и чекбоксы с сохранением прогресса в браузере.",
    errorEyebrow: "Ошибка загрузки",
    errorTitle: "Не получилось прочитать roadmap-файл",
    errorText: "Открой сайт через локальный сервер, чтобы браузер разрешил загрузить Markdown из этого каталога.",
    overallProgress: "Общий прогресс",
    markedTopics: (completed, total) => `${completed} из ${total} тем отмечено`,
    progressNote: "Чекбоксы сохраняются локально в браузере, поэтому можно двигаться по roadmap постепенно.",
    completedSections: "Закрыто",
    completedSectionsMeta: (completed, total) => `полных разделов ${completed} из ${total}`,
    learnBlock: "Что учить",
    laterBlock: "Позже / углубление",
    practiceBlock: "Практика",
    readinessBlock: "DoD",
    summaryFallback: "Открой раздел, чтобы увидеть темы и чекбоксы.",
    notStarted: "Не начато",
    done: "Готово",
    inProgress: "В процессе",
  },
};

const STAGES = [
  {
    id: "stage-1",
    label: {
      uz: "Bosqich 1",
      ru: "Этап 1",
    },
    title: {
      uz: "Baza",
      ru: "База",
    },
    description: {
      uz: "HTTP, Python, Git, API, ma'lumotlar bazalari, FastAPI, auth, testlar va Docker.",
      ru: "HTTP, Python, Git, API, базы данных, FastAPI, auth, тесты и Docker.",
    },
    sectionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12],
  },
  {
    id: "stage-2",
    label: {
      uz: "Bosqich 2",
      ru: "Этап 2",
    },
    title: {
      uz: "Amaliyot va production",
      ru: "Практика и продакшен",
    },
    description: {
      uz: "Redis, security, Nginx, CI/CD, background jobs va observability.",
      ru: "Redis, security, Nginx, CI/CD, background jobs и observability.",
    },
    sectionNumbers: [10, 11, 13, 14, 16, 17],
  },
  {
    id: "stage-3",
    label: {
      uz: "Bosqich 3",
      ru: "Этап 3",
    },
    title: {
      uz: "Ishonchli daraja",
      ru: "Уверенный уровень",
    },
    description: {
      uz: "Arxitektura fikrlashi, masshtablash va yakuniy pet-loyihalar.",
      ru: "Архитектурное мышление, масштабирование и итоговые pet-проекты.",
    },
    sectionNumbers: [15, 18, 20, 21],
  },
];

const stageBySection = new Map();
for (const stage of STAGES) {
  for (const number of stage.sectionNumbers) {
    stageBySection.set(number, stage.id);
  }
}

const app = document.querySelector("#app");
const resetButton = document.querySelector("#reset-progress");
const pageLabel = document.querySelector("#page-label");
const localeButtons = [...document.querySelectorAll("[data-locale]")];

let roadmapModel = null;
let progressState = loadProgressState();
let currentLocale = loadLocale();
let openSections = new Set();

app.addEventListener("change", handleInputChange);
app.addEventListener("toggle", handleDetailsToggle, true);
resetButton.addEventListener("click", handleReset);
for (const button of localeButtons) {
  button.addEventListener("click", handleLocaleClick);
}

init();

async function init() {
  updateChrome();
  await loadRoadmapAndRender(false);
}

async function handleLocaleClick(event) {
  const button = event.currentTarget;
  const nextLocale = button.dataset.locale;

  if (!nextLocale || nextLocale === currentLocale) {
    return;
  }

  if (app.querySelector("details.section-card")) {
    openSections = collectOpenSections();
  }

  currentLocale = nextLocale;
  saveLocale();
  updateChrome();
  await loadRoadmapAndRender(true);
}

async function loadRoadmapAndRender(preserveScroll) {
  renderLoading();

  try {
    const source = await loadRoadmapText(currentLocale);
    roadmapModel = buildRoadmapModel(source.text, source.path);
    updateChrome();
    render(preserveScroll);
  } catch (error) {
    roadmapModel = null;
    updateChrome();
    renderError();
  }
}

async function loadRoadmapText(locale) {
  for (const path of getRoadmapPaths(locale)) {
    try {
      const response = await fetch(path, { cache: "no-store" });

      if (!response.ok) {
        continue;
      }

      return { path, text: await response.text() };
    } catch (error) {
      continue;
    }
  }

  throw new Error("Roadmap file is unavailable");
}

function getRoadmapPaths(locale) {
  return ROADMAP_PATHS[locale] || ROADMAP_PATHS[DEFAULT_LOCALE];
}

function buildRoadmapModel(markdown, sourcePath) {
  const parsedSections = parseTopLevelSections(markdown).map(parseSectionBody);
  const planSection = parsedSections.find((section) => section.number === 19) || null;
  const sections = parsedSections
    .filter((section) => !HIDDEN_SECTIONS.has(section.number))
    .map((section) => ({
      ...section,
      stageId: stageBySection.get(section.number) || "stage-3",
    }));

  return {
    sourcePath,
    sections,
    planSection,
  };
}

function parseTopLevelSections(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const sections = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const match = line.match(/^(\d+)\.\s+(.+)$/);

    if (match) {
      current = {
        number: Number(match[1]),
        title: match[2].trim(),
        raw: [],
      };
      sections.push(current);
      continue;
    }

    if (current) {
      current.raw.push(line);
    }
  }

  return sections;
}

function parseSectionBody(section) {
  const intro = [];
  const learnGroups = [];
  const laterGroups = [];
  const readiness = [];
  const planGroups = [];
  const projectGroups = [];

  let mode = section.number === 20 ? "readiness" : null;
  let currentGroup = null;

  for (const line of section.raw) {
    if (!line) {
      continue;
    }

    if (section.number === 19 && /^(Этап|Bosqich)\s+\d+/i.test(line)) {
      mode = "plan";
      currentGroup = pushGroup(planGroups, line);
      continue;
    }

    if (section.number === 21 && /^(Проект|Loyiha)\s+\d+/i.test(line)) {
      mode = "project";
      currentGroup = pushGroup(projectGroups, line);
      continue;
    }

    if (isReadinessHeader(line)) {
      mode = "readiness";
      currentGroup = null;
      continue;
    }

    if (isLaterHeader(line)) {
      mode = "later";
      currentGroup = null;
      continue;
    }

    if (isLearnGroupHeader(line)) {
      mode = "learn";
      currentGroup = pushGroup(learnGroups, normalizeGroupTitle(line));
      continue;
    }

    if (isLearnHeader(line)) {
      mode = "learn";
      currentGroup = null;
      continue;
    }

    if (mode === "readiness" && section.number === 20 && readiness.length === 0 && intro.length === 0 && line.endsWith(":")) {
      intro.push(line);
      continue;
    }

    if (mode === null) {
      intro.push(line);
      continue;
    }

    if (mode === "learn" || mode === "later") {
      const groupList = mode === "learn" ? learnGroups : laterGroups;

      if (isSubsectionHeader(line) || isShortColonHeader(line)) {
        currentGroup = pushGroup(groupList, normalizeGroupTitle(line));
        continue;
      }

      if (!currentGroup) {
        currentGroup = pushGroup(groupList, "", { showTitle: false });
      }

      currentGroup.items.push(createItem(line));
      continue;
    }

    if (mode === "readiness") {
      readiness.push(createItem(line));
      continue;
    }

    if (mode === "plan") {
      currentGroup.items.push(line);
      continue;
    }

    if (mode === "project") {
      currentGroup.items.push(createItem(line));
    }
  }

  const cleanLearnGroups = assignGroupItemIds(section.number, "learn", compactGroups(learnGroups));
  const cleanLaterGroups = assignGroupItemIds(section.number, "later", compactGroups(laterGroups));
  const cleanProjectGroups = assignGroupItemIds(section.number, "project", compactGroups(projectGroups));
  const cleanPlanGroups = compactGroups(planGroups);
  const readinessItems = assignListItemIds(section.number, "readiness", readiness);

  return {
    number: section.number,
    title: section.title,
    intro,
    learnGroups: cleanLearnGroups,
    laterGroups: cleanLaterGroups,
    readiness: readinessItems,
    planGroups: cleanPlanGroups,
    projectGroups: cleanProjectGroups,
    checklistItems: flattenChecklistItems(cleanLearnGroups, cleanLaterGroups, readinessItems, cleanProjectGroups),
  };
}

function compactGroups(groups) {
  return groups.filter((group) => group.items.length > 0);
}

function assignGroupItemIds(sectionNumber, bucket, groups) {
  return groups.map((group, groupIndex) => ({
    ...group,
    items: group.items.map((item, itemIndex) => ({
      ...item,
      id: createStableId(`${sectionNumber}|${bucket}|${groupIndex}|${itemIndex}`),
    })),
  }));
}

function assignListItemIds(sectionNumber, bucket, items) {
  return items.map((item, itemIndex) => ({
    ...item,
    id: createStableId(`${sectionNumber}|${bucket}|${itemIndex}`),
  }));
}

function flattenChecklistItems(learnGroups, laterGroups, readiness, projectGroups) {
  return [
    ...learnGroups.flatMap((group) => group.items),
    ...laterGroups.flatMap((group) => group.items),
    ...readiness,
    ...projectGroups.flatMap((group) => group.items),
  ];
}

function pushGroup(collection, title, options = {}) {
  const group = {
    title,
    items: [],
    showTitle: options.showTitle !== undefined ? options.showTitle : Boolean(title),
  };

  collection.push(group);
  return group;
}

function createItem(text) {
  return {
    text: text.trim(),
  };
}

function createStableId(value) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return `item-${(hash >>> 0).toString(36)}`;
}

function isLearnHeader(line) {
  const normalized = normalizeLine(line);
  return normalized === "что выучить" || normalized === "что учить сначала" || normalized === "nimani o'rganish kerak" || normalized === "avval nimani o'rganish kerak";
}

function isLearnGroupHeader(line) {
  const normalized = normalizeLine(line);
  return /^что выучить по\s+/.test(normalized)
    || /^.+\s+bo'yicha nimani o'rganish kerak$/.test(normalized)
    || normalized === "какой минимум нужен"
    || normalized === "что тебе нужно на старте"
    || normalized === "только базовое понимание"
    || normalized === "qanday minimum kerak"
    || normalized === "boshlash uchun senga nima kerak"
    || normalized === "faqat bazaviy tushuncha";
}

function isLaterHeader(line) {
  const normalized = normalizeLine(line);
  return normalized.startsWith("что пока не нужно") || normalized.startsWith("что пока рано") || normalized.startsWith("hozircha chuqur kirish shart emas") || normalized.startsWith("hali erta");
}

function isReadinessHeader(line) {
  return normalizeLine(line) === "dod";
}

function isSubsectionHeader(line) {
  return /^\d+\.\d+\s+/.test(line);
}

function isShortColonHeader(line) {
  return line.endsWith(":") && line.split(/\s+/).length <= 4;
}

function normalizeGroupTitle(line) {
  return line.replace(/^\d+\.\d+\s+/, "").replace(/:$/, "").trim();
}

function normalizeLine(line) {
  return line.trim().toLowerCase().replace(/:$/, "").replace(/\s+/g, " ");
}

function loadProgressState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function saveProgressState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
}

function loadLocale() {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    return raw === "ru" ? "ru" : DEFAULT_LOCALE;
  } catch (error) {
    return DEFAULT_LOCALE;
  }
}

function saveLocale() {
  localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale);
}

function handleInputChange(event) {
  const input = event.target;

  if (!(input instanceof HTMLInputElement) || !input.matches("input[data-item-id]")) {
    return;
  }

  if (input.checked) {
    progressState[input.dataset.itemId] = true;
  } else {
    delete progressState[input.dataset.itemId];
  }

  saveProgressState();
  render(true);
}

function handleDetailsToggle(event) {
  const element = event.target;

  if (!(element instanceof HTMLDetailsElement) || !element.classList.contains("section-card")) {
    return;
  }

  const sectionNumber = element.dataset.sectionNumber;

  if (!sectionNumber) {
    return;
  }

  if (element.open) {
    openSections.add(sectionNumber);
  } else {
    openSections.delete(sectionNumber);
  }
}

function handleReset() {
  if (!window.confirm(getLocaleCopy().resetConfirm)) {
    return;
  }

  progressState = {};
  saveProgressState();
  render(false);
}

function updateChrome() {
  const copy = getLocaleCopy();

  document.documentElement.lang = currentLocale;
  document.title = copy.pageTitle;

  if (pageLabel) {
    pageLabel.textContent = copy.pageLabel;
  }

  if (resetButton) {
    resetButton.textContent = copy.resetProgress;
  }

  updateLocaleButtons();
}

function updateLocaleButtons() {
  for (const button of localeButtons) {
    const isActive = button.dataset.locale === currentLocale;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }
}

function renderLoading() {
  const copy = getLocaleCopy();

  app.innerHTML = `
    <section class="loading-card card">
      <p class="eyebrow">${escapeHtml(copy.loadingEyebrow)}</p>
      <h2>${escapeHtml(copy.loadingTitle)}</h2>
      <p>${escapeHtml(copy.loadingText)}</p>
    </section>
  `;
}

function render(preserveScroll) {
  if (!roadmapModel) {
    return;
  }

  const scrollY = preserveScroll ? window.scrollY : 0;

  if (app.querySelector("details.section-card")) {
    openSections = collectOpenSections();
  }

  const view = computeViewModel(roadmapModel, progressState);

  if (openSections.size === 0 && view.currentSection) {
    openSections = new Set([String(view.currentSection.number)]);
  }

  app.innerHTML = [
    renderDashboard(view),
    renderStageOverview(view),
    ...STAGES.map((stage) => renderStageSection(stage, view)),
  ].join("");

  if (preserveScroll) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY });
    });
  }
}

function collectOpenSections() {
  return new Set(
    [...app.querySelectorAll("details.section-card[open]")]
      .map((section) => section.dataset.sectionNumber)
      .filter(Boolean)
  );
}

function renderError() {
  const copy = getLocaleCopy();

  app.innerHTML = `
    <section class="empty-state card">
      <p class="eyebrow">${escapeHtml(copy.errorEyebrow)}</p>
      <h2>${escapeHtml(copy.errorTitle)}</h2>
      <p class="empty-copy">${escapeHtml(copy.errorText)}</p>
      <code>python3 -m http.server 8000</code>
    </section>
  `;
}

function computeViewModel(model, state) {
  const metricsBySection = new Map();

  for (const section of model.sections) {
    metricsBySection.set(section.number, getMetrics(section.checklistItems, state));
  }

  const orderedSections = getOrderedSections(model.sections).map((section) => ({
    ...section,
    metrics: metricsBySection.get(section.number),
  }));

  const currentSection = orderedSections.find((section) => section.metrics.completed < section.metrics.total) || null;
  const nextSection = currentSection
    ? orderedSections
      .slice(orderedSections.findIndex((section) => section.number === currentSection.number) + 1)
      .find((section) => section.metrics.completed < section.metrics.total) || null
    : null;

  const overall = orderedSections.reduce(
    (accumulator, section) => {
      accumulator.total += section.metrics.total;
      accumulator.completed += section.metrics.completed;
      accumulator.completedSections += section.metrics.completed === section.metrics.total ? 1 : 0;
      return accumulator;
    },
    { total: 0, completed: 0, completedSections: 0 }
  );

  overall.percent = overall.total === 0 ? 0 : Math.round((overall.completed / overall.total) * 100);

  const stages = STAGES.map((stage, index) => {
    const stageSections = orderedSections.filter((section) => section.stageId === stage.id);
    const total = stageSections.reduce((sum, section) => sum + section.metrics.total, 0);
    const completed = stageSections.reduce((sum, section) => sum + section.metrics.completed, 0);
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    const plan = model.planSection && model.planSection.planGroups[index] ? model.planSection.planGroups[index] : null;

    return {
      ...stage,
      label: stage.label[currentLocale],
      title: stage.title[currentLocale],
      description: stage.description[currentLocale],
      sections: stageSections,
      total,
      completed,
      percent,
      plan,
    };
  });

  const currentStageId = currentSection ? currentSection.stageId : STAGES[STAGES.length - 1].id;

  return {
    orderedSections,
    currentSection,
    nextSection,
    overall,
    stages,
    currentStageId,
  };
}

function getOrderedSections(sections) {
  const remaining = new Map(sections.map((section) => [section.number, section]));
  const ordered = [];

  for (const stage of STAGES) {
    for (const number of stage.sectionNumbers) {
      if (remaining.has(number)) {
        ordered.push(remaining.get(number));
        remaining.delete(number);
      }
    }
  }

  const leftovers = [...remaining.values()].sort((left, right) => left.number - right.number);
  return [...ordered, ...leftovers];
}

function getMetrics(items, state) {
  const completed = items.filter((item) => state[item.id]).length;
  const total = items.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, total, percent };
}

function renderDashboard(view) {
  const copy = getLocaleCopy();

  return `
    <section class="stats-grid">
      <article class="stat-card stat-card--primary card">
        <p class="eyebrow">${escapeHtml(copy.overallProgress)}</p>
        <div class="stat-value">
          <strong>${view.overall.percent}%</strong>
          <span class="meta-text">${escapeHtml(copy.markedTopics(view.overall.completed, view.overall.total))}</span>
        </div>
        <div class="progress-track"><span style="width: ${view.overall.percent}%;"></span></div>
        <p class="stat-note">${escapeHtml(copy.progressNote)}</p>
      </article>

      <article class="stat-card card">
        <p class="eyebrow">${escapeHtml(copy.completedSections)}</p>
        <h2>${view.overall.completedSections}</h2>
        <p class="meta-text">${escapeHtml(copy.completedSectionsMeta(view.overall.completedSections, view.orderedSections.length))}</p>
      </article>
    </section>
  `;
}

function renderStageOverview(view) {
  return `
    <section class="stage-grid">
      ${view.stages.map((stage) => renderStageCard(stage, view.currentStageId)).join("")}
    </section>
  `;
}

function renderStageCard(stage, currentStageId) {
  const isActive = stage.id === currentStageId;
  const planItems = stage.plan ? stage.plan.items : [];
  const stageNote = stage.plan ? stage.plan.title : `${stage.label} - ${stage.title}`;

  return `
    <article class="stage-card ${isActive ? "is-active" : ""}">
      <div class="stage-title-row">
        <div>
          <p class="eyebrow">${escapeHtml(stage.label)}</p>
          <h3>${escapeHtml(stage.title)}</h3>
        </div>
        <span class="pill ${getPillClass(stage.id)}">${stage.completed}/${stage.total}</span>
      </div>
      <p class="stage-description">${escapeHtml(sanitizeStageNote(stageNote, stage.description))}</p>
      <div class="stage-track"><span style="width: ${stage.percent}%;"></span></div>
      <div class="chip-list">
        ${(planItems.length ? planItems : stage.description.split(", ")).slice(0, 8).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderStageSection(stage, view) {
  const stageData = view.stages.find((item) => item.id === stage.id);

  if (!stageData || stageData.sections.length === 0) {
    return "";
  }

  return `
    <section class="stage-section" id="${stage.id}">
      <div class="stage-header">
        <div>
          <p class="eyebrow">${escapeHtml(stageData.label)}</p>
          <h2>${escapeHtml(stageData.title)}</h2>
          <p class="stage-description">${escapeHtml(stageData.description)}</p>
        </div>
        <div class="section-meta">
          <strong>${stageData.percent}%</strong>
          <div class="stage-track"><span style="width: ${stageData.percent}%;"></span></div>
          <span class="meta-text">${stageData.completed} / ${stageData.total}</span>
        </div>
      </div>
      <div class="stage-body">
        <div class="section-grid">
          ${stageData.sections.map((section) => renderSectionCard(section, view.currentSection)).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSectionCard(section, currentSection) {
  const copy = getLocaleCopy();
  const summaryText = section.intro[0] || getSummaryFallback(section);
  const open = openSections.has(String(section.number)) || (!openSections.size && currentSection && currentSection.number === section.number);

  return `
    <details class="section-card" data-section-number="${section.number}" id="section-${section.number}" ${open ? "open" : ""}>
      <summary>
        <div class="section-title-wrap">
          <span class="section-number">${section.number}</span>
          <h3>${escapeHtml(section.title)}</h3>
          <p class="section-snippet">${escapeHtml(truncate(summaryText, 170))}</p>
        </div>
        <div class="section-meta">
          <span class="pill ${getProgressPillClass(section.metrics)}">${escapeHtml(getSectionStatus(section.metrics))}</span>
          <strong>${section.metrics.percent}%</strong>
          <div class="section-track"><span style="width: ${section.metrics.percent}%;"></span></div>
          <span class="meta-text">${section.metrics.completed} / ${section.metrics.total}</span>
        </div>
      </summary>

      <div class="section-content">
        ${renderIntro(section.intro)}
        ${renderGroupBlock(copy.learnBlock, section.learnGroups, "default")}
        ${renderGroupBlock(copy.laterBlock, section.laterGroups, "later")}
        ${renderReadinessBlock(section.readiness)}
        ${renderGroupBlock(copy.practiceBlock, section.projectGroups, "blue")}
      </div>
    </details>
  `;
}

function renderIntro(intro) {
  if (!intro.length) {
    return "";
  }

  return `
    <div class="intro-copy">
      ${intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>
  `;
}

function renderGroupBlock(title, groups, variant) {
  if (!groups.length) {
    return "";
  }

  return `
    <section class="group-block ${variant === "later" ? "group-block--later" : ""} ${variant === "blue" ? "group-block--dod" : ""}">
      <h4 class="group-title">${escapeHtml(title)}</h4>
      <div class="group-stack">
        ${groups.map((group) => renderChecklistGroup(group)).join("")}
      </div>
    </section>
  `;
}

function renderReadinessBlock(items) {
  if (!items.length) {
    return "";
  }

  return `
    <section class="group-block group-block--dod">
      <h4 class="group-title">${escapeHtml(getLocaleCopy().readinessBlock)}</h4>
      ${renderTaskList(items)}
    </section>
  `;
}

function renderChecklistGroup(group) {
  const groupTitle = group.showTitle ? `<p class="group-note"><strong>${escapeHtml(group.title)}</strong></p>` : "";

  return `
    <div>
      ${groupTitle}
      ${renderTaskList(group.items)}
    </div>
  `;
}

function renderTaskList(items) {
  return `
    <ul class="task-list">
      ${items.map((item) => renderTaskItem(item)).join("")}
    </ul>
  `;
}

function renderTaskItem(item) {
  const checked = Boolean(progressState[item.id]);

  return `
    <li class="task-item ${checked ? "is-done" : ""}">
      <label>
        <input type="checkbox" data-item-id="${item.id}" ${checked ? "checked" : ""}>
        <span>${escapeHtml(item.text)}</span>
      </label>
    </li>
  `;
}

function getSummaryFallback(section) {
  const firstLearn = section.learnGroups[0] && section.learnGroups[0].items[0] ? section.learnGroups[0].items[0].text : "";
  const firstProject = section.projectGroups[0] && section.projectGroups[0].items[0] ? section.projectGroups[0].items[0].text : "";
  const firstDoD = section.readiness[0] ? section.readiness[0].text : "";

  return firstLearn || firstProject || firstDoD || getLocaleCopy().summaryFallback;
}

function getSectionStatus(metrics) {
  const copy = getLocaleCopy();

  if (metrics.completed === 0) {
    return copy.notStarted;
  }

  if (metrics.completed === metrics.total) {
    return copy.done;
  }

  return copy.inProgress;
}

function getProgressPillClass(metrics) {
  if (metrics.completed === 0) {
    return "";
  }

  if (metrics.completed === metrics.total) {
    return "pill--accent";
  }

  return "pill--amber";
}

function getPillClass(stageId) {
  if (stageId === "stage-1") {
    return "pill--accent";
  }

  if (stageId === "stage-2") {
    return "pill--amber";
  }

  return "pill--blue";
}

function sanitizeStageNote(note, fallback) {
  if (!note) {
    return fallback;
  }

  const cleaned = note.replace(/^(Этап|Bosqich)\s+\d+\s+[—-]\s+/i, "").trim();

  if (cleaned === note || !cleaned) {
    return fallback;
  }

  return `${capitalize(cleaned)}. ${fallback}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3).trim()}...`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getLocaleCopy() {
  return LOCALES[currentLocale] || LOCALES[DEFAULT_LOCALE];
}
