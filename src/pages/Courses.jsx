import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// УМНАЯ ФУНКЦИЯ: Автоматически превращает любую ссылку YouTube в рабочий плеер
const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  // Если ссылка уже правильная (embed), отдаем как есть
  if (url.includes('/embed/')) return url;
  
  // Если это обычная длинная ссылка (youtube.com/watch?v=ID)
  if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Если это короткая ссылка с телефона (youtu.be/ID)
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url; // Если это вообще не YouTube (например, Vimeo), просто возвращаем как есть
};

export default function Courses({ 
  courses, 
  enrolledCourses, 
  enrollInCourse, 
  completeLesson, 
  lang, 
  t, 
  userProfile 
}) {
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [viewingIndex, setViewingIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [activeTab, setActiveTab] = useState('video'); 
  
  // Получаем размеры окна для правильной работы конфетти
  const { width, height } = useWindowSize();

  // Красиво развернутые словари
  const texts = {
    back: lang === 'ru' ? 'Назад к курсам' : lang === 'kk' ? 'Курстарға қайту' : 'Back to courses',
    courseContent: lang === 'ru' ? 'Содержание курса' : lang === 'kk' ? 'Курс мазмұны' : 'Course Content',
    lesson: lang === 'ru' ? 'Урок' : lang === 'kk' ? 'Сабақ' : 'Lesson',
    tabVideo: lang === 'ru' ? 'Видеоурок' : lang === 'kk' ? 'Бейнесабақ' : 'Video Lesson',
    tabMaterials: lang === 'ru' ? 'Материалы' : lang === 'kk' ? 'Материалдар' : 'Materials',
    tabQuiz: lang === 'ru' ? 'Тестирование' : lang === 'kk' ? 'Тестілеу' : 'Quiz',
    mat1: lang === 'ru' ? 'Конспект лекции (PDF)' : lang === 'kk' ? 'Дәріс конспектісі (PDF)' : 'Lecture Notes (PDF)',
    mat2: lang === 'ru' ? 'Полезные формулы и шпаргалки' : lang === 'kk' ? 'Пайдалы формулалар' : 'Useful Formulas & Cheat Sheets',
    mat3: lang === 'ru' ? 'Дополнительное чтение по теме' : lang === 'kk' ? 'Қосымша оқу' : 'Additional Reading',
    matDownload: lang === 'ru' ? 'Скачать' : lang === 'kk' ? 'Жүктеп алу' : 'Download',
    quizTitle: lang === 'ru' ? 'Мини-тест для закрепления' : lang === 'kk' ? 'Бекітуге арналған шағын тест' : 'Mini-quiz to review',
    btnComplete: lang === 'ru' ? 'Завершить урок' : lang === 'kk' ? 'Сабақты аяқтау' : 'Complete Lesson',
    lessonPassed: lang === 'ru' ? 'Урок успешно пройден!' : lang === 'kk' ? 'Сабақ сәтті өтті!' : 'Lesson successfully completed!',
    courseCompleted: lang === 'ru' ? '🎉 Курс пройден!' : lang === 'kk' ? '🎉 Курс аяқталды!' : '🎉 Course Completed!',
    courseCompletedDesc: lang === 'ru' 
      ? 'Вы успешно завершили все уроки.' 
      : lang === 'kk' 
        ? 'Сіз барлық сабақтарды сәтті аяқтадыңыз.' 
        : 'You have successfully completed all lessons.',
    btnGetCert: lang === 'ru' ? 'Получить сертификат' : lang === 'kk' ? 'Сертификат алу' : 'Get Certificate',
    certTitle: lang === 'ru' ? 'Сертификат об окончании' : lang === 'kk' ? 'Аяқтау туралы сертификат' : 'Certificate of Completion',
    certVerify: lang === 'ru' ? 'Настоящим подтверждается, что' : lang === 'kk' ? 'Осы сертификатпен расталады:' : 'This is to certify that',
    certAction: lang === 'ru' ? 'успешно завершил(а) курс' : lang === 'kk' ? 'курсты сәтті аяқтағаны үшін беріледі' : 'has successfully completed the course',
    courseDescTitle: lang === 'ru' ? 'О чем этот урок?' : lang === 'kk' ? 'Бұл сабақ не туралы?' : 'What is this lesson about?',
    enrollBtn: lang === 'ru' ? 'Записаться на курс' : lang === 'kk' ? 'Курсқа жазылу' : 'Enroll in Course',
    resumeBtn: lang === 'ru' ? 'Продолжить обучение' : lang === 'kk' ? 'Оқуды жалғастыру' : 'Continue Learning',
    reviewBtn: lang === 'ru' ? 'Повторить материал' : lang === 'kk' ? 'Материалды қайталау' : 'Review Material',
    lessonsCount: lang === 'ru' ? 'уроков' : lang === 'kk' ? 'сабақ' : 'lessons',
    courseSubtitle: lang === 'ru' 
      ? 'Развивайте свои навыки с помощью структурированных видеоуроков. Проходите тесты и получайте сертификаты.' 
      : lang === 'kk' 
        ? 'Құрылымдалған бейнесабақтар арқылы дағдыларыңызды дамытыңыз. Тесттерден өтіп, сертификаттар алыңыз.' 
        : 'Develop your skills with structured video lessons. Take quizzes and earn certificates.'
  };

  const getProgress = (courseId, courseLessonsLength) => {
    const enrollment = enrolledCourses[courseId];
    if (!enrollment) return 0;
    if (enrollment.completed) return 100;
    return Math.round((enrollment.currentLessonIndex / courseLessonsLength) * 100);
  };

  const handleEnroll = (courseId) => {
    enrollInCourse(courseId);
    setActiveCourseId(courseId);
    setViewingIndex(0);
    setSelectedAnswer(null);
    setActiveTab('video');
  };

  const handleResume = (courseId) => {
    setActiveCourseId(courseId);
    const enrollment = enrolledCourses[courseId];
    const course = courses.find(c => c.id === courseId);
    setViewingIndex(enrollment.completed ? course.lessons.length - 1 : enrollment.currentLessonIndex);
    setSelectedAnswer(null);
    setActiveTab('video');
  };

  const handleLessonSelect = (index, isLocked) => {
    if (isLocked) return;
    setViewingIndex(index);
    setSelectedAnswer(null);
    setActiveTab('video');
  };

  const handleCompleteLesson = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    completeLesson(courseId, viewingIndex);
    
    const nextIndex = Math.min(viewingIndex + 1, course.lessons.length - 1);
    setViewingIndex(nextIndex);
    setSelectedAnswer(null);
    setActiveTab('video');
  };

  if (activeCourseId) {
    const course = courses.find(c => c.id === activeCourseId);
    const enrollment = enrolledCourses[course.id];
    const progress = getProgress(course.id, course.lessons.length);
    const currentLesson = course.lessons[viewingIndex];
    
    const isLessonCompleted = enrollment.completed || viewingIndex < enrollment.currentLessonIndex;
    const isCorrectAnswer = selectedAnswer === currentLesson.quiz.correctAnswer;

    return (
      <div className="flex flex-col gap-6 animate-fade-in relative">
        
        {/* Модалка Сертификата с Конфетти */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md transition-opacity">
            <Confetti width={width} height={height} recycle={false} numberOfPieces={600} gravity={0.15} />
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-2 transform transition-all relative overflow-hidden animate-fade-in z-10">
              <div className="border-4 border-double border-indigo-200 rounded-lg p-8 sm:p-12 text-center relative bg-amber-50/30">
                
                {/* Декоративные элементы */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-serif font-bold mb-6 shadow-lg shadow-indigo-200">
                    M
                  </div>
                  <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Mentoria Hub</h2>
                  <h1 className="text-4xl sm:text-5xl font-serif text-slate-900 mb-8 mt-4">{texts.certTitle}</h1>
                  <p className="text-slate-500 mb-2 italic">{texts.certVerify}</p>
                  <h3 className="text-3xl font-bold text-slate-800 border-b-2 border-indigo-200 inline-block px-8 pb-2 mb-8">
                    {userProfile?.name || 'Student'}
                  </h3>
                  <p className="text-slate-600 mb-2">{texts.certAction}</p>
                  <h4 className="text-2xl font-bold text-indigo-900 mb-10">
                    {course.title[lang] || course.title['ru']}
                  </h4>

                  {/* Кнопки шеринга */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://mentoria-hub.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0A66C2] text-white text-sm font-bold rounded-lg hover:bg-[#004182] transition shadow-md hover:-translate-y-0.5">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Share on LinkedIn
                    </a>
                    <a href="https://t.me/share/url?url=https://mentoria-hub.com&text=Я%20получил%20сертификат%20на%20Mentoria%20Hub!" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] text-white text-sm font-bold rounded-lg hover:bg-[#006699] transition shadow-md hover:-translate-y-0.5">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      Share on Telegram
                    </a>
                  </div>
                </div>
                <button onClick={() => setShowCertificate(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Верхняя навигация внутри курса */}
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveCourseId(null)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold text-sm shadow-sm border border-slate-200 dark:border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {texts.back}
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white truncate">
            {course.title[lang] || course.title['ru']}
          </h2>
        </div>

        {/* Прогресс-бар */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {t.courseProgress}
            </span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 sm:h-4 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковое меню с уроками */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 px-2 text-lg">
              {texts.courseContent}
            </h3>
            
            {course.lessons.map((lesson, idx) => {
              const isActive = idx === viewingIndex;
              const isDone = enrollment.completed || idx < enrollment.currentLessonIndex;
              const isLocked = !enrollment.completed && idx > enrollment.currentLessonIndex;

              return (
                <button 
                  key={lesson.id} 
                  onClick={() => handleLessonSelect(idx, isLocked)} 
                  disabled={isLocked} 
                  className={`flex items-start gap-3 p-4 rounded-2xl text-left transition-all border-2 ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 shadow-sm' 
                      : isLocked 
                        ? 'bg-slate-50 dark:bg-slate-800/50 border-transparent opacity-60 cursor-not-allowed' 
                        : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500'
                  }`}
                >
                  <div className={`mt-0.5 w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs ${
                    isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {isDone ? '✓' : isLocked ? '🔒' : (idx + 1)}
                  </div>
                  <div>
                    <p className={`font-bold text-sm line-clamp-2 ${isActive ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-700 dark:text-slate-300'}`}>
                      {lesson.title[lang] || lesson.title['ru']}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {texts.lesson} {idx + 1}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Главная часть: Видео и Вкладки */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
              
              {/* ВСТРОЕННЫЙ ВИДЕОПЛЕЕР */}
              <div className="aspect-video bg-slate-900 relative">
                <iframe 
                  className="w-full h-full absolute top-0 left-0" 
                  src={getYouTubeEmbedUrl(currentLesson.videoUrl)} /* ТУТ РАБОТАЕТ НАША УМНАЯ ФУНКЦИЯ */
                  title={currentLesson.title[lang] || "Video lesson"} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="border-b border-slate-200 dark:border-slate-700 flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                <button onClick={() => setActiveTab('video')} className={`flex-1 py-4 px-6 text-center font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'video' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>📺 {texts.tabVideo}</button>
                <button onClick={() => setActiveTab('materials')} className={`flex-1 py-4 px-6 text-center font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'materials' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>📚 {texts.tabMaterials}</button>
                <button onClick={() => setActiveTab('quiz')} className={`flex-1 py-4 px-6 text-center font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'quiz' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>📝 {texts.tabQuiz}</button>
              </div>

              <div className="p-6 md:p-8">
                
                {/* 1. Видео описание */}
                {activeTab === 'video' && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{currentLesson.title[lang] || currentLesson.title['ru']}</h3>
                    <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">{texts.courseDescTitle}</h4>
                    {/* ВОТ ЗДЕСЬ ИСПРАВЛЕНИЕ: Теперь показывает описание урока, а не курса */}
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {(currentLesson.description && (currentLesson.description[lang] || currentLesson.description['ru'])) || (course.description[lang] || course.description['ru'])}
                    </p>
                  </div>
                )}

                {/* 2. Материалы */}
                {activeTab === 'materials' && (
                  <div className="animate-fade-in">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{texts.tabMaterials}</h4>
                    <div className="grid gap-3">
                      {/* Материал 1 */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl flex items-center justify-center text-xl">📄</div>
                          <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{texts.mat1}</span>
                        </div>
                        <button className="text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">{texts.matDownload}</button>
                      </div>
                      
                      {/* Материал 2 */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center text-xl">💡</div>
                          <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{texts.mat2}</span>
                        </div>
                        <button className="text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">{texts.matDownload}</button>
                      </div>

                      {/* Материал 3 */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center text-xl">🔗</div>
                          <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{texts.mat3}</span>
                        </div>
                        <button className="text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">{texts.matDownload}</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Тестирование */}
                {activeTab === 'quiz' && (
                  <div className="animate-fade-in bg-indigo-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-indigo-100 dark:border-slate-700">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><span className="text-2xl">📝</span>{texts.quizTitle}</h4>
                    <div className="mb-6">
                      <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{currentLesson.quiz.question[lang] || currentLesson.quiz.question['ru']}</p>
                      <div className="flex flex-col gap-3">
                        {(currentLesson.quiz.options[lang] || currentLesson.quiz.options['ru']).map((opt, i) => {
                          const isSelected = selectedAnswer === i;
                          const showCorrectness = isLessonCompleted || (selectedAnswer !== null);
                          const isActuallyCorrect = i === currentLesson.quiz.correctAnswer;
                          
                          let styles = "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400";
                          if (isSelected) styles = "border-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200";
                          if (showCorrectness && isActuallyCorrect) styles = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200";
                          else if (showCorrectness && isSelected && !isActuallyCorrect) styles = "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200";

                          return (
                            <label key={i} className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${styles} ${isLessonCompleted ? 'pointer-events-none' : ''}`}>
                              <input type="radio" name="quiz" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" disabled={isLessonCompleted} checked={isSelected || (isLessonCompleted && isActuallyCorrect)} onChange={() => setSelectedAnswer(i)} />
                              <span className="font-medium">{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {!isLessonCompleted && (
                      <div className="mt-8 flex justify-end">
                        <button onClick={() => handleCompleteLesson(course.id)} disabled={!isCorrectAnswer} className={`px-8 py-3.5 rounded-xl font-bold transition-all shadow-md ${isCorrectAnswer ? 'bg-emerald-600 hover:bg-emerald-700 text-white transform hover:-translate-y-0.5' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'}`}>
                          {texts.btnComplete}
                        </button>
                      </div>
                    )}
                    
                    {isLessonCompleted && !enrollment.completed && (
                      <div className="mt-6 p-4 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded-xl font-bold flex items-center gap-2">
                        <span>✓</span> {texts.lessonPassed}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Финальный экран курса */}
            {enrollment.completed && (
              <div className="text-center p-8 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-3xl border border-amber-200 dark:border-amber-800/50 shadow-sm">
                <h4 className="text-2xl font-extrabold text-amber-900 dark:text-amber-400 mb-2">{texts.courseCompleted}</h4>
                <p className="text-amber-800 dark:text-amber-200/80 mb-6 font-medium">{texts.courseCompletedDesc}</p>
                <button onClick={() => setShowCertificate(true)} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1">
                  {texts.btnGetCert}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Общий каталог курсов
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">{t.navCourses}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{texts.courseSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => {
          const enrollment = enrolledCourses[course.id];
          const isEnrolled = !!enrollment;
          const progress = getProgress(course.id, course.lessons.length);

          return (
            <div key={course.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="mb-4 flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${course.level === 'Advanced' ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                  {t.levelPrefix} {course.level}
                </span>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500">{course.lessons?.length || 0} {texts.lessonsCount}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">{course.title[lang] || course.title['ru']}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 flex-grow line-clamp-3">{course.description[lang] || course.description['ru']}</p>

              {isEnrolled ? (
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2 text-sm font-bold">
                    <span className="text-slate-600 dark:text-slate-400">{t.courseProgress}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mb-4 overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                  </div>
                  <button onClick={() => handleResume(course.id)} className="w-full py-3 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl transition-colors">
                    {enrollment.completed ? texts.reviewBtn : texts.resumeBtn}
                  </button>
                </div>
              ) : (
                <button onClick={() => handleEnroll(course.id)} className="w-full mt-auto py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition-colors shadow-md border border-transparent dark:border-slate-200">
                  {texts.enrollBtn}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}