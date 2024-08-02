import React from "react";
import SearchBar from "../searchbar/searchbar";
import { motion } from "framer-motion";

function Discounts() {
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

    const actions = ["ver", "editar", "eliminar"];
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const data = [
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
        }
    ];

    return (
        <div className="overflow-x-auto">
            <div className="flex-grow p-12 bg-gray-100 overflow-auto">
                <div className="mb-4">
                    {/* <SearchBar
                        placeholder={"enter a discount"}
                    /> */}
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
                                <td className="py-2 px-4">{row.state ? "activo" : "inactivo"}</td>
                                <td className="py-2 px-4">{row.update_date}</td>
                                <td className="py-2 px-4">{row.limit_date}</td>
                                <td className="py-2 px-4">
                                    <div className="flex space-x-3">
                                        {row.actions.map((item, index) => (
                                            <motion.span
                                                key={index}
                                                whileHover={{ textDecoration: "underline", cursor: "pointer" }}
                                            >
                                                {item}
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
