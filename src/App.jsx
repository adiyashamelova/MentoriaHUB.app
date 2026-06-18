import React, { useState, useEffect } from 'react';
import { initialOpportunities, initialCourses, translations } from './data/mockData';
import Navbar from './components/Navbar';
import OnboardingModal from './components/OnboardingModal';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

// Вспомогательный хук для удобной синхронизации состояния с localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default function App() {
  // --- Состояние (Синхронизация с localStorage) ---
  // ВАЖНО: Добавлены суффиксы _v3, чтобы браузер САМ сбросил старый сломанный кэш!
  const [lang, setLang] = useLocalStorage('mentoria_lang_v3', 'ru');
  const [theme, setTheme] = useLocalStorage('mentoria_theme_v3', 'light');
  const [currentPage, setCurrentPage] = useLocalStorage('mentoria_page_v3', 'home');
  const [opportunities, setOpportunities] = useLocalStorage('mentoria_opps_v3', initialOpportunities);
  const [courses, setCourses] = useLocalStorage('mentoria_courses_v3', initialCourses);
  const [userProfile, setUserProfile] = useLocalStorage('mentoria_profile_v3', null);
  const [savedOpportunities, setSavedOpportunities] = useLocalStorage('mentoria_saved_v3', []);
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage('mentoria_enrolled_v3', {});

  // Выбираем нужный словарь переводов
  const t = translations[lang] || translations['ru'];

  // --- Бизнес-логика (Функции) ---

  // Эффект для установки/удаления класса 'dark' на <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleSaveOpportunity = (id) => {
    setSavedOpportunities((prev) =>
      prev.includes(id) ? prev.filter((oppId) => oppId !== id) : [...prev, id]
    );
  };

  const enrollInCourse = (courseId) => {
    setEnrolledCourses((prev) => {
      if (prev[courseId]) return prev;
      return {
        ...prev,
        [courseId]: { currentLessonIndex: 0, completed: false }
      };
    });
  };

  const completeLesson = (courseId, lessonIndex) => {
    setEnrolledCourses((prev) => {
      const courseProgress = prev[courseId];
      if (!courseProgress) return prev;

      const course = courses.find((c) => c.id === courseId);
      const totalLessons = course ? course.lessons.length : 0;
      
      const nextIndex = courseProgress.currentLessonIndex + 1;
      const isCompleted = nextIndex >= totalLessons;

      return {
        ...prev,
        [courseId]: {
          ...courseProgress,
          currentLessonIndex: isCompleted ? courseProgress.currentLessonIndex : nextIndex,
          completed: isCompleted || courseProgress.completed
        }
      };
    });
  };

  const addOpportunity = (newOp) => {
    const opportunityToAdd = newOp.id ? newOp : { ...newOp, id: Date.now() };
    setOpportunities((prev) => [...prev, opportunityToAdd]);
  };

  const deleteOpportunity = (id) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
    // Также удаляем из избранного, если она там была
    setSavedOpportunities((prev) => prev.filter((oppId) => oppId !== id));
  };

  const addCourse = (newCourse) => {
    const courseToAdd = newCourse.id ? newCourse : { ...newCourse, id: Date.now() };
    setCourses((prev) => [...prev, courseToAdd]);
  };

  const finishOnboarding = (profileData) => {
    setUserProfile(profileData);
  };

  // --- Рендеринг интерфейса ---
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            lang={lang} 
            t={t} 
          />
        );
      case 'catalog':
        return (
          <Catalog 
            opportunities={opportunities} 
            savedOpportunities={savedOpportunities} 
            toggleSaveOpportunity={toggleSaveOpportunity} 
            lang={lang} 
            t={t} 
          />
        );
      case 'courses':
        return (
          <Courses 
            courses={courses} 
            enrolledCourses={enrolledCourses} 
            enrollInCourse={enrollInCourse} 
            completeLesson={completeLesson} 
            userProfile={userProfile} 
            lang={lang} 
            t={t} 
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            opportunities={opportunities} 
            courses={courses} 
            savedOpportunities={savedOpportunities} 
            enrolledCourses={enrolledCourses} 
            userProfile={userProfile} 
            lang={lang} 
            t={t} 
          />
        );
      case 'admin':
        return (
          <Admin 
            opportunities={opportunities}
            courses={courses}
            addOpportunity={addOpportunity} 
            deleteOpportunity={deleteOpportunity}
            addCourse={addCourse}
            lang={lang} 
            t={t} 
          />
        );
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            lang={lang} 
            t={t} 
          />
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        t={t}
      />
      
      {userProfile === null && (
        <OnboardingModal 
          onSave={finishOnboarding} 
          lang={lang} 
          t={t}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}