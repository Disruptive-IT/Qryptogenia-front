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
    const { changeProfilePicture, getProfileImageUrl } = useContext(AuthContext);

    // Estado para la imagen de perfil
    const [profileImage, setProfileImage] = useState('');

    // Cargar la imagen de perfil cuando el componente se monte
    useEffect(() => {
        // Obtener la URL de la imagen de perfil desde el contexto global
        const loadProfileImage = async () => {
            const imageUrl = await getProfileImageUrl();
            setProfileImage(imageUrl);
        };

        loadProfileImage();
    }, [getProfileImageUrl]);

    // Manejar el cambio de imagen de perfil
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = await changeProfilePicture(file);
            if (result.success) {
                // Actualiza la imagen de perfil en el estado
                setProfileImage(result.data.image_url);
                toast.success('Imagen de perfil cambiada con éxito');
            } else {
                console.error('Error al cambiar la imagen de perfil:', result.error);
                toast.error('Error al cambiar la imagen de perfil');
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
                    <a className="mt-0 text-xl p-2">Settings</a>
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
                    <button onClick={() => fileInputRef.current.click()}>
                        <EditIcon />
                    </button>
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