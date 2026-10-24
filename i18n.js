/**
 * Site language toggle (EN / RU) — added 2026-10-23, by direct request
 * ("переключатель EN/RU... переведи всё на русский"): Polina needed a
 * Russian version of the site in time for an IT job fair, with a switch
 * rather than two separate sites (she picked "Переключатель EN/RU" when
 * asked, over a fully separate single-language version).
 *
 * How it works: every translatable text node in index.html and about.html
 * carries a `data-i18n="<key>"` attribute. The dictionary below holds the
 * English and Russian copy for each key — the English strings are copied
 * verbatim from the site as it existed before this change; the Russian
 * strings are a new translation (a couple of lines — the hero greeting and
 * the three header nav labels — were already drafted in Russian directly in
 * Figma, node 1020:511; everything else here was translated fresh since the
 * Figma mockup only had those few lines in Russian).
 *
 * Default language is Russian (`ru`) on first visit — the site's next
 * audience is a Russian-language job fair — and the choice is remembered
 * per-browser in localStorage under `site-lang` after that. The static text
 * already sitting in each page's HTML is the Russian version, so there's no
 * flash of English before this script runs; switching to English (or back)
 * happens here.
 *
 * One dictionary file is shared by both pages (see the <script src="i18n.js">
 * tag near the end of <body> on each). Brand/proper names (Foxford, Podbor &
 * Recrutach, ITMO University, Freelance, LinkedIn) and "Email" are not
 * translated — they don't carry a data-i18n attribute and are left as-is in
 * the markup.
 */

