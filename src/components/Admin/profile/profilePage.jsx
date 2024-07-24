/**
 * @Author : Cristian Escobar,   @date 2024-07-24 08:49:13
 * @description : Este componente Profile permite al usuario ver y editar su información de perfil, incluyendo la posibilidad de cambiar su imagen de perfil y su contraseña. Utiliza varios componentes y contextos para gestionar la autenticación y el manejo de formularios.
 * @Props : No recibe props, pero utiliza varios contextos y referencias para gestionar el estado y las acciones del usuario.
 * @return : Un componente de perfil que muestra la información del usuario, permite cambiar la imagen de perfil y abrir un modal para cambiar la contraseña.
 */

import React, { useState, useRef, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import MyModal from "./modal";
import UserInfo from "./userInfo";
import ChangePasswordForm from "./changePasswordForm";
import { AuthContext } from "../../../context/AuthContext";
import { Toaster, toast } from 'sonner';



const Profile = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    const { fetchUserData } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const { updateProfileImage, profileImage, changeProfilePicture } = useContext(AuthContext);

    // Cargar la imagen de perfil cuando el componente se monte
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

    // Manejar el cambio de imagen de perfil
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = await changeProfilePicture(file);
            if (result.success) {
                // Actualiza la imagen de perfil llamando a la función updateProfileImage
                updateProfileImage();
                toast.success('Profile picture successfully changed');
            } else {
                console.error('Error when changing profile picture:', result.error);
                toast.error('Error changing profile picture');
            }
        }
    };

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
                setModalIsOpen(false);
            },
            color: "error",
            variant: "contained",
            style: { color: "white" },
        },
    ];

    return (
        <div className="bg-white flex justify-center items-center mt-16 lg:mt-32 mx-4 lg:mx-20 rounded-3xl">
            <div className="flex flex-col lg:flex-row lg:w-11/12 mx-2 lg:mx-8 my-8 lg:my-16 rounded-3xl bg-MyBlack lg:min-h-[30vh] sm:min-h-[40vh]">
                <div className="border-solid lg:border-MyGray lg:border-r flex flex-col lg:w-4/12 justify-center items-center">
                    <a className="mt-0 text-xl p-2">{user?.info?.rol === 'CLIENT' ? 'User Settings' : 'Admin Settings'}</a>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                    <img
                        src={profileImage}
                        className="mx-8 my-8 w-32 h-32 rounded-full cursor-pointer"
                        alt="Profile"
                        onClick={() => fileInputRef.current.click()} // Abre el selector de archivo cuando se hace clic en la imagen
                    />
                </div>
                <div className="flex flex-col w-full lg:w-8/12">
                    <div className="w-full p-4 lg:p-16 text-MyGray">
                        <UserInfo setUser user />
                    </div>
                    <div className="flex justify-center w-full h-2/6 pb-3 space-x-4">
                        <Button
                            className="h-12 lg:w-48 mt-6 rounded-3xl"
                            style={{ backgroundColor: "#3C6E71", color: "#D9D9D9" }}
                            onClick={() => setModalIsOpen(true)}
                        >
                            Edit Password
                        </Button>
                        <MyModal
                            actions={modalActions}
                            open={modalIsOpen}
                            title={<h1>EDIT PASSWORD</h1>}
                            onClose={() => setModalIsOpen(false)}
                        >
                            <ChangePasswordForm formRef={formRef} setModalIsOpen={setModalIsOpen} />
                        </MyModal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;