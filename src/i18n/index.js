import fr from './fr.js';
import ar from './ar.js';

const translations = { fr, ar };

export const languages = [
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
];

export function t(key, lang = 'fr') {
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  return value || key;
}

export default translations;

