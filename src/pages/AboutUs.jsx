import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            {/* Header */}
            <header className="w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl py-6 text-center">
                <motion.h1
                    className="text-3xl font-bold text-my-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Acerca de Nosotros
                </motion.h1>
                <motion.p
                    className="mt-2 text-lg text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Conoce más sobre nuestra historia, misión y casos de éxito.
                </motion.p>
            </header>

            {/* Historia */}
            <motion.section
                className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    {/* Imagen */}
                    <img
                        src="Logo.png" 
                        alt="Nuestra historia"
                        className="w-72 h-72 mx-auto"
                        />
                    {/* Texto */}
                    <div className="md:w-3/5">
                        <h2 className="text-2xl font-semibold text-dark-blue mb-4">Nuestra Historia</h2>
                        <p className="text-gray-700">
                        En el año 2020, un grupo de apasionados por la tecnología y la innovación se unió con una misión clara: 
                        simplificar la conexión entre empresas y clientes en un mundo cada vez más digital. Así nació nuestra plataforma, 
                        un espacio diseñado para transformar cómo las personas interactúan con información y servicios a través de soluciones 
                        prácticas y accesibles.
                        <br />
                        <br />
                        Lo que comenzó como una idea pequeña, respaldada por grandes sueños, pronto se convirtió en una herramienta clave 
                        para negocios de todas las escalas. Al combinar creatividad con tecnología de vanguardia, hemos ayudado a emprendedores 
                        y empresas a adaptarse a las demandas del mercado moderno.
                        Hoy, seguimos escribiendo nuestra historia, impulsados por la confianza de nuestros usuarios y el deseo de liderar la revolución digital,
                         una solución a la vez. ¡Gracias por ser parte de este viaje!                        
                         </p>
                    </div>
                </div>
            </motion.section>

            {/* Misión y Visión */}
            <motion.section 
    className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 mt-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.7 }}
>
<div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-x-6 lg:gap-y-0">
  {/* Imagen al lado derecho en pantallas grandes, arriba en pantallas pequeñas */}
  <img
    src="HandMenu.png" // Asegúrate de que la ruta sea correcta
    alt="Imagen de nuestra historia"
    className="w-full lg:w-1/2 h-auto object-cover rounded-lg" // Ajusta el tamaño según sea necesario
  />

  {/* Texto a la izquierda */}
  <div className="max-w-lg text-center lg:text-left">
    <h2 className="text-2xl font-semibold text-dark-blue mb-4">Nuestra Misión</h2>
    <p className="text-gray-700">
      Nuestra misión es proporcionar soluciones innovadoras para facilitar el acceso a diversos aplicativos
      digitales a través de códigos QR. Queremos ofrecer a las empresas una forma más
      moderna y accesible de presentar su oferta, a la vez que mejoramos la experiencia del usuario final.
    </p>

    <h2 className="text-2xl font-semibold text-dark-blue mt-6 mb-4">Nuestra Visión</h2>
    <p className="text-gray-700">
      En Qryptogenia, aspiramos a ser la plataforma líder en soluciones digitales para negocios, ayudando a 
      emprendedores a conectar con sus clientes de manera ágil y moderna a través de códigos QR. 
      Nuestra visión es simplificar la experiencia del cliente y potenciar el alcance de los negocios con herramientas digitales innovadoras.
    </p>
  </div>
</div>
</motion.section>

            {/* Testimonios */}
            <motion.section
                className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <h2 className="text-2xl font-semibold text-dark-blue text-center mb-6">Testimonios y Casos de Éxito</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Testimonio 1 */}
                    <motion.div
                        className="text-center bg-gray-50 rounded-lg p-6 shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            className="w-24 h-24 rounded-full mx-auto"
                            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                            alt="Juan Pérez"
                        />
                        <h3 className="text-lg font-medium mt-3">Juan Pérez</h3>
                        <p className="text-sm text-gray-500">CEO de Startup Booker</p>
                        <p className="mt-3 text-sm text-gray-700">
                            "Los QR personalizados aumentaron un 200% las visitas en nuestra web."
                        </p>
                    </motion.div>
                    {/* Testimonio 2 */}
                    <motion.div
                        className="text-center bg-gray-50 rounded-lg p-6 shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            className="w-24 h-24 rounded-full mx-auto"
                            src="https://i.pravatar.cc/150?img=49"
                            alt="María Gómez"
                        />
                        <h3 className="text-lg font-medium mt-3">María Gómez</h3>
                        <p className="text-sm text-gray-500">Directora de Marketing</p>
                        <p className="mt-3 text-sm text-gray-700">
                            "Facilitamos el registro en eventos con sus códigos QR. ¡Excelentes resultados!"
                        </p>
                    </motion.div>
                    {/* Testimonio 3 */}
                    <motion.div
                        className="text-center bg-gray-50 rounded-lg p-6 shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            className="w-24 h-24 rounded-full mx-auto"
                            src="https://i.pravatar.cc/150?img=32"
                            alt="Carolina Roa"
                        />
                        <h3 className="text-lg font-medium mt-3">Carolina Roa</h3>
                        <p className="text-sm text-gray-500">CEO de Startup FoodManager</p>
                        <p className="mt-3 text-sm text-gray-700">
                            "Nuestros menús digitales con QR son un éxito. No puedo estar más satisfecha."
                        </p>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutUs;