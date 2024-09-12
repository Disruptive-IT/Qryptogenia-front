// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * @Author : Cristian Escobar 
 * @date : 2024-09-04
 * @description : Configuración e inicialización de `i18next` para la gestión de la internacionalización (i18n) en la aplicación React. Este archivo configura `i18next` con los siguientes plugins: `i18next-http-backend` para cargar archivos de traducción desde el backend, `i18next-browser-languagedetector` para detectar el idioma del navegador del usuario y `react-i18next` para integrar `i18next` con React. Establece el idioma por defecto a 'en' y proporciona la configuración necesaria para cargar y manejar archivos de traducción.
 * @Dependencies :
 *   - `i18next` (package): Biblioteca para la gestión de la traducción y la internacionalización en JavaScript.
 *   - `react-i18next` (package): Integración de `i18next` con React.
 *   - `i18next-http-backend` (package): Backend para cargar archivos de traducción a través de HTTP.
 *   - `i18next-browser-languagedetector` (package): Detector de idioma del navegador.
 * @Configuration :
 *   - `fallbackLng` (string): Idioma por defecto utilizado si no se encuentra la traducción en el idioma detectado. Se establece en 'en' (inglés).
 *   - `debug` (boolean): Habilita la depuración para mostrar información adicional sobre la carga de traducciones.
 *   - `interpolation` (object): Configuración de interpolación. `escapeValue` se establece en `false` ya que React ya escapa los valores por defecto.
 *   - `backend` (object): Configuración del backend para cargar los archivos de traducción. `loadPath` define la ruta a los archivos de traducción basados en el idioma (`lng`) y el namespace (`ns`).
 * @return : Exporta la instancia configurada de `i18next` para que pueda ser utilizada en la aplicación React.
 */

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