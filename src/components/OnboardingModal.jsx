import React, { useState } from 'react';

export default function OnboardingModal({ onSave, t, lang }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [interests, setInterests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [goal, setGoal] = useState('');

  // 12 класс добавлен в список
  const grades = ['8', '9', '10', '11', '12'];
  const availableInterests = ['STEM', 'Business', 'Social', 'Coding'];

  // Локализованные списки предметов
  const subjectsOptions = {
    ru: ['Математика', 'Физика', 'Английский', 'Информатика'],
    en: ['Mathematics', 'Physics', 'English', 'Computer Science'],
    kk: ['Математика', 'Физика', 'Ағылшын тілі', 'Информатика']
  };

  // Локализованные списки целей
  const goalsOptions = {
    ru: ['Поступление в Лигу Плюща', 'Поступление в топ-вуз Казахстана', 'Сбор портфолио'],
    en: ['Ivy League Admission', 'Top KZ University Admission', 'Building Portfolio'],
    kk: ['Лига Плющаға түсу', 'Қазақстанның топ-ЖОО-на түсу', 'Портфолио жинау']
  };

  const currentSubjects = subjectsOptions[lang] || subjectsOptions['ru'];
  const currentGoals = goalsOptions[lang] || goalsOptions['ru'];

  const toggleInterest = (interest) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleSubject = (subject) => {
    setSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && grade && interests.length > 0 && subjects.length > 0 && goal) {
      // Передаем весь собранный объект в App.jsx
      onSave({ 
        name: name.trim(), 
        grade, 
        interests, 
        subjects, 
        goal 
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 transition-opacity animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            {t.onboardingTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            {t.onboardingDesc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Имя */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              {lang === 'ru' ? 'Как вас зовут?' : lang === 'kk' ? 'Есіміңіз кім?' : 'What is your name?'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white transition-colors"
              placeholder={lang === 'ru' ? 'Введите ваше имя' : lang === 'kk' ? 'Атыңызды енгізіңіз' : 'Enter your name'}
            />
          </div>

          {/* Класс */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {t.onboardingGrade}
            </label>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {grades.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={`py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 ${
                    grade === g
                      ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Интересы */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {t.onboardingInterests}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border-2 ${
                    interests.includes(interest)
                      ? 'bg-indigo-100 text-indigo-700 border-indigo-500 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-500 shadow-sm'
                      : 'bg-transparent text-slate-600 border-slate-200 hover:border-slate-300 dark:text-slate-400 dark:border-slate-600 dark:hover:border-slate-500'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Предметы */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {t.onboardingSubjects || (lang === 'ru' ? 'Любимые предметы:' : lang === 'kk' ? 'Сүйікті пәндеріңіз:' : 'Favorite subjects:')}
            </label>
            <div className="flex flex-wrap gap-2">
              {currentSubjects.map(subject => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${
                    subjects.includes(subject)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-500 shadow-sm'
                      : 'bg-transparent text-slate-600 border-slate-200 hover:border-slate-300 dark:text-slate-400 dark:border-slate-600 dark:hover:border-slate-500'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Главная цель */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {t.onboardingGoals || (lang === 'ru' ? 'Ваша главная цель:' : lang === 'kk' ? 'Сіздің басты мақсатыңыз:' : 'Your main goal:')}
            </label>
            <div className="flex flex-col gap-2">
              {currentGoals.map(g => (
                <label 
                  key={g} 
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    goal === g 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100' 
                      : 'border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="goal" 
                    checked={goal === g}
                    onChange={() => setGoal(g)}
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="font-bold text-sm sm:text-base">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Кнопка Submit */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
            <button
              type="submit"
              disabled={!name.trim() || !grade || interests.length === 0 || subjects.length === 0 || !goal}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed dark:disabled:from-slate-700 dark:disabled:to-slate-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg disabled:shadow-none"
            >
              {t.btnSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}