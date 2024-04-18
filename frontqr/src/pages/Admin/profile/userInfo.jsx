import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import MyModal from "./modal";
import ChangeInfo from "./changeUserName";

const UserInfo = () => {
  const [modalisOpen, setmodalisOpen] = useState(false);
  const formRef = useRef(null);

  const handleModal = () => {
    setmodalisOpen(!modalisOpen);
  };

  const handleCloseModal = () => {
    setmodalisOpen(false);
  };

  let { user } = useContext(AuthContext);

  // Verificar si el usuario está autenticado
  if (!user) {
    return <div>No hay usuario autenticado</div>;
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
        handleCloseModal();
      },
      color: "error", // Cambiar el color a "secondary" para que sea rojo
      variant: "contained", // Cambiar a "contained"
      style: { color: "white" }, // Establecer el color del texto a blanco
    },
  ];

  // Renderizar la información del usuario
  return (
    <div>
      <div className="flex items-center space-x-2">
      <p className="">
          Username: {user.username}
      </p>
      <Button onClick={handleModal}>
      <EditIcon />
      </Button>
      <MyModal
        actions={modalActions}
        open={modalisOpen}
        title={<h1>EDIT USERNAME</h1>}
        onClose={handleCloseModal}
      >
        <ChangeInfo formRef={formRef} setModalIsOpen={setmodalisOpen} />
      </MyModal>
      </div>

      <div className="flex items-center space-x-2">
      <p className="">
        Email: {user.email}
      </p>
      <Button onClick={handleModal}>
      <EditIcon />
      </Button>
      <MyModal
        actions={modalActions}
        open={modalisOpen}
        title={<h1>EDIT USERNAME</h1>}
        onClose={handleCloseModal}
      >
        <ChangeInfo formRef={formRef} setModalIsOpen={setmodalisOpen} />
      </MyModal>
      </div>

    </div>
  );
};

export default UserInfo;