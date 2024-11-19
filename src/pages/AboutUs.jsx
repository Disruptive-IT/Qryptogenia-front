import React from 'react';

const AboutUs = () => {
    return (
            <div className="min-h-screen flex flex-col items-center p-6">
                {/* Header */}
                <header className="w-full py-6 text-my-black text-center">
                    <h1 className="text-3xl font-bold">Acerca de Nosotros</h1>
                    <p className="mt-2 text-lg">Conoce más sobre nuestra historia, misión y casos de exito.</p>
                </header>
    
                {/*Historia */}
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">Nuestra Historia</h2>
                    <p className="text-gray-700">
                        Fundada en 2020, nuestra organización comenzó como un pequeño proyecto con grandes ideas. A lo largo de los años, hemos
                        crecido gracias a la pasión y dedicación de nuestro equipo, así como al apoyo continuo de nuestros clientes y socios.
                    </p>
                </section>

                {/*Mision y Vision */}
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
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
                </section>
    
                {/*Nuestro Equipo */}
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
    <h2 className="text-2xl font-semibold text-dark-blue mb-4">Testimonios y Casos de Éxito</h2>
    <div className="flex flex-wrap gap-6 justify-center">
        {/* Testimonio 1 */}
        <div className="w-60 text-center bg-gray-50 rounded-lg p-4 shadow-md">
            <img
                className="w-24 h-24 rounded-full mx-auto"
                src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                alt="Usuario 1"
            />
            <h3 className="text-lg font-medium mt-3">Juan Pérez</h3>
            <p className="text-sm text-gray-500">CEO de Startup Booker</p>
            <p className="mt-3 text-sm text-gray-700">
            "Los QR personalizados aumentaron un 200% las visitas en nuestra web"
            </p>
        </div>
        <div className="w-60 text-center bg-gray-50 rounded-lg p-4 shadow-md">
            <img
                className="w-24 h-24 rounded-full mx-auto"
                src="https://i.pravatar.cc/150?img=49"
                alt="Usuario 2"
            />
            <h3 className="text-lg font-medium mt-3">María Gómez</h3>
            <p className="text-sm text-gray-500">Directora de Marketing</p>
            <p className="mt-3 text-sm text-gray-700">
                "Facilitamos el registro en eventos con sus códigos QR.
                 ¡Excelentes resultados!"
            </p>
        </div>
        {/* Testimonio 3 */}
        <div className="w-60 text-center bg-gray-50 rounded-lg p-4 shadow-md">
            <img
                className="w-24 h-24 rounded-full mx-auto"
                src="https://i.pravatar.cc/150?img=32"
                alt="Usuario 3"
            />
            <h3 className="text-lg font-medium mt-3">Carolina Roa</h3>
            <p className="text-sm text-gray-500">Creadora de BarManager</p>
            <p className="mt-3 text-sm text-gray-700">
                "Nuestros menús digitales con QR son un éxito.
                 No puedo estas mas satisfecha!"
            </p>
        </div>
    </div>
</section>
</div>
    );
};

export default AboutUs;