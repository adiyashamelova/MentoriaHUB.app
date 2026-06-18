import React, { useState } from 'react';

export default function Catalog({ opportunities, savedOpportunities, toggleSaveOpportunity, lang, t }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFormat, setActiveFormat] = useState('All');
  const [activeGrade, setActiveGrade] = useState('All');
  const [showApplyModal, setShowApplyModal] = useState(false);

  const categories = ['All', 'STEM', 'Business', 'Social', 'Coding'];
  const formats = ['All', 'Online', 'Offline'];
  const grades = ['All', '8', '9', '10', '11', '12'];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesCategory = activeCategory === 'All' || opp.category === activeCategory;
    const matchesFormat = activeFormat === 'All' || opp.format === activeFormat;
    
    // Бронированный фильтр по классу (если targetGrades нет, карточка не пропадет)
    const matchesGrade = activeGrade === 'All' || (opp.targetGrades && opp.targetGrades.includes(activeGrade));

    const searchLower = searchQuery.toLowerCase();
    // ЗАЩИТА: Если opp.title[lang] пустое, ищем по-русски
    const titleText = (opp.title?.[lang] || opp.title?.ru || '').toLowerCase();
    const descText = (opp.description?.[lang] || opp.description?.ru || '').toLowerCase();
    const matchesSearch = titleText.includes(searchLower) || descText.includes(searchLower);
    
    return matchesCategory && matchesFormat && matchesGrade && matchesSearch;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveFormat('All');
    setActiveGrade('All');
  };

  const handleApply = () => {
    setShowApplyModal(true);
    setTimeout(() => setShowApplyModal(false), 3000);
  };

  const texts = {
    reset: lang === 'ru' ? 'Сбросить фильтры' : lang === 'kk' ? 'Сүзгілерді тазарту' : 'Reset filters',
    formatLabel: lang === 'ru' ? 'Формат:' : lang === 'kk' ? 'Формат:' : 'Format:',
    gradeLabel: lang === 'ru' ? 'Класс:' : lang === 'kk' ? 'Сынып:' : 'Grade:',
    emptyState: lang === 'ru' ? 'Ничего не найдено. Попробуйте изменить параметры поиска.' : lang === 'kk' ? 'Ештеңе табылмады. Іздеу параметрлерін өзгертіп көріңіз.' : 'Nothing found. Try changing your search parameters.',
    successTitle: lang === 'ru' ? 'Заявка отправлена!' : lang === 'kk' ? 'Өтінім жіберілді!' : 'Application Sent!',
    successDesc: lang === 'ru' ? 'Ваша заявка успешно отправлена через Mentoria Hub.' : lang === 'kk' ? 'Сіздің өтініміңіз Mentoria Hub арқылы сәтті жіберілді.' : 'Your application has been successfully submitted via Mentoria Hub.',
    btnGreat: lang === 'ru' ? 'Отлично' : lang === 'kk' ? 'Жақсы' : 'Great',
    targetGradesLabel: lang === 'ru' ? 'Классы: ' : lang === 'kk' ? 'Сыныптар: ' : 'Grades: '
  };

  const getFormatText = (f) => {
    if (f === 'All') return t.filterAll;
    if (f === 'Online') return lang === 'ru' || lang === 'kk' ? 'Онлайн' : 'Online';
    if (f === 'Offline') return lang === 'ru' || lang === 'kk' ? 'Офлайн' : 'Offline';
    return f;
  };

  return (
    <div className="flex flex-col gap-8 relative animate-fade-in">
      {/* Toast */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl max-w-sm w-full text-center transform transition-all scale-100 opacity-100">
            <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg shadow-green-500/30">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {texts.successTitle}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {texts.successDesc}
            </p>
            <button
              onClick={() => setShowApplyModal(false)}
              className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md"
            >
              {texts.btnGreat}
            </button>
          </div>
        </div>
      )}

      {/* Поиск и категории */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 transition-colors shadow-inner outline-none"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-wrap gap-2 justify-start md:justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {cat === 'All' ? t.filterAll : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Нижние фильтры */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
          {/* Формат */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {texts.formatLabel}
            </span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner">
              {formats.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFormat(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeFormat === f
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {getFormatText(f)}
                </button>
              ))}
            </div>
          </div>

          {/* Класс */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {texts.gradeLabel}
            </span>
            <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner">
              {grades.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGrade(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeGrade === g
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {g === 'All' ? t.filterAll : g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(searchQuery || activeCategory !== 'All' || activeFormat !== 'All' || activeGrade !== 'All') && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {texts.reset}
          </button>
        )}
      </div>

      {/* Сетка карточек */}
      {filteredOpportunities.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-center mb-4 text-slate-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            {texts.emptyState}
          </p>
          <button 
            onClick={resetFilters}
            className="mt-6 px-6 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            {texts.reset}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opp => {
            const isSaved = savedOpportunities.includes(opp.id);
            const formatBadge = getFormatText(opp.format);

            return (
              <div key={opp.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold rounded-lg uppercase tracking-wider">
                      {opp.category}
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold rounded-lg uppercase tracking-wider">
                      {formatBadge}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className="p-2 -mr-2 -mt-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-7 w-7 transition-colors ${isSaved ? 'fill-red-500 text-red-500' : 'fill-none text-slate-300 dark:text-slate-600 group-hover:text-red-400'}`} 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isSaved ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* ЗАЩИТА: Если перевода нет, берем русский */}
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {opp.title?.[lang] || opp.title?.ru || 'Без названия'}
                </h3>

                <div className="flex flex-col gap-1.5 mb-4 text-sm">
                  <div className="flex items-center gap-2 font-medium text-amber-600 dark:text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t.deadlinePrefix} {new Date(opp.deadline).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  {opp.targetGrades && (
                    <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {texts.targetGradesLabel} {opp.targetGrades.join(', ')}
                    </div>
                  )}
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {opp.description?.[lang] || opp.description?.ru}
                </p>

                <button
                  onClick={handleApply}
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold rounded-xl transition-all mt-auto border border-slate-200 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 dark:group-hover:bg-indigo-500"
                >
                  {t.btnApply}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}