import React, { useState } from 'react';

export default function Admin({ opportunities, courses, addOpportunity, deleteOpportunity, addCourse, lang, t }) {
  const [activeTab, setActiveTab] = useState('opportunities'); // 'opportunities' | 'courses'
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Стейт формы для возможностей
  const [oppForm, setOppForm] = useState({
    titleRu: '', titleEn: '', titleKk: '',
    descRu: '', descEn: '', descKk: '',
    category: 'STEM',
    format: 'Online',
    deadline: '',
    grades: []
  });

  // Стейт формы для курсов
  const [courseForm, setCourseForm] = useState({
    titleRu: '', titleEn: '', titleKk: '',
    descRu: '', descEn: '', descKk: '',
    level: 'Beginner'
  });

  const availableGrades = ['8', '9', '10', '11', '12'];

  const adminTexts = {
    title: lang === 'ru' ? 'Панель Администратора' : lang === 'kk' ? 'Әкімші тақтасы' : 'Admin Panel',
    subtitle: lang === 'ru' ? 'Управление контентом платформы Mentoria Hub.' : lang === 'kk' ? 'Mentoria Hub платформасының мазмұнын басқару.' : 'Manage Mentoria Hub platform content.',
    tabOpps: lang === 'ru' ? 'Управление возможностями' : lang === 'kk' ? 'Мүмкіндіктерді басқару' : 'Manage Opportunities',
    tabCourses: lang === 'ru' ? 'Управление курсами' : lang === 'kk' ? 'Курстарды басқару' : 'Manage Courses',
    statUsers: lang === 'ru' ? 'Всего пользователей' : lang === 'kk' ? 'Барлық пайдаланушылар' : 'Total Users',
    statTests: lang === 'ru' ? 'Пройдено тестов' : lang === 'kk' ? 'Тесттен өтті' : 'Tests Passed',
    statCerts: lang === 'ru' ? 'Выдано сертификатов' : lang === 'kk' ? 'Сертификаттар берілді' : 'Certificates Issued',
    formTitleRu: 'Название (RU)', formTitleEn: 'Title (EN)', formTitleKk: 'Атауы (KK)',
    formDescRu: 'Описание (RU)', formDescEn: 'Description (EN)', formDescKk: 'Сипаттамасы (KK)',
    catLabel: lang === 'ru' ? 'Категория' : lang === 'kk' ? 'Санат' : 'Category',
    formatLabel: lang === 'ru' ? 'Формат' : lang === 'kk' ? 'Формат' : 'Format',
    deadlineLabel: lang === 'ru' ? 'Дедлайн' : lang === 'kk' ? 'Дедлайн' : 'Deadline',
    gradesLabel: lang === 'ru' ? 'Целевые классы' : lang === 'kk' ? 'Мақсатты сыныптар' : 'Target Grades',
    levelLabel: lang === 'ru' ? 'Уровень курса' : lang === 'kk' ? 'Курс деңгейі' : 'Course Level',
    btnCreate: lang === 'ru' ? 'Создать карточку' : lang === 'kk' ? 'Карточка жасау' : 'Create Card',
    btnCreateCourse: lang === 'ru' ? 'Создать курс' : lang === 'kk' ? 'Курс жасау' : 'Create Course',
    btnDelete: lang === 'ru' ? 'Удалить' : lang === 'kk' ? 'Жою' : 'Delete',
    listTitle: lang === 'ru' ? 'Текущие возможности' : lang === 'kk' ? 'Ағымдағы мүмкіндіктер' : 'Current Opportunities',
    listCoursesTitle: lang === 'ru' ? 'Существующие курсы' : lang === 'kk' ? 'Бар курстар' : 'Existing Courses',
    successOpp: lang === 'ru' ? 'Возможность успешно добавлена!' : lang === 'kk' ? 'Мүмкіндік сәтті қосылды!' : 'Opportunity added successfully!',
    successCourse: lang === 'ru' ? 'Курс успешно создан!' : lang === 'kk' ? 'Курс сәтті жасалды!' : 'Course created successfully!',
    successDelete: lang === 'ru' ? 'Карточка удалена!' : lang === 'kk' ? 'Карточка жойылды!' : 'Card deleted!'
  };

  const stats = [
    { id: 1, title: adminTexts.statUsers, value: '1,240', icon: '👥', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 2, title: adminTexts.statTests, value: '8,430', icon: '📝', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { id: 3, title: adminTexts.statCerts, value: '3,210', icon: '🎓', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' }
  ];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ОПЕРАЦИИ С ВОЗМОЖНОСТЯМИ
  const handleOppChange = (e) => {
    const { name, value } = e.target;
    setOppForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleGrade = (grade) => {
    setOppForm(prev => ({
      ...prev,
      grades: prev.grades.includes(grade) 
        ? prev.grades.filter(g => g !== grade) 
        : [...prev.grades, grade]
    }));
  };

  const submitOpp = (e) => {
    e.preventDefault();
    const newOp = {
      id: Date.now(),
      title: { ru: oppForm.titleRu, en: oppForm.titleEn || oppForm.titleRu, kk: oppForm.titleKk || oppForm.titleRu },
      description: { ru: oppForm.descRu, en: oppForm.descEn || oppForm.descRu, kk: oppForm.descKk || oppForm.descRu },
      category: oppForm.category,
      format: oppForm.format,
      deadline: oppForm.deadline,
      targetGrades: oppForm.grades.length > 0 ? oppForm.grades : availableGrades,
      requirements: { ru: 'Требования уточняются', en: 'Requirements to be clarified', kk: 'Талаптар нақтылануда' },
      tags: ['new', oppForm.category.toLowerCase()]
    };
    addOpportunity(newOp);
    setOppForm({
      titleRu: '', titleEn: '', titleKk: '', descRu: '', descEn: '', descKk: '',
      category: 'STEM', format: 'Online', deadline: '', grades: []
    });
    triggerToast(adminTexts.successOpp);
  };

  const handleDeleteOpp = (id) => {
    deleteOpportunity(id);
    triggerToast(adminTexts.successDelete);
  };

  // ОПЕРАЦИИ С КУРСАМИ
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: value }));
  };

  const submitCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      title: { ru: courseForm.titleRu, en: courseForm.titleEn || courseForm.titleRu, kk: courseForm.titleKk || courseForm.titleRu },
      description: { ru: courseForm.descRu, en: courseForm.descEn || courseForm.descRu, kk: courseForm.descKk || courseForm.descRu },
      level: courseForm.level,
      lessons: []
    };
    addCourse(newCourse);
    setCourseForm({ titleRu: '', titleEn: '', titleKk: '', descRu: '', descEn: '', descKk: '', level: 'Beginner' });
    triggerToast(adminTexts.successCourse);
  };

  return (
    <div className="flex flex-col gap-8 relative animate-fade-in pb-12">
      {/* Toast Notification */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">✓</div>
          {toastMessage}
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          {adminTexts.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {adminTexts.subtitle}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
              <h3 className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 dark:border-slate-700 mt-4">
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'opportunities'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          🎯 {adminTexts.tabOpps}
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'courses'
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          📚 {adminTexts.tabCourses}
        </button>
      </div>

      {/* TAB 1: УПРАВЛЕНИЕ ВОЗМОЖНОСТЯМИ */}
      {activeTab === 'opportunities' && (
        <div className="flex flex-col gap-8 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">＋</span> {t.adminAddOpportunity}
            </h2>
            <form onSubmit={submitOpp} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* RU */}
                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">🇷🇺 Русский</h3>
                  <input type="text" name="titleRu" required value={oppForm.titleRu} onChange={handleOppChange} placeholder={adminTexts.formTitleRu} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
                  <textarea name="descRu" required rows="3" value={oppForm.descRu} onChange={handleOppChange} placeholder={adminTexts.formDescRu} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"></textarea>
                </div>

                {/* EN */}
                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">🇬🇧 English</h3>
                  <input type="text" name="titleEn" value={oppForm.titleEn} onChange={handleOppChange} placeholder={adminTexts.formTitleEn} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
                  <textarea name="descEn" rows="3" value={oppForm.descEn} onChange={handleOppChange} placeholder={adminTexts.formDescEn} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"></textarea>
                </div>

                {/* KK */}
                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">🇰🇿 Қазақша</h3>
                  <input type="text" name="titleKk" value={oppForm.titleKk} onChange={handleOppChange} placeholder={adminTexts.formTitleKk} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
                  <textarea name="descKk" rows="3" value={oppForm.descKk} onChange={handleOppChange} placeholder={adminTexts.formDescKk} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{adminTexts.catLabel}</label>
                  <select name="category" value={oppForm.category} onChange={handleOppChange} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white">
                    <option value="STEM">STEM</option>
                    <option value="Business">Business</option>
                    <option value="Social">Social</option>
                    <option value="Coding">Coding</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{adminTexts.formatLabel}</label>
                  <select name="format" value={oppForm.format} onChange={handleOppChange} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white">
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{adminTexts.deadlineLabel}</label>
                  <input type="date" name="deadline" required value={oppForm.deadline} onChange={handleOppChange} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{adminTexts.gradesLabel}</label>
                  <div className="flex gap-1">
                    {availableGrades.map(g => (
                      <button key={g} type="button" onClick={() => toggleGrade(g)} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-colors ${oppForm.grades.includes(g) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200'}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                <button type="submit" className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md">
                  {adminTexts.btnCreate}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{adminTexts.listTitle}</h3>
            <div className="grid gap-3">
              {opportunities.map(opp => (
                <div key={opp.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 group">
                  <div className="mb-3 sm:mb-0">
                    <span className="text-xs font-bold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded mr-3 uppercase">
                      {opp.category}
                    </span>
                    {/* ЗДЕСЬ СТОИТ ЖЕЛЕЗОБЕТОННАЯ ЗАЩИТА ОТ ПУСТЫХ ИМЕН */}
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {opp.title?.[lang] || opp.title?.ru || 'Без названия'}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteOpp(opp.id)} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 font-bold text-sm rounded-lg transition-colors">
                    {adminTexts.btnDelete}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: УПРАВЛЕНИЕ КУРСАМИ */}
      {activeTab === 'courses' && (
        <div className="flex flex-col gap-8 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">＋</span> {t.adminAddCourse}
            </h2>
            <form onSubmit={submitCourse} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">🇷🇺 Русский</h3>
                  <input type="text" name="titleRu" required value={courseForm.titleRu} onChange={handleCourseChange} placeholder={adminTexts.formTitleRu} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
                  <textarea name="descRu" required rows="3" value={courseForm.descRu} onChange={handleCourseChange} placeholder={adminTexts.formDescRu} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"></textarea>
                </div>

                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">🇬🇧 English</h3>
                  <input type="text" name="titleEn" value={courseForm.titleEn} onChange={handleCourseChange} placeholder={adminTexts.formTitleEn} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
                  <textarea name="descEn" rows="3" value={courseForm.descEn} onChange={handleCourseChange} placeholder={adminTexts.formDescEn} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"></textarea>
                </div>

                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">🇰🇿 Қазақша</h3>
                  <input type="text" name="titleKk" value={courseForm.titleKk} onChange={handleCourseChange} placeholder={adminTexts.formTitleKk} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
                  <textarea name="descKk" rows="3" value={courseForm.descKk} onChange={handleCourseChange} placeholder={adminTexts.formDescKk} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"></textarea>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{adminTexts.levelLabel}</label>
                <select name="level" value={courseForm.level} onChange={handleCourseChange} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                <button type="submit" className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md">
                  {adminTexts.btnCreateCourse}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{adminTexts.listCoursesTitle}</h3>
            <div className="grid gap-3">
              {courses.map(course => (
                <div key={course.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div>
                    <span className="text-xs font-bold px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded mr-3 uppercase">
                      {course.level}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {course.title?.[lang] || course.title?.ru || 'Без названия'}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-400">
                    {course.lessons?.length || 0} {lang === 'ru' ? 'уроков' : lang === 'kk' ? 'сабақ' : 'lessons'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}