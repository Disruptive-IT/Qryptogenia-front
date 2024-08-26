// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Carga los archivos de traducción
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasa i18n al framework de react-i18next
  .init({
    fallbackLng: 'en', // Idioma predeterminado
    debug: true,
    interpolation: {
      escapeValue: false, // react ya escapa valores por defecto
    },
    backend: {
      loadPath: '/public/lenguages/{{lng}}/{{ns}}.json', // Ruta a los archivos de traducción
    },
  });

export default i18n;