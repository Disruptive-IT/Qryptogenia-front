import React, { useState } from "react";
import SearchBar from "../../searchbar/searchbar";
import { motion } from "framer-motion";
import DiscountModal from "../form/modalDiscount";
import { MdCreate, MdVisibility, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function Discounts() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    
    const actions = [
        {
            name: "ver",
            icon: <MdVisibility className="w-[20px] h-auto" />
        },
        {
            name: "editar",
            icon: <MdCreate className="w-[20px] h-auto text-yellow-400" />
        },
        {
            name: "eliminar",
            icon: <MdDelete className="w-[20px] h-auto text-red-600" />
        }
    ];

    const [data, setData] = useState([
        {
            id: 1,
            discount: "christmas",
            description: "a discount christmas",
            create_date: formattedDate,
            use_quality: null,
            current_quality: null,
            state: true,
            update_date: null,
            limit_date: new Date(new Date().setFullYear(currentDate.getFullYear() + 1)).toLocaleDateString(),
            actions: actions
        },
        {
            id: 2,
            discount: "hallowen",
            description: "a discount hallowen",
            create_date: formattedDate,
            use_quality: null,
            current_quality: null,
            state: true,
            update_date: null,
            limit_date: new Date(new Date().setFullYear(currentDate.getFullYear() + 1)).toLocaleDateString(),
            actions: actions
        }
    ]);

    const columns = [
        { header: "discount" },
        { header: "description" },
        { header: "create date" },
        { header: "use quality" },
        { header: "current quality" },
        { header: "state" },
        { header: "update date" },
        { header: "limit date" },
        { header: "actions" }
    ];

    const HandleState = async (id) => {
        const result = await Swal.fire({
            title: "<strong>STATE ALERT</strong>",
            icon: "question",
            html: `<h1>Are you sure to change the current discount state</h1>`,
            showConfirmButton: true,
            confirmButtonColor:"#007bff",
            showCancelButton: true,
            cancelButtonColor:"#dc2626"
        });

        if (result.isConfirmed) {
            setData(data.map(item => 
                item.id === id ? { ...item, state: !item.state } : item
            ));
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex-grow p-12 overflow-auto">
                <div className="w-full mb-4 flex flex-row flex-wrap justify-start">
                    <div>
                        <DiscountModal />
                    </div>
                    <SearchBar placeholder={"enter a discount"} />
                </div>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {columns.map((column, key) => (
                                <th
                                    key={key}
                                    className="py-2 px-4 border-b border-gray-300 text-left text-xs sm:text-sm leading-4 font-medium text-gray-600 tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <motion.tr
                                whileHover={{ backgroundColor: "#D5DBDB" }}
                                key={row.id}
                                className="border-b border-gray-300 text-xs sm:text-sm leading-5 text-gray-700"
                            >
                                <td className="py-2 px-4">{row.discount}</td>
                                <td className="py-2 px-4">{row.description}</td>
                                <td className="py-2 px-4">{row.create_date}</td>
                                <td className="py-2 px-4">{row.use_quality}</td>
                                <td className="py-2 px-4">{row.current_quality}</td>
                                <td onClick={() => HandleState(row.id)} className="py-2 px-4 hover:cursor-pointer">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.state ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} w-20 text-center`}>
                                        {row.state ? "activo" : "inactivo"}
                                    </span>
                                </td>
                                <td className="py-2 px-4">{row.update_date}</td>
                                <td className="py-2 px-4">{row.limit_date}</td>
                                <td className="py-2 px-4">
                                    <div className="flex space-x-3">
                                        {row.actions.map((action) => (
                                            <motion.span
                                                key={action.name}
                                                whileHover={{ translateY: "-2px", cursor: "pointer" }}
                                                whileTap={{ scale: "0.9" }}
                                                id={action.name}
                                            >
                                                {action.icon}
                                            </motion.span>
                                        ))}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Discounts;
