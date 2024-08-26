import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Obtener el idioma guardado en localStorage o usar el idioma por defecto
    const storedLanguage = localStorage.getItem('language') || i18n.language;
    setSelectedLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    localStorage.setItem('language', language);

    fetch('http://localhost:3000/api/set-language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
    })
    .then(response => response.json())
    .then(data => console.log('Idioma enviado al backend:', data))
    .catch(error => console.error('Error al enviar el idioma al backend:', error));

    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Cerrar el menú si se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button 
        type="button" 
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700" 
        onClick={toggleMenu}
      >
        <Flag code={selectedLanguage === 'en' ? 'GB' : 'ES'} style={{ width: '20px', marginRight: '8px' }} />
        {selectedLanguage === 'en' ? 'English' : 'Español'}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleLanguageChange('en')}
            >
              <Flag code="GB" style={{ width: '20px', marginRight: '8px' }} />
              <span className="flex-1">English</span>
            </div>
            <div
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleLanguageChange('es')}
            >
              <Flag code="ES" style={{ width: '20px', marginRight: '8px' }} />
              <span className="flex-1">Español</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
