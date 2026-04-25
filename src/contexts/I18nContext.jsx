import React, { createContext, useContext, useState, useEffect } from 'react';
import { t, languages } from '../i18n';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('app-lang') || 'fr');

  useEffect(() => {
    localStorage.setItem('app-lang', lang);
    const dir = languages.find((l) => l.code === lang)?.dir || 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  };

  const value = {
    lang,
    setLang,
    toggleLang,
    t: (key) => t(key, lang),
    dir: languages.find((l) => l.code === lang)?.dir || 'ltr',
    isAr: lang === 'ar',
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