(function () {
  var DICTIONARY = {
    // ---------- <title> ----------
    'meta.title.home': {
      en: 'Polina — Product & Visual Designer',
      ru: 'Полина — продуктовый и визуальный дизайнер',
    },
    'meta.title.about': {
      en: 'About — Polina, Product & Visual Designer',
      ru: 'Обо мне — Полина, продуктовый и визуальный дизайнер',
    },

    // ---------- nav (header + mobile-nav, both pages) ----------
    'nav.projects': { en: 'Projects', ru: 'Проекты' },
    'nav.about': { en: 'About me', ru: 'Обо мне' },

    // ---------- footer (both pages) ----------
    'footer.cv': { en: 'CV', ru: 'Резюме' },

    // ---------- index.html hero ----------
    'hero.meta.name': { en: 'Polina Okladnikova', ru: 'Полина Окладникова' },
    'hero.meta.experience': { en: '4 years of experience', ru: '4 года опыта' },
    'hero.hello': { en: 'Hello!', ru: 'Привет!' },
    'hero.name.intro': { en: 'My name is Polina', ru: 'Меня зовут Полина' },
    'hero.title': { en: 'I’m a product and visual designer', ru: 'Я продуктовый и визуальный дизайнер' },
    'hero.subtitle': { en: 'with 4 years of experience', ru: 'с 4-летним опытом работы' },

    // ---------- index.html project card (UNISYNC) ----------
    'project.unisync.date': { en: 'March – July 2026', ru: 'Март – июль 2026' },
    'project.unisync.title': { en: 'The university ecosystem', ru: 'Университетская экосистема' },
    'project.unisync.description': {
      en: 'UNISYNC — the university experience as one connected digital ecosystem — combining academic tools, campus services, and student life in a simple and intuitive mobile app',
      ru: 'UNISYNC — опыт обучения в университете как единая цифровая экосистема, объединяющая учебные инструменты, кампусные сервисы и студенческую жизнь в простом и интуитивно понятном мобильном приложении',
    },

    // ---------- index.html project card (AI Practice Passport, in progress) ----------
    // Updated 2026-10-23, by direct request ("на главном экране в заголовке
    // Паспорт AI-практики подпиши в скобках (в разработке)"): the
    // in-progress status is now spelled out in the title itself, translated
    // via this data-i18n entry — not baked into the case image.
    'project.aipp.date': { en: 'September 2026 – present', ru: 'Сентябрь 2026 – настоящее время' },
    'project.aipp.title': { en: 'AI Practice Passport (in progress)', ru: 'Паспорт AI-практики (в разработке)' },
    'project.aipp.description': {
      en: 'A training simulator — try out your company’s AI rules on a task similar to your real one, then get clear instructions.',
      ru: 'Тренировочный симулятор: опробуйте правила ИИ компании на задаче, похожей на вашу реальную, а затем получите четкие инструкции.',
    },

    // ---------- about.html intro ----------
    'about.heading': { en: 'Who I am', ru: 'Кто я' },
    'about.bio.p1': {
      en: 'I’m a Product Designer with a background in Communication Design — I bring systems thinking to every interface I build. Over the past 4 years, I’ve worked across brand identity, content design, and digital products for educational platforms and media brands, turning complex challenges into clear, scalable visual systems.',
      ru: 'Я продуктовый дизайнер с бэкграундом в коммуникационном дизайне — привношу системное мышление в каждый интерфейс, который создаю. За последние 4 года я работала над фирменным стилем, контент-дизайном и цифровыми продуктами для образовательных платформ и медиабрендов, превращая сложные задачи в понятные и масштабируемые визуальные системы.',
    },
    'about.bio.p2': {
      en: 'My approach combines strong visual craft with user-centered problem solving: prototyping and testing interfaces in Figma, running user interviews, and applying frameworks like JTBD and user flows to shape better product decisions.',
      ru: 'Мой подход сочетает сильную визуальную составляющую с решением задач, ориентированным на пользователя: прототипирование и тестирование интерфейсов в Figma, проведение пользовательских интервью и применение фреймворков вроде JTBD и user flow для более обоснованных продуктовых решений.',
    },
    'about.bio.p3': {
      en: 'I care about the details — from the way a design system scales across a team, to the way a single onboarding flow feels to a first-time user. Whether I’m building from scratch or refining something that already exists, I look for the simplest, clearest path to a solution that works for both users and the business.',
      ru: 'Для меня важны детали — от того, как дизайн-система масштабируется на команду, до того, как ощущается онбординг для нового пользователя. Создаю ли я что-то с нуля или дорабатываю существующее — я ищу самый простой и понятный путь к решению, которое работает и для пользователей, и для бизнеса.',
    },
    'about.bio.p4': {
      en: 'Currently open to Product Design and UI/UX roles — remote or relocation.',
      ru: 'Открыта к позициям Product Designer и UI/UX дизайнера — удалённо или с переездом.',
    },

    // ---------- about.html experience — shared role titles ----------
    'role.communication_designer': { en: 'Communication Designer', ru: 'Коммуникационный дизайнер' },
    'role.communication_designer_pt': { en: 'Communication Designer, part-time', ru: 'Коммуникационный дизайнер, частичная занятость' },
    'role.visual_designer': { en: 'Designer', ru: 'Дизайнер' },
    'role.freelance': { en: 'Communication & UX/UI Designer', ru: 'Коммуникационный и UX/UI дизайнер' },
    'role.product_designer': { en: 'Product Designer', ru: 'Продуктовый дизайнер' },

    // ---------- about.html — "Projects / Courses" and "Work Experience" group headings ----------
    // Added 2026-10-23 along with the new Wannabelike card, see claude.md §5/§8.
    'about.section.courses': { en: 'Projects / Courses', ru: 'Проекты / Курсы' },
    'about.section.experience': { en: 'Work Experience', ru: 'Опыт работы' },

    // ---------- about.html experience — Wannabelike (course project) ----------
    // Added 2026-10-23, by direct request — a new card in the "Projects / Courses"
    // group, above Work Experience. UNISYNC here is the same Behance case already
    // linked from the homepage project card (see project.unisync.* above) — this
    // entry documents it as coursework done through Wannabelike, not a duplicate.
    'exp.wannabelike.summary': {
      en: 'UNISYNC — a unified app for university life',
      ru: 'UNISYNC — единое приложение для университетской жизни',
    },
    'exp.wannabelike.bullet1': {
      en: 'Conducted 4 interviews, synthesized 14 JTBD insights, and used them to build user scenarios and the app’s screen structure (11 scenarios: schedule, payments, booking, dining hall, events, profile)',
      ru: 'Провела 4 интервью, синтезировала 14 JTBD-инсайтов и на их основе построила пользовательские сценарии и структуру экранов приложения (11 сценариев: расписание, оплата, бронирование, столовая, мероприятия, профиль)',
    },
    'exp.wannabelike.bullet2': {
      en: 'Designed wireframes, 40 screens, and a design system for them, speeding up prototyping with AI tools',
      ru: 'Спроектировала вайрфреймы, 40 экранов и дизайн-систему для них, ускорив прототипирование с помощью AI-инструментов',
    },
    'exp.wannabelike.bullet3': {
      en: 'Developed the design concept, 3D illustrations via neural networks, and a complete design system (typography, color, components), documented it, compiled the whole process into a case study, and received positive feedback from art directors',
      ru: 'Разработала концепцию дизайна, 3D-иллюстрации с помощью нейросетей и полноценную дизайн-систему (типографика, цвет, компоненты), задокументировала её, собрала весь процесс в кейс и получила положительный отклик от арт-директоров',
    },
    'exp.wannabelike.period1': { en: 'April 2026 – ', ru: 'Апрель 2026 – ' },
    'exp.wannabelike.period2': { en: 'August 2026', ru: 'август 2026' },

    // ---------- about.html experience — Foxford ----------
    // Updated 2026-10-23, by direct request ("обновим пункты в опыте работы"):
    // summary, all 3 bullets and the end date changed — see claude.md §5.
    'exp.foxford.summary': {
      en: 'Foxford — an online learning platform for elementary and middle school students (6.5M+ users)',
      ru: 'Foxford — платформа онлайн-обучения для учеников начальной и средней школы (6,5 млн+ пользователей)',
    },
    'exp.foxford.bullet1': {
      en: 'Worked on the design system and visual solutions for daily product content, reaching a combined ~20M views per month',
      ru: 'Работала над дизайн-системой и визуальными решениями для ежедневного продуктового контента с суммарным охватом ~20 млн просмотров в месяц',
    },
    'exp.foxford.bullet2': {
      en: 'Optimized the production process by integrating AI tools into the workflow, cutting content production time in half',
      ru: 'Оптимизировала процесс производства, внедрив AI-инструменты в рабочий процесс — время производства контента сократилось вдвое',
    },
    'exp.foxford.bullet3': {
      en: 'Mentored 2 interns up to full-time junior designer level within 3–4 months',
      ru: 'Довела 2 стажёров до штатных junior-позиций за 3–4 месяца, выступая их наставником',
    },
    'exp.foxford.period1': { en: 'Sept 2024 – ', ru: 'Сент 2024 – ' },
    'exp.foxford.period2': { en: 'Present', ru: 'настоящее время' },

    // ---------- about.html experience — Rekrutach (renamed from "Podbor & Recrutach") ----------
    // Updated 2026-10-23: brand name shortened to "Rekrutach" in the markup itself
    // (not a data-i18n key — company names aren't translated, see file header);
    // role now carries "part-time" (role.communication_designer_pt above); summary,
    // bullet order/wording and the start year all changed — see claude.md §5.
    'exp.podbor.summary': {
      en: 'Rekrutach — a media brand for IT recruiters (~11,000 subscribers)',
      ru: 'Rekrutach — медиа для IT-рекрутеров (~11 000 подписчиков)',
    },
    'exp.podbor.bullet1': {
      en: 'Built a design system from scratch for social media and presentation materials, cutting production time in half and reducing revision cycles to a single round',
      ru: 'Построила дизайн-систему с нуля для соцсетей и презентационных материалов, сократив время производства вдвое, а циклы правок — до одного раунда',
    },
    'exp.podbor.bullet2': {
      en: 'Increased average post engagement by ~70% through a full visual redesign of key media materials',
      ru: 'Увеличила средний engagement постов на ~70% благодаря полному визуальному редизайну ключевых медиаматериалов',
    },
    'exp.podbor.bullet3': {
      en: 'Aligned visual strategy with marketing, copywriting, and leadership through regular design reviews and feedback collection',
      ru: 'Согласовывала визуальную стратегию с маркетингом, копирайтингом и руководством через регулярные дизайн-ревью и сбор обратной связи',
    },
    'exp.podbor.period1': { en: 'August 2025 – ', ru: 'Авг 2025 – ' },
    'exp.podbor.period2': { en: 'Present', ru: 'настоящее время' },

    // ---------- about.html experience — ITMO University ----------
    // Updated 2026-10-23: role shortened to "Designer" (role.visual_designer
    // above), summary lightly reworded, bullets 1/2 swapped — see claude.md §5.
    'exp.itmo.summary': {
      en: 'PICT Fest — an annual career and tech festival at ITMO University, a top-4 technical university in Russia (~16,000 students)',
      ru: 'PICT Fest — ежегодный карьерный и технологический фестиваль в ИТМО, одном из топ-4 технических вузов России (~16 000 студентов)',
    },
    'exp.itmo.bullet1': {
      en: 'Designed the festival landing page, which tripled event attendance year-over-year by attracting new participants',
      ru: 'Спроектировала лендинг фестиваля, который утроил посещаемость год к году, привлекая новых участников',
    },
    'exp.itmo.bullet2': {
      en: 'Launched and ran the festival’s social media from scratch, growing the community from 0 to 150 members',
      ru: 'Запустила и вела соцсети фестиваля с нуля, вырастив сообщество с 0 до 150 участников',
    },
    'exp.itmo.bullet3': {
      en: 'Coordinated a team of 2 designers, ensuring visual consistency across all promotional materials',
      ru: 'Координировала команду из 2 дизайнеров, обеспечивая визуальную консистентность всех промо-материалов',
    },
    'exp.itmo.period1': { en: 'Oct 2023 – ', ru: 'Окт 2023 – ' },
    'exp.itmo.period2': { en: 'Dec 2023', ru: 'дек 2023' },

    // ---------- about.html experience — Freelance ----------
    'exp.freelance.summary': {
      en: 'Freelance — 20+ projects across branding and web design',
      ru: 'Фриланс — 20+ проектов в брендинге и веб-дизайне',
    },
    'exp.freelance.period1': { en: 'Aug 2022 – ', ru: 'Авг 2022 – ' },
    'exp.freelance.period2': { en: 'present', ru: 'настоящее время' },

    // ---------- case-ai-practice-passport.html ----------
    // Added 2026-10-23, by direct request ("перенеси эту страницу. она
    // должна открываться при нажатии на see case - AI Passport"): ports the
    // final, user-edited "case: AI Practice Passport" Figma frame (node
    // 1025:779) as a real bilingual page, linked from the AI Practice
    // Passport project card on index.html. The H1 reuses the same RU
    // product name already established by project.aipp.title above.
    'meta.title.case-aipp': {
      en: 'AI Practice Passport — Case Study, Polina Okladnikova',
      ru: 'AI Practice Passport — кейс, Полина Окладникова',
    },
    'case.aipp.back': { en: '← Projects', ru: '← Проекты' },
    'case.aipp.h1': { en: 'AI Practice Passport', ru: 'Паспорт AI-практики' },
    'case.aipp.subtitle': {
      en: 'A practice simulator that helps employees apply their company’s AI rules to a real work task, before they do it for real',
      ru: 'Тренажёр, который помогает сотрудникам применить правила ИИ компании к реальной рабочей задаче — ещё до того, как они сделают её по-настоящему',
    },

    'case.aipp.problem.heading': { en: 'The problem', ru: 'Проблема' },
    'case.aipp.problem.intro': {
      en: 'Companies give people an AI tool, a policy and a general course. People still don’t know: can I use AI for this task, with this data?',
      ru: 'Компании дают сотрудникам AI-инструмент, политику использования и общий курс. Но люди всё равно не понимают: можно ли применить ИИ для этой задачи, с этими данными?',
    },
    'case.aipp.stat1.label': {
      en: 'of employees say training doesn’t help them apply AI in their role',
      ru: 'сотрудников говорят, что обучение не помогает им применять ИИ в своей работе',
    },
    'case.aipp.stat2.label': {
      en: 'have entered customer data into AI tools without checking',
      ru: 'вводили клиентские данные в AI-инструменты, не проверив их',
    },
    'case.aipp.assumption': {
      en: 'My assumption: after a general course, an employee still isn’t sure how to apply the rules to their own task',
      ru: 'Моё предположение: после общего курса сотрудник всё ещё не уверен, как применить правила к своей конкретной задаче',
    },

    'case.aipp.who.heading': { en: 'Who is involved', ru: 'Кто участвует' },
    'case.aipp.who.role1': { en: 'Employee', ru: 'Сотрудник' },
    'case.aipp.who.desc1': {
      en: 'Practises on a fictional ticket and gets a clear instruction for the real task',
      ru: 'Тренируется на вымышленном тикете и получает чёткую инструкцию для реальной задачи',
    },
    'case.aipp.who.role2': {
      en: 'L&D / AI Enablement (owner and buyer)',
      ru: 'L&D / AI Enablement (владелец и заказчик)',
    },
    'case.aipp.who.desc2': {
      en: 'Builds exercises inside the rule and sees group summaries',
      ru: 'Собирает упражнения внутри правила и видит сводки по группе',
    },
    'case.aipp.who.role3': {
      en: 'Security / Legal / AI Governance (rule owner)',
      ru: 'Security / Legal / AI Governance (владелец правила)',
    },
    'case.aipp.who.desc3': {
      en: 'Publishes the rule once: allowed tool, forbidden data, what to check',
      ru: 'Публикует правило один раз: разрешённый инструмент, запрещённые данные, что нужно проверить',
    },

    'case.aipp.flow.heading': { en: 'The flow', ru: 'Как это работает' },
    'case.aipp.flow.step1.title': { en: 'Entry', ru: 'Вход' },
    'case.aipp.flow.step1.desc': {
      en: 'A pinned link in the support channel opens the task card',
      ru: 'Закреплённая ссылка в канале поддержки открывает карточку задачи',
    },
    'case.aipp.flow.step2.title': { en: 'Task card', ru: 'Карточка задачи' },
    'case.aipp.flow.step2.desc': {
      en: 'Shows the allowed tool, what to remove and what to check',
      ru: 'Показывает разрешённый инструмент, что нужно убрать и что проверить',
    },
    'case.aipp.flow.step3.title': { en: 'Exercise', ru: 'Упражнение' },
    'case.aipp.flow.step3.desc': {
      en: 'Short exercise on a fictional ticket: mark data that must not go into AI, pick the allowed tool, pick what to check in the result',
      ru: 'Короткое упражнение на вымышленном тикете: отметить данные, которые нельзя передавать в ИИ, выбрать разрешённый инструмент, выбрать, что проверить в результате',
    },
    'case.aipp.flow.step4.title': { en: 'Result', ru: 'Результат' },
    'case.aipp.flow.step4.desc': {
      en: 'One of three: “all safe”, “fix one step”, or “AI is not allowed here” (why, and what to do instead). No score — only the employee sees their attempts',
      ru: 'Один из трёх вариантов: «всё safe», «исправить один шаг» или «ИИ здесь не разрешён» (почему и что делать вместо этого). Без баллов — свои попытки видит только сам сотрудник',
    },
    'case.aipp.flow.step5.title': { en: 'Instruction', ru: 'Инструкция' },
    'case.aipp.flow.step5.desc': {
      en: 'Which tool, what to remove, what to check, when to stop',
      ru: 'Какой инструмент, что убрать, что проверить, когда остановиться',
    },
    'case.aipp.flow.step6.title': { en: 'Back to work', ru: 'Назад к работе' },
    'case.aipp.flow.step6.desc': {
      en: 'The employee does the real task in the allowed tool',
      ru: 'Сотрудник выполняет реальную задачу в разрешённом инструменте',
    },

    'case.aipp.measure.heading': { en: 'What I would measure', ru: 'Что бы я измеряла' },
    'case.aipp.measure.main.label': { en: 'MAIN', ru: 'ГЛАВНАЯ' },
    'case.aipp.measure.main.desc': {
      en: 'Of people who open the task card, the share who reach the instruction. Shows completion, not safe AI use at work',
      ru: 'Доля тех, кто открыл карточку задачи и дошёл до инструкции. Показывает завершение, а не безопасное использование ИИ на практике',
    },
    'case.aipp.measure.speed.label': { en: 'SPEED', ru: 'СКОРОСТЬ' },
    'case.aipp.measure.speed.desc': {
      en: 'Time to find the rule and time to finish the exercise, tracked separately',
      ru: 'Время на поиск правила и время на выполнение упражнения — отслеживаются отдельно',
    },
    'case.aipp.measure.errors.label': { en: 'ERRORS', ru: 'ОШИБКИ' },
    'case.aipp.measure.errors.desc': {
      en: 'Most common errors, as a group summary for L&D',
      ru: 'Самые частые ошибки — в виде сводки по группе для L&D',
    },
    'case.aipp.measure.guardrail.label': { en: 'GUARDRAIL', ru: 'ОГРАНИЧИТЕЛЬ' },
    'case.aipp.measure.guardrail.desc': {
      en: 'Where people drop the exercise and how often they retry',
      ru: 'На каком шаге люди бросают упражнение и как часто повторяют попытку',
    },
  };

  var STORAGE_KEY = 'site-lang';
  var DEFAULT_LANG = 'ru';

  function getStoredLang() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      return stored === 'en' || stored === 'ru' ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable (e.g. private mode) — toggle still works for this page view */
    }
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      var entry = DICTIONARY[key];
      if (entry) {
        nodes[i].textContent = entry[lang];
      }
    }

    // Elements that only exist in one language — e.g. the About page's last
    // bio line, which Polina asked to drop from the Russian version only
    // (added 2026-10-23). data-i18n-only="en" means "show only when lang is
    // en"; the element still carries its own data-i18n (above) so its text
    // is correct whenever it IS shown, including switching back from ru.
    var onlyNodes = document.querySelectorAll('[data-i18n-only]');
    for (var k = 0; k < onlyNodes.length; k++) {
      var showWhen = onlyNodes[k].getAttribute('data-i18n-only');
      onlyNodes[k].style.display = showWhen === lang ? '' : 'none';
    }

    var options = document.querySelectorAll('.language-toggle__option');
    for (var j = 0; j < options.length; j++) {
      var isActive = options[j].getAttribute('data-lang-switch') === lang;
      options[j].setAttribute('aria-pressed', String(isActive));
    }
  }

  function init() {
    var lang = getStoredLang() || DEFAULT_LANG;
    applyLanguage(lang);

    var options = document.querySelectorAll('.language-toggle__option');
    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener('click', function (event) {
        var newLang = event.currentTarget.getAttribute('data-lang-switch');
        storeLang(newLang);
        applyLanguage(newLang);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
