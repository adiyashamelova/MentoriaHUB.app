import React from 'react';

export default function Home({ setCurrentPage, lang, t }) {
  
  // Полностью локализованные тексты для Главной страницы
  const homeTexts = {
    heroHighlight: { 
      ru: "Без границ и расписаний", 
      en: "Without Borders or Schedules", 
      kk: "Шекарасыз және кестесіз" 
    },
    painPoint: {
      ru: "Устали терять важные дедлайны в бесконечных чатах Telegram? Сложно посещать живые занятия из-за разницы во времени и учебы? Mentoria Hub — это масштабируемая платформа, которая делает качественное образование доступным в любое время.",
      en: "Tired of losing important deadlines in endless Telegram chats? Hard to attend live classes due to time zones and school? Mentoria Hub is a scalable platform that makes quality education accessible anytime.",
      kk: "Шексіз Telegram чаттарында маңызды дедлайндарды жоғалтудан шаршадыңыз ба? Уақыт айырмашылығы мен сабаққа байланысты тікелей сабақтарға қатысу қиын ба? Mentoria Hub — сапалы білімді кез келген уақытта қолжетімді ететін платформа."
    },
    cta: { 
      ru: "Начать путь", 
      en: "Explore Now", 
      kk: "Бастау" 
    },
    whyMentoria: { 
      ru: "Почему Mentoria Hub?", 
      en: "Why Mentoria Hub?", 
      kk: "Неліктен Mentoria Hub?" 
    },
    f1Title: { 
      ru: "Поиск возможностей", 
      en: "Opportunity Search", 
      kk: "Мүмкіндіктерді іздеу" 
    },
    f1Desc: { 
      ru: "Находи конкурсы, олимпиады, стипендии и стажировки с помощью удобных фильтров и сохраняй их в один клик.", 
      en: "Find competitions, olympiads, scholarships, and internships using convenient filters and save them in one click.", 
      kk: "Ыңғайлы фильтрлердің көмегімен байқауларды, олимпиадаларды, стипендияларды және тағылымдамаларды тауып, оларды бір рет басу арқылы сақтаңыз." 
    },
    f2Title: { 
      ru: "Асинхронные курсы", 
      en: "Async Courses", 
      kk: "Асинхронды курстар" 
    },
    f2Desc: { 
      ru: "Проходи структурированные курсы от Mentoria в удобном для тебя темпе. Больше никакой зависимости от живых звонков.", 
      en: "Take structured courses from Mentoria at your own pace. No more dependency on live video calls.", 
      kk: "Mentoria-ның құрылымдалған курстарын өзіңізге ыңғайлы қарқынмен өтіңіз. Тікелей қоңырауларға тәуелділік жоқ." 
    },
    f3Title: { 
      ru: "AI Менторство", 
      en: "AI Mentorship", 
      kk: "AI Тәлімгерлік" 
    },
    f3Desc: { 
      ru: "Платформа анализирует твой профиль и рекомендует только те возможности, которые подходят твоим целям и классу.", 
      en: "The platform analyzes your profile and recommends only the opportunities that match your goals and grade.", 
      kk: "Платформа сіздің профиліңізді талдайды және сіздің мақсаттарыңыз бен сыныбыңызға сәйкес келетін мүмкіндіктерді ғана ұсынады." 
    }
  };

  const features = [
    {
      id: 1,
      icon: "🎯",
      title: homeTexts.f1Title[lang] || homeTexts.f1Title['ru'],
      description: homeTexts.f1Desc[lang] || homeTexts.f1Desc['ru']
    },
    {
      id: 2,
      icon: "📚",
      title: homeTexts.f2Title[lang] || homeTexts.f2Title['ru'],
      description: homeTexts.f2Desc[lang] || homeTexts.f2Desc['ru']
    },
    {
      id: 3,
      icon: "🤖",
      title: homeTexts.f3Title[lang] || homeTexts.f3Title['ru'],
      description: homeTexts.f3Desc[lang] || homeTexts.f3Desc['ru']
    }
  ];

  // Новые, более реалистичные вопросы FAQ
  const faqs = [
    {
      q: { 
        ru: 'Подойдет ли мне платформа, если я хочу поступить в Лигу Плюща?', 
        kk: 'Шырмауық Лигасына түскім келсе, платформа маған сәйкес келе ме?', 
        en: 'Will the platform suit me if I want to get into the Ivy League?' 
      },
      a: { 
        ru: 'Абсолютно! У нас есть специальный Roadmap для подготовки в топовые вузы США, а также курсы по заполнению Common App и написанию эссе (Personal Statement).', 
        kk: 'Әрине! Бізде АҚШ-тың топ ЖОО-ларына дайындалуға арналған арнайы Roadmap, сондай-ақ Common App толтыру және эссе жазу бойынша курстар бар.', 
        en: 'Absolutely! We have a special Roadmap for preparing for top US universities, as well as courses on filling out the Common App and writing a Personal Statement.' 
      }
    },
    {
      q: { 
        ru: 'Как AI Ментор помогает с выбором пути?', 
        kk: 'AI Тәлімгер бағыт таңдауға қалай көмектеседі?', 
        en: 'How does the AI Mentor help with choosing a path?' 
      },
      a: { 
        ru: 'Наш AI, работающий на базе Google Gemini, анализирует ваш класс, любимые предметы и цели. Он может подсказать, стоит ли вам участвовать в хакатоне или лучше сфокусироваться на IELTS.', 
        kk: 'Google Gemini негізінде жұмыс істейтін біздің AI сіздің сыныбыңызды, сүйікті пәндеріңізді және мақсаттарыңызды талдайды. Ол сізге хакатонға қатысу немесе IELTS-қа назар аудару керектігін айта алады.', 
        en: 'Our AI, powered by Google Gemini, analyzes your grade, favorite subjects, and goals. It can suggest whether you should participate in a hackathon or focus on IELTS.' 
      }
    },
    {
      q: { 
        ru: 'Могу ли я добавить сертификаты Mentoria в свое портфолио?', 
        kk: 'Mentoria сертификаттарын портфолиома қоса аламын ба?', 
        en: 'Can I add Mentoria certificates to my portfolio?' 
      },
      a: { 
        ru: 'Да! После прохождения наших асинхронных курсов вы получаете именной сертификат. Вы можете поделиться им в LinkedIn или прикрепить к своим заявкам в университеты.', 
        kk: 'Иә! Біздің асинхронды курстарды аяқтағаннан кейін сіз атаулы сертификат аласыз. Оны LinkedIn-де бөлісе аласыз немесе университеттерге өтінімдеріңізге тіркей аласыз.', 
        en: 'Yes! After completing our async courses, you receive a personalized certificate. You can share it on LinkedIn or attach it to your university applications.' 
      }
    }
  ];

  return (
    <div className="flex flex-col gap-16 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 shadow-sm">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            <span className="block mb-2">{t.heroTitle}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              {homeTexts.heroHighlight[lang] || homeTexts.heroHighlight['ru']}
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {homeTexts.painPoint[lang] || homeTexts.painPoint['ru']}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setCurrentPage('catalog')}
              className="px-8 py-4 w-full sm:w-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              {homeTexts.cta[lang] || homeTexts.cta['ru']}
            </button>
            <button
              onClick={() => setCurrentPage('courses')}
              className="px-8 py-4 w-full sm:w-auto rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            >
              {t.btnStartLearning}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {homeTexts.whyMentoria[lang] || homeTexts.whyMentoria['ru']}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 pt-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {lang === 'ru' ? 'Часто задаваемые вопросы' : lang === 'kk' ? 'Жиі қойылатын сұрақтар' : 'Frequently Asked Questions'}
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 dark:text-white">
                  {faq.q[lang] || faq.q['ru']}
                  <span className="transition duration-300 group-open:-rotate-180 text-indigo-500">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed text-sm animate-fade-in">
                  {faq.a[lang] || faq.a['ru']}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}