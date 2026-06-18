import React, { useState } from 'react';

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  lang, 
  setLang, 
  theme, 
  toggleTheme, 
  t 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Список ссылок для навигации с поддержкой 3 языков через объект t
  const navLinks = [
    { id: 'home', label: t.navHome || 'Home' },
    { id: 'catalog', label: t.navCatalog || 'Catalog' },
    { id: 'courses', label: t.navCourses || 'Courses' },
    { id: 'dashboard', label: t.navDashboard || 'Dashboard' },
    { id: 'admin', label: t.navAdmin || 'Admin' }
  ];

  // Переключение языка по кругу: ru -> en -> kk -> ru
  const toggleLang = () => {
    const nextLang = lang === 'ru' ? 'en' : lang === 'en' ? 'kk' : 'ru';
    setLang(nextLang);
  };

  // Хэндлер для клика по ссылке (меняет страницу и закрывает мобильное меню)
  const handleNavClick = (id) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    // ИНВЕРСИЯ: bg-[#0A1128] для светлой темы, dark:bg-white для темной
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 shadow-sm bg-[#0A1128] dark:bg-white border-b-2 border-[#00A896]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* === ЛЕВАЯ ЧАСТЬ: Логотип и название === */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => handleNavClick('home')}
        >
          <img 
            src="/mentoria-logo.png" 
            alt="Mentoria Logo" 
            className="w-9 h-9 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            style={{ border: '2px solid #00A896' }} 
          />
          <span className="text-2xl font-black tracking-tight text-white dark:text-[#0A1128] transition-colors group-hover:text-[#00A896] dark:group-hover:text-[#00A896]">
            Mentoria Hub
          </span>
        </div>

        {/* === ЦЕНТРАЛЬНАЯ ЧАСТЬ: Ссылки навигации (Десктоп) === */}
        <nav className="hidden md:flex gap-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                currentPage === link.id 
                  ? 'bg-[#152238] text-[#00A896] dark:bg-[#EAF8F9] dark:text-[#00A896]' // Активная
                  : 'text-slate-300 hover:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-100' // Неактивная
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* === ПРАВАЯ ЧАСТЬ: Язык, Тема и Бургер === */}
        <div className="flex items-center gap-3">
          {/* Кнопка переключения языка */}
          <button 
            onClick={toggleLang}
            className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all hover:scale-105 bg-[#152238] text-[#00A896] border border-[#1E2D4A] dark:bg-[#EAF8F9] dark:text-[#00A896] dark:border-[#CDECEB]"
            title="Сменить язык"
          >
            {lang.toUpperCase()}
          </button>

          {/* Кнопка переключения темы */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-lg transition-all hover:scale-105 bg-[#152238] text-[#00A896] border border-[#1E2D4A] dark:bg-[#EAF8F9] dark:text-[#00A896] dark:border-[#CDECEB]"
            title="Сменить тему"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Мобильная кнопка бургера (3 полоски) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-xl transition-colors text-slate-300 hover:bg-slate-800 dark:text-slate-600 dark:hover:bg-slate-100 focus:outline-none"
            aria-label="Открыть меню"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                // Иконка крестика (закрыть)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Иконка бургера (3 полоски)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
      </div>

      {/* === МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ МЕНЮ === */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t transition-all bg-[#0A1128] border-slate-800 dark:bg-white dark:border-slate-200">
          <nav className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl font-bold text-base transition-all ${
                  currentPage === link.id
                    ? 'bg-[#152238] text-[#00A896] dark:bg-[#EAF8F9] dark:text-[#00A896]'
                    : 'text-slate-300 hover:bg-slate-800 dark:text-slate-600 dark:hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}