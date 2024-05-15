import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import MyModal from "./modal";
import ChangeInfo from "./changeUserName";
import ChangeEmail from "./changeEmail";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const UserInfo = () => {
  const [modalisOpen, setmodalisOpen] = useState(false);
  const [emailModalisOpen, setEmailModalisOpen] = useState(false);
  const formRef = useRef(null);
  const { fetchUserData } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const handleModal = () => {
    setmodalisOpen(!modalisOpen);
  };

  const handleEmailModal = () => {
    setEmailModalisOpen(!emailModalisOpen);
  };

  const handleCloseModal = () => {
    updateUser();
    setTimeout(() => {
      setmodalisOpen(false);
    }, 200);
  };

  const handleCloseEmail = () => {
    updateUser();
    setTimeout(() => {
      setEmailModalisOpen(false);
    }, 200);
  };

  const updateUser = async () => {
    try {
      const userData = await fetchUserData();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

  };



  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, [fetchUserData]);

  // Verificar si el usuario está autenticado
  if (!user) {
    return <div>No authenticated user</div>;
  }
  console.log("Información del usuario:", user);

  const modalActions = [
    {
      label: "Confirm",
      onClick: () => {
        formRef.current.submitForm();
      },
    },
    {
      label: "Cancel",
      onClick: () => {
        handleCloseEmail();
      },
      color: "error", // Cambiar el color a "secondary" para que sea rojo
      variant: "contained", // Cambiar a "contained"
      style: { color: "white" }, // Establecer el color del texto a blanco
    },
  ];
  const modalActionsEmail = [
    {
      label: "Cancel",
      onClick: () => {
        handleCloseEmail();
      },
      color: "error", // Cambiar el color a "secondary" para que sea rojo
      variant: "contained", // Cambiar a "contained"
      style: { color: "white" }, // Establecer el color del texto a blanco
    },
  ];

  // Renderizar la información del usuario
  return (
    <div>
      <p>Username:</p>
      <div className="flex md:w-96">
        <span className=" opacity-50 inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
          <FaUser />
        </span>
        <p className="max-w-xs opacity-50 h-12 text-center overflow-hidden border border-gray-300 rounded-none bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500 cursor-not-allowed">
          {user.info.username}
        </p>
        <div className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-s-0 rounded-r-md dark:bg-my-gray dark:text-black dark:border-gray-600">
        <Button onClick={handleModal}>
          <EditIcon style={{ color: "black" }}/>
        </Button>
        </div>
        <MyModal
          actions={modalActions}
          open={modalisOpen}
          title={<h1>EDIT USERNAME</h1>}
          onClose={handleCloseModal}
        >
          <ChangeInfo formRef={formRef} setModalIsOpen={setmodalisOpen} handleCloseModal={handleCloseModal} />
        </MyModal>
      </div>
      <p>Email:</p>

      <div className="flex md:w-96">
        <span className="opacity-50 inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
          <IoIosMail />
        </span>
        <p className="max-w-xs opacity-50 h-12 text-center overflow-hidden border border-gray-300 rounded-none bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500 cursor-not-allowed">
          {user.info.email}
        </p>
        <div className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-s-0 rounded-r-md dark:bg-my-gray dark:text-black dark:border-gray-600">
        <Button onClick={handleEmailModal}>
          <EditIcon style={{ color: "black" }}/>
        </Button>
        </div>
        <MyModal
          actions={modalActionsEmail}
          open={emailModalisOpen}
          title={<h1>EDIT EMAIL</h1>}
          onClose={handleCloseEmail}
        >
          <ChangeEmail formRef={formRef} setModalIsOpen={setEmailModalisOpen} handleCloseEmail={handleCloseEmail} />
        </MyModal>
      </div>

    </div>
  );
};

export default UserInfo;