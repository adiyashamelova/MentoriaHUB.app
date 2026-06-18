export const initialOpportunities = [
  {
    id: 1,
    title: { 
      ru: "Международная Жаутыковская Олимпиада", 
      en: "International Zhautykov Olympiad",
      kk: "Халықаралық Жәутіков Олимпиадасы"
    },
    category: "STEM",
    deadline: "2026-07-15",
    description: { 
      ru: "Престижная ежегодная олимпиада по математике, физике и информатике для старшеклассников со всего мира.", 
      en: "Prestigious annual olympiad in mathematics, physics, and computer science for high school students globally.",
      kk: "Бүкіл әлем бойынша жоғары сынып оқушыларына арналған математика, физика және информатикадан беделді жылдық олимпиада."
    },
    requirements: { 
      ru: "Ученики 10-12 классов с сильной академической базой.", 
      en: "10-12 grade students with a strong academic background.",
      kk: "Академиялық базасы мықты 10-12 сынып оқушылары."
    },
    format: "Offline",
    targetGrades: ['10', '11', '12'],
    tags: ["math", "physics", "coding", "olympiad"]
  },
  {
    id: 2,
    title: { 
      ru: "Хакатон Mentoria", 
      en: "Mentoria Hackathon",
      kk: "Mentoria Хакатоны"
    },
    category: "Coding",
    deadline: "2026-06-25",
    description: { 
      ru: "Создайте рабочий MVP образовательной платформы за выходные и выиграйте менторство от экспертов.", 
      en: "Build a working MVP of an educational platform over the weekend and win mentorship from experts.",
      kk: "Демалыс күндері білім беру платформасының жұмыс істейтін MVP жасаңыз және сарапшылардан тәлімгерлік ұтып алыңыз."
    },
    requirements: { 
      ru: "Команды от 2 до 4 человек, базовые знания программирования или дизайна.", 
      en: "Teams of 2 to 4 people, basic programming or design skills.",
      kk: "2-ден 4 адамға дейінгі командалар, бағдарламалау немесе дизайнның негізгі дағдылары."
    },
    format: "Online",
    targetGrades: ['8', '9', '10', '11', '12'],
    tags: ["hackathon", "development", "design", "teamwork"]
  },
  {
    id: 3,
    title: { 
      ru: "Летняя школа Astana Hub", 
      en: "Astana Hub Summer School",
      kk: "Astana Hub Жазғы мектебі"
    },
    category: "Business",
    deadline: "2026-07-01",
    description: { 
      ru: "Интенсивная летняя программа по основам технологического предпринимательства и созданию стартапов.", 
      en: "Intensive summer program on the basics of tech entrepreneurship and startup creation.",
      kk: "Технологиялық кәсіпкерлік негіздері және стартаптар құру бойынша қарқынды жазғы бағдарлама."
    },
    requirements: { 
      ru: "Ученики 10-12 классов, интересующиеся стартапами.", 
      en: "10-12 grade students interested in startups.",
      kk: "Стартаптарға қызығатын 10-12 сынып оқушылары."
    },
    format: "Offline",
    targetGrades: ['10', '11', '12'],
    tags: ["startup", "entrepreneurship", "summer school"]
  },
  {
    id: 4,
    title: { 
      ru: "Кейс-чемпионат от Ernst & Young", 
      en: "Ernst & Young Case Championship",
      kk: "Ernst & Young Кейс-чемпионаты"
    },
    category: "Business",
    deadline: "2026-07-10",
    description: { 
      ru: "Решение реальных бизнес-задач от ведущей консалтинговой компании с возможностью получить стажировку.", 
      en: "Solving real business cases from a top consulting firm with an opportunity to get an internship.",
      kk: "Тағылымдамадан өту мүмкіндігі бар жетекші консалтингтік компанияның нақты бизнес-міндеттерін шешу."
    },
    requirements: { 
      ru: "Ученики 11-12 классов и студенты 1 курса.", 
      en: "11-12th grade students and college freshmen.",
      kk: "11-12 сынып оқушылары және 1 курс студенттері."
    },
    format: "Online",
    targetGrades: ['11', '12'],
    tags: ["case study", "consulting", "finance"]
  },
  {
    id: 5,
    title: { 
      ru: "Программа TechGirls", 
      en: "TechGirls Program",
      kk: "TechGirls Бағдарламасы"
    },
    category: "STEM",
    deadline: "2026-06-30",
    description: { 
      ru: "Международная программа обмена для девушек, интересующихся наукой, технологиями, инженерией и математикой.", 
      en: "International exchange program for girls interested in science, technology, engineering, and math.",
      kk: "Ғылым, технология, инженерия және математикаға қызығатын қыздарға арналған халықаралық алмасу бағдарламасы."
    },
    requirements: { 
      ru: "Девушки 15-17 лет, продвинутый уровень английского языка.", 
      en: "Girls aged 15-17, advanced English level.",
      kk: "15-17 жастағы қыздар, ағылшын тілінің жоғары деңгейі."
    },
    format: "Offline",
    targetGrades: ['9', '10', '11'],
    tags: ["exchange", "girls in tech", "leadership"]
  },
  {
    id: 6,
    title: { 
      ru: "Волонтерство в Красном Полумесяце", 
      en: "Red Crescent Volunteering",
      kk: "Қызыл Жарты Ай қоғамындағы волонтерлік"
    },
    category: "Social",
    deadline: "2026-07-20",
    description: { 
      ru: "Присоединяйтесь к команде волонтеров для помощи в организации гуманитарных акций и обучении первой помощи.", 
      en: "Join the volunteer team to assist in organizing humanitarian actions and first aid training.",
      kk: "Гуманитарлық акцияларды ұйымдастыруға және алғашқы көмек көрсетуге үйретуге көмектесу үшін волонтерлер командасына қосылыңыз."
    },
    requirements: { 
      ru: "Возраст от 16 лет, готовность уделять 4 часа в неделю.", 
      en: "Age 16+, willingness to dedicate 4 hours a week.",
      kk: "16 жастан бастап, аптасына 4 сағат бөлуге дайын болу."
    },
    format: "Offline",
    targetGrades: ['9', '10', '11', '12'],
    tags: ["volunteering", "humanitarian", "social impact"]
  },
  {
    id: 7,
    title: { 
      ru: "Yandex Cup для начинающих", 
      en: "Yandex Cup for Beginners",
      kk: "Жаңадан бастаушыларға арналған Yandex Cup"
    },
    category: "Coding",
    deadline: "2026-07-05",
    description: { 
      ru: "Турнир по спортивному программированию с задачами алгоритмического характера.", 
      en: "Competitive programming tournament with algorithmic problems.",
      kk: "Алгоритмдік сипаттағы есептері бар спорттық бағдарламалау бойынша турнир."
    },
    requirements: { 
      ru: "Знание Python, C++ или Java на базовом уровне.", 
      en: "Basic knowledge of Python, C++, or Java.",
      kk: "Python, C++ немесе Java тілдерін базалық деңгейде білу."
    },
    format: "Online",
    targetGrades: ['8', '9', '10', '11', '12'],
    tags: ["algorithms", "competition", "yandex"]
  },
  {
    id: 8,
    title: { 
      ru: "Грант 'Зеленая Школа'", 
      en: "Grant 'Green School'",
      kk: "'Жасыл Мектеп' гранты"
    },
    category: "Social",
    deadline: "2026-06-28",
    description: { 
      ru: "Конкурс на получение финансирования для реализации экологических инициатив на базе вашей школы.", 
      en: "Competition for funding to implement environmental initiatives at your school.",
      kk: "Сіздің мектебіңіздің базасында экологиялық бастамаларды іске асыруды қаржыландыруға арналған байқау."
    },
    requirements: { 
      ru: "Школьные команды, наличие детального плана проекта.", 
      en: "School teams, presence of a detailed project plan.",
      kk: "Мектеп командалары, жобаның егжей-тегжейлі жоспарының болуы."
    },
    format: "Online",
    targetGrades: ['8', '9', '10', '11', '12'],
    tags: ["ecology", "grant", "sustainability"]
  },
  {
    id: 9,
    title: { 
      ru: "Летняя программа по физике", 
      en: "Summer Physics Program",
      kk: "Физика бойынша жазғы бағдарлама"
    },
    category: "STEM",
    deadline: "2026-07-18",
    description: { 
      ru: "Работа над научными проектами под руководством профессоров ведущих университетов.", 
      en: "Work on scientific projects under the guidance of professors from top universities.",
      kk: "Жетекші университеттердің профессорларының жетекшілігімен ғылыми жобалармен жұмыс істеу."
    },
    requirements: { 
      ru: "Ученики 10-12 классов, отличные оценки по физике.", 
      en: "10-12 grade students, excellent grades in physics.",
      kk: "10-12 сынып оқушылары, физикадан өте жақсы бағалар."
    },
    format: "Online",
    targetGrades: ['10', '11', '12'],
    tags: ["research", "physics", "science"]
  }
];

