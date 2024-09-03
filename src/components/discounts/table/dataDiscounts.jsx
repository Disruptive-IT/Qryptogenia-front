import React, { useState, useEffect } from "react";
import SearchBar from "../../searchbar/searchbar";
import { motion } from "framer-motion";
import AddDiscount from "../form/btnAddDiscount.jsx";
import { MdCreate, MdVisibility, MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Swal from "sweetalert2";
import instance from "../../../libs/axios";
import ModalComponent from "../form/modal.jsx";
import UpdateDiscount from "../form/updateForm.jsx";
import { toast, Toaster } from "sonner";
import { useTranslation } from "react-i18next";
const handleDateFormat = (fecha) => {
  return new Date(fecha).toLocaleDateString();
};

//componente principal
function Discounts() {
  const [discountData, setDiscountData] = useState([]);
  const [state, setState] = useState({});
  const [isDeleted,setIsDeleted]=useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const handleOpen = (id) => {
    setSelectedDiscountId(id);
    setOpen(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = discountData.filter((discount) =>
    discount.discount.toLowerCase().includes(searchQuery) ||
    discount.description.toLowerCase().includes(searchQuery)
  );

  const handleClose = () => setOpen(false);

  const totalPages = Math.ceil(discountData.length / 7);
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //funcion para traer los datos del descuento a editar
  const fetchData = async () => {
    try {
      const getDiscount = await instance.get("/admin/getDiscount");
      if (getDiscount.status === 200) {
        setDiscountData(getDiscount.data);
        console.log(getDiscount.data);
      }
    } catch (error) {
      console.error("error: ", error.message);
    }
  };

  //funcion para cambiar estado del descuento
  const changeStateDiscount = async (id, currentState) => {
    try {
      const newState = !currentState;

      const pet=await instance.patch(`admin/changeState/${id}`, { state: newState });
      setState((prevState) => ({
        ...prevState,
        [id]: newState,
      }));
      if(pet.status==200){
          toast.success("Discount state was changed successfully", {
            position: "bottom-right",
            duration: 3000,
          });
      }

    } catch (error) {
      console.error('Error al cambiar el estado del descuento:', error);
      toast.error("Error: discount is currently associated with a membership.");
    }
  };

  //eliminar descuento
  const DeleteDiscount = async (id) => {
    try {
      const result = await Swal.fire({
        title: "<strong>STATE ALERT</strong>",
        icon: "question",
        html: `<h1>Are you sure you want to delete this record? Remember, if the discount is currently associated with a membership, you cannot delete it.</h1>`,
        showConfirmButton: true,
        confirmButtonColor: "#3C6E71",
        showCancelButton: true,
        cancelButtonColor: "#dc2626",
      });
      if (result.isConfirmed) {
        const deleteResponse = await instance.delete(`/admin/deleteDiscount/${id}`);
  
        if (deleteResponse.status === 200) {
          setIsDeleted(true);
          toast.success("Discount was deleted successfully", {
            position: "bottom-right",
            duration: 3000,
          });
        } else if (deleteResponse.status === 400) {
          toast.error("Error: The record is currently associated with a membership.");
        }
      }
    } catch (error) {
      console.error("Error while deleting the discount:", error);
      toast.error("Error: the current discount is associated with a membership.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [state]);

  useEffect(()=>{
    const handleDeleted=async()=>{
      await fetchData();
      setIsDeleted(false);
    }

    handleDeleted();
  },[isDeleted])

  //acciones del admin
  const actions = [
    // {
    //   name: "ver",
    //   icon: <MdVisibility className="w-[20px] h-auto" />,
    //   evento: () => {
    //     console.log("ver");
    //   },
    // },
    {
      name: "editar",
      icon: <MdCreate className="w-[20px] h-auto text-yellow-400" />,
      evento: (id) => {
        handleOpen(id);
      },
    },
    {
      name: "eliminar",
      icon: <MdDelete className="w-[20px] h-auto text-red-600" />,
      evento: (id) => {
        DeleteDiscount(id)
      },
    },
  ];

  //columnas encabezado datatable
  const columns = [
    { header: t("Discount") },
    { header: t("Description") },
    { header: t("Create Date") },
    { header: t("Use Quantity") },
    { header: t("Current Quantity") },
    { header: t("State") },
    { header: t("Update Date") },
    { header: t("Limit Date") },
    { header: t("Actions") },
  ];

  //funcion que contiene la peticion del estado en la base de datos
  const handleState = async (id, state) => {
    const result = await Swal.fire({
      title: "<strong>STATE ALERT</strong>",
      icon: "question",
      html: `<h1>Are you sure you want to change the current discount state?</h1>`,
      showConfirmButton: true,
      confirmButtonColor: "#3C6E71",
      showCancelButton: true,
      cancelButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      await changeStateDiscount(id, state);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex-grow p-12 overflow-auto">
        <div className="w-full mb-4 flex flex-row flex-nowrap justify-start">
          <div>
            <AddDiscount  reload={fetchData}/>
          </div>
          <SearchBar placeholder={"Enter a discount"} />
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
            {paginatedData.map((row) => (
              <motion.tr
                whileHover={{ backgroundColor: "#D5DBDB" }}
                key={row.id}
                className="border-b border-gray-300 text-xs sm:text-sm leading-5 text-gray-700"
              >
                <td className="py-2 px-4">{row.discount}</td>
                <td className="py-2 px-4">{row.description}</td>
                <td className="py-2 px-4">{handleDateFormat(row.createdAt)}</td>
                <td className="py-2 px-4">{row.use_quantity}</td>
                <td className="py-2 px-4">{row.quantity_current_use}</td>
                <td className="py-2 hover:cursor-pointer">
                  <span
                    onClick={() => handleState(row.id, row.state)}
                    className={`px-5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      row.state ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    } w-20 text-center`}
                  >
                    {row.state ? t("Active") : t("Inactive")}
                  </span>
                </td>
                <td className="py-2 px-4">{handleDateFormat(row.update_date)}</td>
                <td className="py-2 px-4">{handleDateFormat(row.limit_date)}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-3">
                    {actions.map((action) => (
                      <motion.span
                        key={action.name}
                        whileHover={{ translateY: "-2px", cursor: "pointer" }}
                        whileTap={{ scale: "0.9" }}
                        id={action.name}
                        onClick={() => action.evento(row.id)}
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
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 mb-2 sm:mb-0 sm:mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
    >
      Previous
    </button>
    <span className="text-xs sm:text-sm">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 mt-2 sm:mt-0 sm:ml-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
    >
      Next
    </button>
  </div>
      </div>

      {/* Modal Component */}
      {open && (
        <ModalComponent isOpen={open} onClose={handleClose}>
          <UpdateDiscount event={handleClose} id={selectedDiscountId} reload={fetchData} />
        </ModalComponent>
      )}
    </div>
  );
}

export default Discounts;
