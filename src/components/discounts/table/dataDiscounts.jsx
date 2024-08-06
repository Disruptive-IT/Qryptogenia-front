import React, { useState } from "react";
import SearchBar from "../../searchbar/searchbar";
import { motion } from "framer-motion";
import DiscountModal from "../form/modalDiscount";
import { MdCreate, MdVisibility, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function Discounts() {
    // Define currentDate and formattedDate first
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
            limit_date: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)).toLocaleDateString(),
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
            limit_date: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)).toLocaleDateString(),
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

    // Handle state change with SweetAlert
    const HandleState = async (id) => {
        const result = await Swal.fire({
            title: "<strong>STATE ALERT</strong>",
            icon: "question",
            html: `<h1>Are you sure to change the current discount state</h1>`,
            showConfirmButton: true,
            showCancelButton: true
        });
        if (result.isConfirmed) {
            const idRegister=id
            const updatedData = data.map((item) => 
                item.id === idRegister
                    ? { ...item, state: !item.state }
                    : item
            );

            setData(updatedData);
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex-grow p-12 overflow-auto">
                <div className="w-full mb-4 flex flex-row flex-wrap justify-start">
                <div className="">
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
                                <td onClick={()=>HandleState(row.id)} className="py-2 px-4 hover:cursor-pointer">
                                    {row.state ? (
                                        <span className="bg-green-500 p-1 rounded-[10px] text-black">activo</span>
                                    ) : (
                                        <span className="bg-red-500 rounded-[10px] p-1 text-black">inactivo</span>
                                    )}
                                </td>
                                <td className="py-2 px-4">{row.update_date}</td>
                                <td className="py-2 px-4">{row.limit_date}</td>
                                <td className="py-2 px-4">
                                    <div className="flex space-x-3 justify-start">
                                        {row.actions.map((item, index) => (
                                            <motion.span
                                                key={index}
                                                whileHover={{ translateY: "-2px", cursor: "pointer" }}
                                                whileTap={{ scale: "0.9" }}
                                                id={item.name}
                                            >
                                                {item.icon}
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
