import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Faq() {
  // Definimos un JSON con las preguntas y respuestas
  const faqData = [
    {
      title: "¿Qué es Qryptogenia?",
      content:
        "Qryptogenia es una plataforma que te permite generar códigos QR personalizados para tu negocio basado en la información que proporciones en nuestros diversos formularios.",
    },
    {
      title: "¿Cómo genero un código QR?",
      content:
        "Para generar un código QR, debes registrarte en nuestra plataforma, seleccionar el plan que más se ajuste a tus necesidades y completar el formulario con la información que deseas que contenga el código QR.",
    },
    {
      title: "¿Es seguro usar Qryptogenia?",
      content:
        "Sí, Qryptogenia es una plataforma segura que utiliza medidas de seguridad avanzadas para proteger tus datos y la información de tus códigos QR.",
    },
    {
      title: "¿Qué es un código QR?",
      content:
        "Un código QR es un código de barras bidimensional que puede almacenar información como URLs, texto, o datos.",
    },
    {
      title: "¿Es gratis generar un código QR?",
      content:
        "Sí, puedes generar códigos QR básicos de forma gratuita. Hay opciones premium para diseños más avanzados.",
    },
    {
      title: "¿Qué formatos puedo descargar?",
      content:
        "Puedes descargar los códigos QR en formatos como PNG, SVG o PDF, según tus necesidades.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Preguntas Frecuentes
      </h2>
      <Accordion variant="splitted" className="w-full max-w-3xl space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index} // Usamos el índice para la clave
            aria-label={item.title}
            title={item.title}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-2xl font-bold text-dark-blue"
          >
            <p className="text-gray-600 text-lg font-normal">{item.content}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
