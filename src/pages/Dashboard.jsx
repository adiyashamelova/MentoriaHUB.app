import React, { useState, useEffect, useRef } from 'react';

export default function Dashboard({ opportunities, courses, savedOpportunities, enrolledCourses, userProfile, lang, t }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // ==========================================
  // ВСТАВЬ СВОЙ GEMINI API КЛЮЧ В КАВЫЧКИ НИЖЕ
  const API_KEY = "AQ.Ab8RN6LWY0rtdKDsZJz0ghkIo82q7fbuR3URPGEYCc0Xq_Muiw"; 
  // ==========================================

  // ЗАЩИТА ОТ КРАША: Гарантируем, что массивы существуют
  const profile = {
    name: userProfile?.name || 'Student',
    grade: userProfile?.grade || '10',
    interests: userProfile?.interests || [],
    subjects: userProfile?.subjects || [],
    goal: userProfile?.goal || ''
  };

  // Словари для дашборда
  const dashTexts = {
    tabProfile: lang === 'ru' ? 'Профиль & Избранное' : lang === 'kk' ? 'Профиль және Таңдаулылар' : 'Profile & Saved',
    tabRecs: lang === 'ru' ? 'Рекомендации' : lang === 'kk' ? 'Ұсыныстар' : 'Recommendations',
    tabDeadlines: lang === 'ru' ? 'Дедлайны & Лидерборд' : lang === 'kk' ? 'Дедлайндар мен Лидерборд' : 'Deadlines & Leaderboard',
    tabRoadmap: lang === 'ru' ? 'Мой Roadmap' : lang === 'kk' ? 'Менің Жолбасшым' : 'My Roadmap',
    tabAi: lang === 'ru' ? 'AI Ментор' : lang === 'kk' ? 'AI Тәлімгер' : 'AI Mentor',
    
    gradeLabel: lang === 'ru' ? 'Класс' : lang === 'kk' ? 'Сынып' : 'Grade',
    goalLabel: lang === 'ru' ? 'Цель:' : lang === 'kk' ? 'Мақсат:' : 'Goal:',
    noSaved: lang === 'ru' ? 'Вы еще ничего не сохранили. Перейдите в каталог!' : lang === 'kk' ? 'Сіз әлі ештеңе сақтамадыңыз. Каталогқа өтіңіз!' : 'You haven\'t saved anything yet. Go to the catalog!',
    
    recsTitle: lang === 'ru' ? 'Специально для вас' : lang === 'kk' ? 'Арнайы сіз үшін' : 'Specially for you',
    recsDesc: lang === 'ru' ? 'Основано на ваших предметах, интересах и целях' : lang === 'kk' ? 'Сіздің пәндеріңіз, қызығушылықтарыңыз бен мақсаттарыңызға негізделген' : 'Based on your subjects, interests, and goals',
    
    urgent: lang === 'ru' ? 'Срочно' : lang === 'kk' ? 'Шұғыл' : 'Urgent',
    noDeadlines: lang === 'ru' ? 'Нет актуальных дедлайнов.' : lang === 'kk' ? 'Өзекті дедлайндар жоқ.' : 'No upcoming deadlines.',
    
    leaderboardTitle: lang === 'ru' ? 'Топ учеников' : lang === 'kk' ? 'Үздік оқушылар' : 'Top Students',
    points: lang === 'ru' ? 'очков' : lang === 'kk' ? 'ұпай' : 'pts',
    
    aiGreeting: lang === 'ru' 
      ? `Привет, ${profile.name}! Я твой AI-ментор Mentoria. Чем могу помочь?`
      : lang === 'kk'
        ? `Сәлем, ${profile.name}! Мен сенің Mentoria AI тәлімгеріңмін. Қалай көмектесе аламын?`
        : `Hi, ${profile.name}! I am your Mentoria AI Mentor. How can I help?`,
    chatPlaceholder: lang === 'ru' ? 'Напишите свой вопрос...' : lang === 'kk' ? 'Сұрағыңызды жазыңыз...' : 'Type your question...',
    send: lang === 'ru' ? 'Отправить' : lang === 'kk' ? 'Жіберу' : 'Send'
  };

  const tabs = [
    { id: 'profile', label: dashTexts.tabProfile, icon: '👤' },
    { id: 'recs', label: dashTexts.tabRecs, icon: '✨' },
    { id: 'deadlines', label: dashTexts.tabDeadlines, icon: '🏆' },
    { id: 'roadmap', label: dashTexts.tabRoadmap, icon: '🗺️' },
    { id: 'ai', label: dashTexts.tabAi, icon: '🤖' }
  ];

  const savedOppsData = opportunities.filter(o => savedOpportunities.includes(o.id));

  // АВТОМАТИЧЕСКИЕ РЕКОМЕНДАЦИИ
  const getRecommendations = () => {
    const userKeywords = [
      ...profile.interests,
      ...profile.subjects,
      profile.goal
    ].map(k => k.toLowerCase()).filter(Boolean);

    if (userKeywords.length === 0) return { opps: [], recCourses: [] };

    const scoreItem = (item) => {
      let score = 0;
      const itemText = JSON.stringify(item).toLowerCase();
      userKeywords.forEach(keyword => {
        if (itemText.includes(keyword)) score += 1;
      });
      return score;
    };

    const scoredOpps = opportunities
      .filter(o => !savedOpportunities.includes(o.id))
      .map(o => ({ ...o, score: scoreItem(o) }))
      .filter(o => o.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const scoredCourses = courses
      .map(c => ({ ...c, score: scoreItem(c) }))
      .filter(c => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return { opps: scoredOpps, recCourses: scoredCourses };
  };
  const recommendations = getRecommendations();

  // ДЕДЛАЙНЫ И ЛИДЕРБОРД
  const today = new Date('2026-06-17');
  const sortedDeadlines = [...savedOppsData].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const calculateUserScore = () => {
    let score = 0;
    Object.values(enrolledCourses).forEach(course => {
      if (course.completed) score += 500;
      else score += course.currentLessonIndex * 50;
    });
    return score;
  };
  
  const mockLeaderboard = [
    { id: 'u1', name: 'Alisher K.', score: 1250 },
    { id: 'u2', name: 'Aruzhan S.', score: 950 },
    { id: 'u3', name: 'Dias M.', score: 800 },
    { id: 'u4', name: 'Kamila T.', score: 450 },
    { id: 'me', name: `${profile.name}`, score: calculateUserScore(), isMe: true }
  ].sort((a, b) => b.score - a.score);

  // ROADMAP
  const getRoadmapSteps = (grade) => {
    const steps = [];
    if (grade === '8' || grade === '9') {
      steps.push(
        { 
          year: lang === 'ru' ? '8-9 класс' : lang === 'kk' ? '8-9 сынып' : '8-9 Grade', 
          title: lang === 'ru' ? 'Исследование' : lang === 'kk' ? 'Зерттеу' : 'Explore', 
          desc: lang === 'ru' ? 'Пробуй разные кружки, участвуй в олимпиадах, учи английский.' : lang === 'kk' ? 'Түрлі үйірмелерді көріңіз, олимпиадаларға қатысыңыз, ағылшын тілін үйреніңіз.' : 'Try clubs, participate in olympiads, learn English.' 
        },
        { 
          year: lang === 'ru' ? '10 класс' : lang === 'kk' ? '10 сынып' : '10 Grade', 
          title: lang === 'ru' ? 'Фокус' : lang === 'kk' ? 'Фокус' : 'Focus', 
          desc: lang === 'ru' ? 'Выбери 2-3 предмета. Начни готовиться к IELTS/SAT.' : lang === 'kk' ? '2-3 пәнді таңдаңыз. IELTS/SAT-қа дайындалуды бастаңыз.' : 'Choose 2-3 subjects. Start IELTS/SAT prep.' 
        },
        { 
          year: lang === 'ru' ? '11 класс' : lang === 'kk' ? '11 сынып' : '11 Grade', 
          title: lang === 'ru' ? 'Подача заявок' : lang === 'kk' ? 'Өтінім беру' : 'Applications', 
          desc: lang === 'ru' ? 'Сбор портфолио, рекомендаций, написание эссе.' : lang === 'kk' ? 'Портфолио, ұсыным хаттар жинау, эссе жазу.' : 'Portfolio, recommendations, essays.' 
        }
      );
    } else if (grade === '10') {
      steps.push(
        { 
          year: lang === 'ru' ? '10 класс' : lang === 'kk' ? '10 сынып' : '10 Grade', 
          title: lang === 'ru' ? 'Подготовка' : lang === 'kk' ? 'Дайындық' : 'Preparation', 
          desc: lang === 'ru' ? 'Углубленное изучение профильных предметов, подготовка к IELTS.' : lang === 'kk' ? 'Бейіндік пәндерді тереңдетіп оқу, IELTS-қа дайындық.' : 'Deep study of core subjects, IELTS prep.' 
        },
        { 
          year: lang === 'ru' ? 'Лето' : lang === 'kk' ? 'Жаз' : 'Summer', 
          title: lang === 'ru' ? 'Стажировки' : lang === 'kk' ? 'Тағылымдамалар' : 'Internships', 
          desc: lang === 'ru' ? 'Летние школы, хакатоны, волонтерство для портфолио.' : lang === 'kk' ? 'Жазғы мектептер, хакатондар, портфолио үшін волонтерлік.' : 'Summer schools, hackathons, volunteering.' 
        },
        { 
          year: lang === 'ru' ? '11 класс' : lang === 'kk' ? '11 сынып' : '11 Grade', 
          title: lang === 'ru' ? 'Экзамены и ВУЗы' : lang === 'kk' ? 'Емтихандар мен ЖОО' : 'Exams & Unis', 
          desc: lang === 'ru' ? 'Сдача IELTS/SAT, выбор университетов, написание Motivation Letter.' : lang === 'kk' ? 'IELTS/SAT тапсыру, университеттерді таңдау, Мотивациялық хат жазу.' : 'Taking IELTS/SAT, choosing unis, Motivation Letter.' 
        }
      );
    } else if (grade === '11') {
      steps.push(
        { 
          year: lang === 'ru' ? 'Осень' : lang === 'kk' ? 'Күз' : 'Fall', 
          title: lang === 'ru' ? 'Ранняя подача' : lang === 'kk' ? 'Ерте тапсыру' : 'Early Action', 
          desc: lang === 'ru' ? 'Дедлайны Early Action/Decision (Ноябрь). Последняя сдача SAT.' : lang === 'kk' ? 'Early Action/Decision дедлайндары (Қараша). Соңғы SAT тапсыру.' : 'Early Action deadlines (Nov). Last SAT.' 
        },
        { 
          year: lang === 'ru' ? 'Зима' : lang === 'kk' ? 'Қыс' : 'Winter', 
          title: lang === 'ru' ? 'Регулярная подача' : lang === 'kk' ? 'Негізгі тапсыру' : 'Regular Decision', 
          desc: lang === 'ru' ? 'Отправка заявок в основные университеты (Январь).' : lang === 'kk' ? 'Негізгі университеттерге өтінімдер жіберу (Қаңтар).' : 'Sending apps to main unis (Jan).' 
        },
        { 
          year: lang === 'ru' ? 'Весна' : lang === 'kk' ? 'Көктем' : 'Spring', 
          title: lang === 'ru' ? 'Решения и Виза' : lang === 'kk' ? 'Шешімдер және Виза' : 'Decisions & Visa', 
          desc: lang === 'ru' ? 'Получение офферов, стипендий. Подача на студенческую визу.' : lang === 'kk' ? 'Шақыртулар мен стипендиялар алу. Студенттік визаға өтініш беру.' : 'Offers, scholarships. Student visa app.' 
        }
      );
    } else if (grade === '12') {
      steps.push(
        { 
          year: lang === 'ru' ? 'Осень' : lang === 'kk' ? 'Күз' : 'Fall', 
          title: lang === 'ru' ? 'A-Levels / НИШ Exams' : lang === 'kk' ? 'A-Levels / НЗМ Емтихандары' : 'A-Levels / NIS Exams', 
          desc: lang === 'ru' ? 'Подготовка к финальным экзаменам. Подача в топовые вузы мира.' : lang === 'kk' ? 'Қорытынды емтихандарға дайындық. Әлемнің үздік ЖОО-ларына тапсыру.' : 'Final exams prep. Applying to global top unis.' 
        },
        { 
          year: lang === 'ru' ? 'Зима' : lang === 'kk' ? 'Қыс' : 'Winter', 
          title: lang === 'ru' ? 'Foundation / Direct Entry' : lang === 'kk' ? 'Foundation / Direct Entry' : 'Foundation / Direct Entry', 
          desc: lang === 'ru' ? 'Рассмотрение программ Foundation в UK или прямой набор в US/EU.' : lang === 'kk' ? 'Ұлыбританиядағы Foundation бағдарламаларын немесе АҚШ/ЕО-ға тікелей түсуді қарастыру.' : 'UK Foundation programs or US/EU direct entry.' 
        },
        { 
          year: lang === 'ru' ? 'Весна' : lang === 'kk' ? 'Көктем' : 'Spring', 
          title: lang === 'ru' ? 'Гранты и Офферы' : lang === 'kk' ? 'Гранттар мен Офферлер' : 'Grants & Offers', 
          desc: lang === 'ru' ? 'Оформление грантов, сдача финальных школьных экзаменов.' : lang === 'kk' ? 'Гранттарды рәсімдеу, қорытынды мектеп емтихандарын тапсыру.' : 'Processing grants, taking final school exams.' 
        }
      );
    }
    return steps;
  };
  const roadmapSteps = getRoadmapSteps(profile.grade);

  // AI MENTOR ЛОГИКА
  useEffect(() => {
    setChatMessages([{ id: 1, sender: 'ai', text: dashTexts.aiGreeting }]);
  }, [lang]);

  useEffect(() => {
    if (activeTab === 'ai' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, activeTab]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    if (API_KEY.trim().length > 10) {
      try {
        const systemPrompt = `Ты — AI-ментор образовательной платформы Mentoria Hub. 
        Данные ученика: Имя: ${profile.name}, Класс: ${profile.grade}, 
        Интересы: ${profile.interests.join(', ')}.
        Отвечай кратко. Язык ответа: ${lang === 'ru' ? 'Русский' : lang === 'kk' ? 'Казахский' : 'English'}.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nВопрос: ${userText}` }] }]
          })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const aiText = data.candidates[0].content.parts[0].text;
        setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiText }]);
      } catch (error) {
        setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: `❌ Ошибка API: ${error.message}` }]);
      }
    } else {
      setTimeout(() => {
        let aiResponseText = '';
        const lower = userText.toLowerCase();

        if (lower.includes('програм') || lower.includes('coding') || lower.includes('код') || lower.includes('бағдарлама')) {
          aiResponseText = lang === 'ru' 
            ? 'Для программистов советую "Хакатон Mentoria" или курс "Введение в Python". Посмотри в рекомендациях!' 
            : lang === 'kk'
              ? 'Бағдарламашыларға "Mentoria Hackathon" немесе "Python-ға кіріспе" курсын ұсынамын. Ұсыныстарды қараңыз!'
              : 'For coders, I recommend "Mentoria Hackathon" or the Python course!';
        } else if (lower.includes('бизнес') || lower.includes('business') || lower.includes('бизнес')) {
          aiResponseText = lang === 'ru' 
            ? 'Интересуешься бизнесом? Рекомендую "Кейс-чемпионат от EY".' 
            : lang === 'kk'
              ? 'Бизнеске қызығасыз ба? "EY Кейс-чемпионатын" ұсынамын.'
              : 'Business? Check out the "EY Case Championship".';
        } else {
          aiResponseText = lang === 'ru' 
            ? `Отличный вопрос, ${profile.name}! Посмотри наш Каталог, там много интересного.` 
            : lang === 'kk'
              ? `Жақсы сұрақ, ${profile.name}! Біздің Каталогты қараңыз, онда көптеген қызықты нәрселер бар.`
              : `Great question, ${profile.name}! Check out our Catalog for more.`;
        }
        setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponseText }]);
      }, 1000);
    }
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col gap-6 min-h-[80vh] animate-fade-in">
      {/* Навигация по вкладкам */}
      <div className="flex overflow-x-auto gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {/* Вкладка 1: ПРОФИЛЬ */}
        {activeTab === 'profile' && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 shadow-xl border border-indigo-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-white">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full flex items-center justify-center text-4xl font-extrabold shadow-lg border-4 border-white/20 shrink-0">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-extrabold mb-2">{profile.name}</h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-bold">
                      🎓 {profile.grade} {dashTexts.gradeLabel}
                    </span>
                    {profile.interests.map(i => (
                      <span key={i} className="px-3 py-1 bg-indigo-500/40 border border-indigo-400/30 rounded-lg text-sm font-bold">{i}</span>
                    ))}
                  </div>
                  {profile.goal && (
                    <div className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-sm">
                      <span className="text-emerald-300 font-medium">{dashTexts.goalLabel}</span> <span className="font-bold">{profile.goal}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {dashTexts.tabProfile} ({savedOppsData.length})
              </h2>
              {savedOppsData.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{dashTexts.noSaved}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedOppsData.map(opp => (
                    <div key={opp.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-lg uppercase">{opp.category}</span>
                        <span className="text-red-500 text-xl filter drop-shadow-sm">❤️</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{opp.title[lang] || opp.title['ru']}</h3>
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                        <span>⏳</span> {new Date(opp.deadline).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Вкладка 2: РЕКОМЕНДАЦИИ */}
        {activeTab === 'recs' && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">{dashTexts.recsTitle}</h2>
              <p className="text-slate-600 dark:text-slate-400">{dashTexts.recsDesc}</p>
            </div>
            {recommendations.opps.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> {lang === 'ru' ? 'Подходящие возможности' : lang === 'kk' ? 'Сәйкес мүмкіндіктер' : 'Matching Opportunities'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.opps.map(opp => (
                    <div key={opp.id} className="bg-gradient-to-b from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/10 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-900/50 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                        {lang === 'ru' ? 'Матч!' : lang === 'kk' ? 'Сәйкестік!' : 'Match!'}
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 pr-8">{opp.title[lang] || opp.title['ru']}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{opp.description[lang] || opp.description['ru']}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Вкладка 3: ДЕДЛАЙНЫ & ЛИДЕРБОРД */}
        {activeTab === 'deadlines' && (
          <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{dashTexts.tabDeadlines.split(' & ')[0]}</h2>
              {sortedDeadlines.length === 0 ? (
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center text-slate-500">
                  {dashTexts.noDeadlines}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {sortedDeadlines.map(opp => {
                    const deadlineDate = new Date(opp.deadline);
                    const diffTime = deadlineDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const isUrgent = diffDays >= 0 && diffDays <= 14;

                    return (
                      <div key={opp.id} className={`flex items-center justify-between p-5 rounded-2xl border-l-4 bg-white dark:bg-slate-800 shadow-sm ${isUrgent ? 'border-l-red-500 bg-red-50/30 dark:bg-red-900/10' : 'border-l-indigo-500'}`}>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-900 dark:text-white">{opp.title[lang] || opp.title['ru']}</h3>
                            {isUrgent && <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase animate-pulse">{dashTexts.urgent}</span>}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{opp.category} • {opp.format}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-extrabold ${isUrgent ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                            {deadlineDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{dashTexts.leaderboardTitle}</h2>
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="flex flex-col">
                  {mockLeaderboard.map((user, idx) => (
                    <div key={user.id} className={`flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700/50 last:border-0 ${user.isMe ? 'bg-indigo-50/50 dark:bg-indigo-900/30' : ''}`}>
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-slate-200 text-slate-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'text-slate-400'}`}>{idx + 1}</span>
                        <span className={`font-bold ${user.isMe ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-900 dark:text-white'}`}>{user.name} {user.isMe && '(Вы)'}</span>
                      </div>
                      <span className="font-extrabold text-slate-700 dark:text-slate-300">{user.score} <span className="text-xs font-normal text-slate-400">{dashTexts.points}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Вкладка 4: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-10">
              Roadmap: {profile.grade} {dashTexts.gradeLabel}
            </h2>
            <div className="relative border-l-2 border-indigo-200 dark:border-indigo-800 ml-4 md:ml-8 space-y-10 pb-8">
              {roadmapSteps.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-12">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900 shadow-sm"></div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-2 block uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/30 inline-block px-3 py-1 rounded-md">
                      {step.year}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Вкладка 5: AI MENTOR */}
        {activeTab === 'ai' && (
          <div className="animate-fade-in max-w-4xl mx-auto h-[600px] flex flex-col bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-inner relative">
            <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-md">🤖</div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Mentoria AI Mentor</h3>
                  <p className="text-xs text-emerald-500 font-medium flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Online</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'ai' && <div className="text-2xl mr-2 mt-1 opacity-80">🤖</div>}
                  <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'user' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-sm shadow-md' : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-tl-sm border border-slate-100 dark:border-slate-600 shadow-sm'}`}>
                    <p className="leading-relaxed text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="text-2xl mr-2 mt-1 opacity-80">🤖</div>
                  <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-tl-sm p-5 border border-slate-100 dark:border-slate-600 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <form onSubmit={handleSendChat} className="flex gap-3">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={dashTexts.chatPlaceholder} className="flex-1 px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white outline-none" />
                <button type="submit" disabled={!chatInput.trim() || isTyping} className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md">
                  {dashTexts.send}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}