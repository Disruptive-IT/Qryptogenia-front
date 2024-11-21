import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Faq() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="min-h-screen flex flex-col items-center  p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Preguntas Frecuentes
      </h2>
      <Accordion variant="splitted" className="w-full max-w-3xl space-y-4">

      <AccordionItem
          key="1"
          aria-label="¿Qué es Qryptogenia?"
          title="¿Qué es Qryptogenia?"
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-2xl font-bold text-dark-blue"
        >
          <p className="text-gray-600 text-lg font-normal">
            Qryptogenia es una plataforma que te permite generar códigos QR personalizados para tu negocio basado en la información que proporciones en 
            nuestros diversos formularios. 
          </p>
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="¿Como genero un codigo Qr?"
          title="¿Como genero un codigo Qr?"
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-2xl font-bold text-dark-blue"
        >
          <p className="text-gray-600 text-lg font-normal">
            Para generar un código QR, debes registrarte en nuestra plataforma, seleccionar el plan que mas se ajuste a tus necesidades 
            y completar el formulario con la información que deseas que contenga el código QR.
          </p>
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="¿Es seguro usar Qryptogenia?"
          title="¿Es seguro usar Qryptogenia?"
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-2xl font-bold text-dark-blue"
        >
          <p className="text-gray-600 text-lg font-normal">
            Sí, Qryptogenia es una plataforma segura que utiliza medidas de seguridad avanzadas para proteger tus datos y la información de tus códigos QR.
          </p>
        </AccordionItem>
        
        <AccordionItem
          key="4"
          aria-label="¿Qué es un código QR?"
          title="¿Qué es un código QR?"
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-2xl font-bold text-dark-blue"
        >
          <p className="text-gray-600 text-lg font-normal">
            Un código QR es un código de barras bidimensional que puede almacenar información como URLs, texto, o datos.
          </p>
        </AccordionItem>
        <AccordionItem
          key="5"
          aria-label="¿Es gratis generar un código QR?"
          title="¿Es gratis generar un código QR?"
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-2xl font-bold text-dark-blue"
        >
          <p className="text-gray-600 text-lg font-normal">
            Sí, puedes generar códigos QR básicos de forma gratuita. Hay opciones premium para diseños más avanzados.
          </p>
        </AccordionItem>
        <AccordionItem
          key="6"
          aria-label="¿Qué formatos puedo descargar?"
          title="¿Qué formatos puedo descargar?"
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-2xl font-bold text-dark-blue"
        >
          <p className="text-gray-600 text-lg font-normal">
            Puedes descargar los códigos QR en formatos como PNG, SVG o PDF, según tus necesidades.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