export const initialCourses = [
  {
    id: 1,
    title: { 
      ru: "SAT Math Prep", 
      en: "SAT Math Prep",
      kk: "SAT Math Дайындық"
    },
    description: { 
      ru: "Интенсивная подготовка к математической части экзамена SAT. Реальные задачи прошлых лет.", 
      en: "Intensive preparation for the SAT Math section. Real past paper problems.",
      kk: "SAT емтиханының математикалық бөліміне қарқынды дайындық. Нақты есептер."
    },
    level: "Advanced",
    lessons: [
      {
        id: 101,
        title: { 
          ru: "Урок 3: Digital SAT — One Variable Linear Equations", 
          en: "Lesson 3: Digital SAT — One Variable Linear Equations",
          kk: "3-сабақ: Digital SAT — One Variable Linear Equations"
        },
        description: {
          ru: "Разбор одной из ключевых тем математической секции экзамена Digital SAT — линейных уравнений с одной переменной. Урок включает необходимую теорию, методы решения и примеры тестовых заданий.",
          en: "An overview of one of the key topics in the Digital SAT Math section: linear equations with one variable. The lesson covers essential theory, solution methods, and practice test questions.",
          kk: "Digital SAT емтиханының математика бөлімінің негізгі тақырыптарының бірі — бір айнымалысы бар сызықтық теңдеулерді талдау. Сабақ қажетті теорияны, шешу әдістерін және тест тапсырмаларының мысалдарын қамтиды."
        },
        videoUrl: "https://youtu.be/4dB4I1djFKQ?si=tA0T6bvyE9x4dpU",
        quiz: {
          question: { 
            ru: "Если 3x - y = 12 и y = 3/2, чему равно значение 6x?", 
            en: "If 3x - y = 12 and y = 3/2, what is the value of 6x?",
            kk: "Егер 3x - y = 12 және y = 3/2 болса, 6x мәні неге тең?"
          },
          options: {
            ru: ["13.5", "27", "4.5", "24"],
            en: ["13.5", "27", "4.5", "24"],
            kk: ["13.5", "27", "4.5", "24"]
          },
          correctAnswer: 1
        }
      },
      {
        id: 102,
        title: { 
          ru: "Урок 4: SAT Math — System of Equations", 
          en: "Lesson 4: SAT Math — System of Equations",
          kk: "4-сабақ: SAT Math — System of Equations"
        },
        description: {
          ru: "Специализированный урок, посвященный системам уравнений для экзамена SAT Math. Рассматриваются графический метод, методы подстановки и исключения, а также разбор типичных экзаменационных задач.",
          en: "A specialized lesson focused on systems of equations for the SAT Math exam. It covers graphical methods, substitution, and elimination techniques, along with step-by-step solutions to typical exam problems.",
          kk: "SAT Math емтиханына арналған теңдеулер жүйесі тақырыбы бойынша арнайы сабақ. Графикалық әдіс, алмастыру және жою әдістері, сондай-ақ типтік емтихан есептерін талдау қарастырылады."
        },
        videoUrl: "https://youtu.be/enmqmubxpb4?si=cn5gxW3kM8CBWV-t",
        quiz: {
          question: { 
            ru: "Прямая в плоскости xy проходит через начало координат и имеет наклон 1/7. Какая точка лежит на этой прямой?", 
            en: "A line in the xy-plane passes through the origin and has a slope of 1/7. Which point lies on the line?",
            kk: "xy жазықтығындағы түзу координаталар басынан өтеді және 1/7 көлбеуге ие. Түзуде қай нүкте жатыр?"
          },
          options: {
            ru: ["(0, 7)", "(1, 7)", "(7, 1)", "(14, 2)"],
            en: ["(0, 7)", "(1, 7)", "(7, 1)", "(14, 2)"],
            kk: ["(0, 7)", "(1, 7)", "(7, 1)", "(14, 2)"]
          },
          correctAnswer: 2
        }
      }
    ]
  },
  {
    id: 2,
    title: { 
      ru: "Поступление в Лигу Плюща", 
      en: "Ivy League Admissions",
      kk: "Шырмауық Лигасына түсу"
    },
    description: { 
      ru: "Глубокий разбор Common App, эссе и стратегий поступления.", 
      en: "Deep dive into Common App, essays, and admission strategies.",
      kk: "Common App, эссе және түсу стратегияларын терең талдау."
    },
    level: "Advanced",
    lessons: [
      {
        id: 201,
        title: { 
          ru: "Урок 2: Common App Guide", 
          en: "Lesson 2: Common App Guide",
          kk: "2-сабақ: Common App Guide"
        },
        description: {
          ru: "Подробное пошаговое руководство по заполнению платформы Common App для подачи заявок в университеты США. Включает актуальные советы и разбор всех этапов процесса поступления.",
          en: "A detailed, step-by-step guide on filling out the Common App platform to apply to US universities. It includes up-to-date tips and a complete breakdown of the admission process.",
          kk: "АҚШ университеттеріне өтінім беруге арналған Common App платформасын толтыру бойынша егжей-тегжейлі қадамдық нұсқаулық. Оқуға түсу процесінің өзекті кеңестері мен барлық кезеңдерін қамтиды."
        },
        videoUrl: "https://youtu.be/Cy_QCLqb5Ek?si=GLMXYApAnX3KQUbD",
        quiz: {
          question: { 
            ru: "Для чего в первую очередь предназначена секция 'Additional Information' в Common App?", 
            en: "What is the primary purpose of the 'Additional Information' section on the Common Application?",
            kk: "Common App-та 'Additional Information' бөлімінің негізгі мақсаты қандай?"
          },
          options: {
            ru: ["Загрузка дополнительных 5 эссе", "Объяснение пробелов в оценках или уникальных обстоятельств", "Перечисление всех школьных наград", "Прикрепление резюме (CV)"],
            en: ["Uploading 5 extra essays", "Explaining gaps in grades or unique circumstances", "Listing all middle school awards", "Attaching a resume (CV)"],
            kk: ["Қосымша 5 эссе жүктеу", "Бағалардағы олқылықтарды немесе ерекше жағдайларды түсіндіру", "Мектеп марапаттарын атап өту", "Түйіндемені тіркеу (CV)"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  {
    id: 3,
    title: { 
      ru: "Введение в Python", 
      en: "Introduction to Python",
      kk: "Python-ға кіріспе"
    },
    description: { 
      ru: "Курс программирования. Изучите синтаксис, переменные, циклы и функции.", 
      en: "Programming course. Learn syntax, variables, loops, and functions.",
      kk: "Бағдарламалау курсы. Синтаксисті, айнымалыларды, циклдерді үйреніңіз."
    },
    level: "Beginner",
    lessons: [
      {
        id: 301,
        title: { 
          ru: "Урок 1: Python Crash Course", 
          en: "Lesson 1: Python Crash Course",
          kk: "1-сабақ: Python Crash Course"
        },
        description: {
          ru: "Краткий интенсивный курс по основам программирования на языке Python для начинающих. Позволяет быстро освоить базовый синтаксис и ключевые концепции менее чем за 10 минут.",
          en: "A short, intensive crash course on Python programming basics for beginners. It allows you to quickly grasp the fundamental syntax and key concepts in less than 10 minutes.",
          kk: "Бастаушыларға арналған Python бағдарламалау тілінің негіздері бойынша қысқаша интенсивті курс. Базалық синтаксис пен негізгі концепцияларды 10 минуттан аз уақыт ішінде тез меңгеруге мүмкіндік береді."
        },
        videoUrl: "https://youtu.be/fWjsdhR3z3c?si=aDv5ISpDluadcuy5",
        quiz: {
          question: { 
            ru: "Что выведет данный код: print([x * 2 for x in range(3)]) ?", 
            en: "What is the output of this code: print([x * 2 for x in range(3)]) ?",
            kk: "Бұл код не шығарады: print([x * 2 for x in range(3)]) ?"
          },
          options: {
            ru: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"],
            en: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"],
            kk: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"]
          },
          correctAnswer: 0
        }
      }
    ]
  }
];

export const translations = {
  ru: {
    navHome: "Главная", navCatalog: "Каталог", navCourses: "Курсы", navDashboard: "Личный кабинет", navAdmin: "Админка",
    heroTitle: "Твой путь к лучшим образовательным возможностям",
    heroSubtitle: "Находи стажировки, олимпиады и проходи курсы асинхронно в одном месте.",
    btnFindOpportunities: "Найти возможности", btnStartLearning: "Начать обучение",
    btnApply: "Подать заявку", btnSave: "Сохранить", btnSaved: "Сохранено",
    btnLearn: "Учиться", btnAdd: "Добавить", btnEdit: "Редактировать", btnDelete: "Удалить",
    btnSubmit: "Продолжить", btnFinish: "Завершить", btnBack: "Назад",
    filterAll: "Все", filterCategory: "Категория", filterFormat: "Формат",
    searchPlaceholder: "Поиск возможностей...", deadlinePrefix: "Дедлайн:",
    requirementsPrefix: "Требования:", levelPrefix: "Уровень:", courseProgress: "Прогресс:",
    dashboardSavedTabs: "Сохраненные", dashboardCoursesTabs: "Мои курсы",
    dashboardDeadlinesTab: "Дедлайны", dashboardRoadmapTab: "Мой Roadmap",
    dashboardRecommendedTab: "Рекомендации", dashboardAITab: "AI Ментор",
    onboardingTitle: "Добро пожаловать", onboardingDesc: "Расскажите нам о своих интересах",
    onboardingGrade: "В каком вы классе?", onboardingInterests: "Ваши интересы:",
    onboardingSubjects: "Любимые предметы:", onboardingGoals: "Ваша главная цель:",
    adminAddOpportunity: "Добавить", adminAddCourse: "Создать курс",
    languageSwitch: "ҚАЗ" 
  },
  en: {
    navHome: "Home", navCatalog: "Catalog", navCourses: "Courses", navDashboard: "Dashboard", navAdmin: "Admin",
    heroTitle: "Your path to the best educational opportunities",
    heroSubtitle: "Find internships, olympiads, and take courses all in one place.",
    btnFindOpportunities: "Find Opportunities", btnStartLearning: "Start Learning",
    btnApply: "Apply", btnSave: "Save", btnSaved: "Saved",
    btnLearn: "Learn", btnAdd: "Add", btnEdit: "Edit", btnDelete: "Delete",
    btnSubmit: "Continue", btnFinish: "Finish", btnBack: "Back",
    filterAll: "All", filterCategory: "Category", filterFormat: "Format",
    searchPlaceholder: "Search...", deadlinePrefix: "Deadline:",
    requirementsPrefix: "Requirements:", levelPrefix: "Level:", courseProgress: "Progress:",
    dashboardSavedTabs: "Saved", dashboardCoursesTabs: "My Courses",
    dashboardDeadlinesTab: "Deadlines", dashboardRoadmapTab: "Roadmap",
    dashboardRecommendedTab: "Recommended", dashboardAITab: "AI Mentor",
    onboardingTitle: "Welcome", onboardingDesc: "Tell us about your interests",
    onboardingGrade: "What grade are you in?", onboardingInterests: "Your interests:",
    onboardingSubjects: "Favorite subjects:", onboardingGoals: "Your main goal:",
    adminAddOpportunity: "Add", adminAddCourse: "Create Course",
    languageSwitch: "RU"
  },
  kk: {
    navHome: "Басты бет", navCatalog: "Каталог", navCourses: "Курстар", navDashboard: "Жеке кабинет", navAdmin: "Әкімшілік",
    heroTitle: "Үздік білім беру мүмкіндіктеріне бастар жол",
    heroSubtitle: "Тағылымдамалар мен олимпиадаларды бір жерден табыңыз.",
    btnFindOpportunities: "Мүмкіндіктерді табу", btnStartLearning: "Оқуды бастау",
    btnApply: "Өтінім беру", btnSave: "Сақтау", btnSaved: "Сақталды",
    btnLearn: "Оқу", btnAdd: "Қосу", btnEdit: "Өңдеу", btnDelete: "Жою",
    btnSubmit: "Жалғастыру", btnFinish: "Аяқтау", btnBack: "Артқа",
    filterAll: "Барлығы", filterCategory: "Санат", filterFormat: "Формат",
    searchPlaceholder: "Іздеу...", deadlinePrefix: "Дедлайн:",
    requirementsPrefix: "Талаптар:", levelPrefix: "Деңгей:", courseProgress: "Прогресс:",
    dashboardSavedTabs: "Сақталғандар", dashboardCoursesTabs: "Менің курстарым",
    dashboardDeadlinesTab: "Дедлайндар", dashboardRoadmapTab: "Менің Жолбасшым",
    dashboardRecommendedTab: "Ұсыныстар", dashboardAITab: "AI Тәлімгер",
    onboardingTitle: "Қош келдіңіз", onboardingDesc: "Қызығушылықтарыңыз туралы айтып беріңіз",
    onboardingGrade: "Қай сыныпта оқисыз?", onboardingInterests: "Қызығушылықтарыңыз:",
    onboardingSubjects: "Сүйікті пәндеріңіз:", onboardingGoals: "Басты мақсатыңыз:",
    adminAddOpportunity: "Қосу", adminAddCourse: "Курс жасау",
    languageSwitch: "EN"
  }
};