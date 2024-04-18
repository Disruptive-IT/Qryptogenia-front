import { useContext, useEffect, useState } from 'react';
import { Users, Kanban, QrCode } from 'lucide-react';

const Dashboard = () => {
     return (
          <div className="flex h-screen bg-gray-100">
               <div className="flex-grow">
                    <header className="p-4 shadow-md flex justify-center items-center">
                         <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                         <div className="flex justify-center w-full">
                              <nav className="flex space-x-4">
                                   <a href="#" className="flex items-center text-gray-500 hover:text-gray-800">
                                        <Users className="mr-3" />
                                   </a>
                                   <a href="#" className="flex items-center text-gray-500 hover:text-gray-800">
                                        <Kanban className="mr-3" />
                                   </a>
                                   <a href="#" className="flex items-center text-gray-500 hover:text-gray-800">
                                        <QrCode className="mr-3" />
                                   </a>
                              </nav>
                         </div>
                    </header>
                    <main className="p-6">
                         <div className="grid grid-cols-1 gap-6">
                              <div className="bg-white shadow-md rounded-md p-4">
                                   <h3 className="text-xl font-semibold text-gray-800">Usuarios</h3>
                                   <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="flex flex-col items-center bg-blue-100 rounded-md p-4">
                                             <p className="text-gray-700">Total</p>
                                             <p className="text-2xl font-semibold text-gray-800">43</p>
                                        </div>
                                        <div className="flex flex-col items-center bg-green-100 rounded-md p-4">
                                             <p className="text-gray-700">Activos</p>
                                             <p className="text-2xl font-semibold text-gray-800">40</p>
                                        </div>
                                        <div className="flex flex-col items-center bg-yellow-100 rounded-md p-4">
                                             <p className="text-gray-700">Con Planes</p>
                                             <p className="text-2xl font-semibold text-gray-800">25</p>
                                        </div>
                                        <div className="flex flex-col items-center bg-red-100 rounded-md p-4">
                                             <p className="text-gray-700">Inactivos</p>
                                             <p className="text-2xl font-semibold text-gray-800">3</p>
                                        </div>
                                        <div className="flex flex-col items-center bg-gray-100 rounded-md p-4">
                                             <p className="text-gray-700">Sin Planes</p>
                                             <p className="text-2xl font-semibold text-gray-800">8</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </main>
               </div>
          </div>
     );
};

export default Dashboard;
